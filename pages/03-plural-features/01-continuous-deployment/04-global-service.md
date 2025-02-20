---
title: Global services
description: Replicate services to all or part of your fleet
---

Plural natively supports a concept of global services, e.g. a service that's replicated across a subset of your fleet. This is particular for low level kubernetes system add-ons like ingress controllers, service meshes, cert manager, etc. To define a global service, you first need to define a service that will serve as a source, then use the `GlobalService` CRD:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: Cluster
metadata:
  name: k3s-prod
  namespace: infra
spec:
  handle: k3s-prod
---
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: system-upgrade
  namespace: infra
spec:
  namespace: system-upgrade
  helm:
    version: '0.1.1'
    chart: system-upgrade-controller
    repository:
      namespace: infra
      name: console
  clusterRef:
    kind: Cluster
    name: k3s-prod
    namespace: infra
---
apiVersion: deployments.plural.sh/v1alpha1
kind: GlobalService
metadata:
  name: system-upgrade
  namespace: infra
spec:
  tags:
    fabric: edge
  serviceRef:
    name: system-upgrade
    namespace: infra
```

In this specific case, we set up the k3s system upgrade controller on a single cluster, then replicate it using the `GlobalService` CR to all clusters with the `edge: fabric` tags. You can also target on kubernetes distribution (eg EKS, AKS, GKE, K3s, etc) or cluster api provider, and we're welcome to other targeting/organization mechanisms as well if those are not sufficient.

## Templating within Global Services

A very common problem you'll face when redeploying apps across your fleet is there's cluster-specific data you'll need for each instance of it. Plural supports that through its templating capabilities in the deployment agent on a cluster.

Take an example of setting up external-dns fleet wide. You'll likely need to configure a different domain and iam arn for each cluster. You can leverage the cluster resources built-in metadata field alongside templating to accomplish that easily, like so:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: Cluster
metadata:
  name: eks-prod
  namespace: infra
spec:
  handle: eks-prod
  tags:
    fabric: eks # add eks tag
  metadata:
    externaldnsRoleArn: arn:...//externaldns
    domain: my.domain.com # can add any nested map structure as metadata
---
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: externaldns
  namespace: infra
spec:
  namespace: externaldns
  repositoryRef:
    kind: GitRepository
    name: infra
    namespace: infra
  git:
    ref: main
    folder: helm-values # or wherever else you want to store the helm values
  helm:
    version: 6.31.4
    chart: externaldns
    valuesFiles:
      - externaldns.yaml.liquid # use a liquid extension to enable templating in this file
    repository:
      namespace: infra
      name: externaldns
  clusterRef:
    kind: Cluster
    name: eks-prod
    namespace: infra
---
apiVersion: deployments.plural.sh/v1alpha1
kind: GlobalService
metadata:
  name: system-upgrade
  namespace: infra
spec:
  tags:
    fabric: eks
  serviceRef:
    name: externaldns
    namespace: infra
```

From there, your `externaldns.yaml.liquid` might look something like:

```yaml
domainFilters:
  - {{ cluster.metadata.domain }}

serviceAccount:
  enabled: true
  annotations:
    eks.amazonaws.com/role-arn: {{ cluster.metadata.externaldnsRoleArm }}
```

If you added secrets, you can access them with something like `{{ configuration.YOUR_SECRET_NAME }}` and if you want to use service contexts, we recommend checking the docs {% doclink to="terraform-interop" %}here{% /doclink %}.

Very commonly there's actually a lot of overlap between configuration on the same cluster, so the metadata blob will be smaller than you might expect as well. We've found this is an elegant and maintainable solution for users that are fine with the manual copy paste into yaml, whereas service contexts go a step further and automate the entire process.

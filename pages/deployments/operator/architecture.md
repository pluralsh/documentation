---
title: Plural Deployment Operator
description: GitOps Management using the Plural Operator
---

The plural operator defines a set of CRDs that allow you to manage your deployments in a fully gitops manner. The controller ultimately communicates with our core apis and acts effectively as a frontend to automate provisioning/deprovisioning the requisite resources. The CRD structures also imitate the patterns used by Flux and is interoperable with many flux types (particularly those from its source controller), with modular distinct types for the various roles in deployments, eg git/helm repositories, clusters, and services.

A very simple example to set up a helm multi-source deployment would look like this, and illustrates the flexibility this model provides:

```yaml
# helm repository to use for the service
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: nginx
  namespace: infra
spec:
  interval: 5m0s
  url: https://kubernetes.github.io/ingress-nginx
---
# cluster to deploy to
apiVersion: deployments.plural.sh/v1alpha1
kind: Cluster
metadata:
  name: k3s-test
  namespace: infra
spec:
  handle: k3s-test
---
apiVersion: deployments.plural.sh/v1alpha1
kind: GitRepository
metadata:
  name: infra
  namespace: infra
spec:
  url: git@github.com:some/repo.git # source repo for helm values
---
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: nginx-threes-test
  namespace: infra
spec:
  namespace: ingress-nginx
  name: ingress-nginx
  git:
    folder: helm-values
    ref: main
  repositoryRef:
    kind: GitRepository
    name: infra
    namespace: infra
  helm:
    version: 4.4.x
    chart: ingress-nginx
    valuesFiles:
      - ingress-nginx.yaml # values file sourced from the git repository
    repository:
      namespace: infra
      name: nginx # referenced helm repository above
  clusterRef:
    kind: Cluster
    name: k3s-test
    namespace: infra
```

## Full API Spec

The full api spec can be found by looking through the go types [here](https://github.com/pluralsh/console/tree/master/controller/api/v1alpha1) (full docsite coming soon!)

## Read-Only vs Write resources

The operator also handles the complexity of resources defined via other tools. For instance, clusters will commonly actually be defined and provisioned in terraform, so write access should be done by that IaC tool. The operator will detect the resource was created elsewhere, and go into read-only mode, just generating the appropriate status fields to compose with other resources like services.

## Full Working Example

The `plural up` command is the simplest way to generate a full repository from the ground up, this will include all the terraform to create the management cluster, alongside workload clusters, a `README.md` documenting the given repo structure, and a basic app-of-apps setting up all the underlying services to get going. We also have a public tutorial example of this repo for people who'd rather just peruse available at [our demo repo](https://github.com/pluralsh/plural-up-demo).

This can be considered a reference architecture, but users have freedom to chose their own repository layouts or multi-vs-mono repo organizational structures however their needs might see fit.

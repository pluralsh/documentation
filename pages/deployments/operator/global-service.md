---
title: Global Services
description: Replicate Services to all or part of your fleet
---

Plural natively supports a concept of global services, eg a service that's replicated across a subset of your fleet. This is particular for low level kubernetes system add-ons like ingress controllers, service meshes, cert manager, etc. To define a global service, you first need to define a service that will serve as a source, then use the `GlobalService` CRD:

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

---
title: Git-sourced services
description: Source manifests directly from git
---

The simplest service you can deploy is just referencing a folder within a git repository. This pattern is great for deploying a simple microservice owned by a dev team, or perhaps setting up an app-of-apps. The CRs needed to make this work would be:

```yaml
# the GitRepository and Cluster resources should ideally be defined elsewhere in your infra repo
apiVersion: deployments.plural.sh/v1alpha1
kind: GitRepository
metadata:
  name: example
  namespace: infra
spec:
  url: git@github.com:your-org/example.git
---
apiVersion: deployments.plural.sh/v1alpha1
kind: Cluster
metadata:
  name: k3s
  namespace: infra
spec:
  handle: k3s
---
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: git-folder
spec:
  namespace: examples
  name: git-folder
  git:
    folder: kubernetes/manifests # or whatever folder you wish
    ref: main
  repositoryRef:
    kind: GitRepository
    name: example
    namespace: infra
  clusterRef:
    kind: Cluster
    name: k3s
    namespace: infra
```

If the folder just contains a number of `ServiceDeployment` kind structures, you can create a full-blown service of services and provision a wide array of complex resource heirarchies

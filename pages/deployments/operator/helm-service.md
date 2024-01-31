---
title: Helm Sourced Services
description: Source manifests from a helm repository registered anywhere
---

You can also source manifests from a https or OCI-compatible helm repository. This is very useful for provisioning kubernetes add-ons, which are usually packaged using helm, or occasionally for complex release processes where helms versioning independent of git can be valuable. The path here requires creation of a Flux `HelmRepository` CR first, then the service, e.g.:

```yaml
# the HelmRepository and Cluster resources should ideally be defined elsewhere in your infra repo
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: nginx
  namespace: infra
spec:
  interval: 5m0s
  url: https://kubernetes.github.io/ingress-nginx
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
  name: nginx
  namespace: infra
spec:
  namespace: ingress-nginx
  name: ingress-nginx
  helm:
    version: 4.4.x
    chart: ingress-nginx
    values:
      # in-line helm values, will be stored encrypted at rest
      controller:
        image:
          digest: null
          digestChroot: null
        admissionWebhooks:
          enabled: false
    repository:
      namespace: infra
      name: nginx # referenced helm repository above
  clusterRef:
    kind: Cluster
    name: k3s
    namespace: infra
```

You can also source values files, from a git repository alongside sourcing the chart from the helm repository, this can make for a nicer version control experience of complex helm values files. There's a full multi-source example in the architecture section.

---
title: Setting Up a Micro Service
description: Deploying a Micro Service with Plural
---


# Set Up
This example will deploy the [Plural CD Demo](https://github.com/pluralsh/plrl-cd-demo) App

#### Add the Application Repository
* In your _Infra_ repo, add the `GitRepository` CRD
  * `/app/repositories/cd-demo.yaml`
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: GitRepository
metadata:
  name: cd-demo
spec:
  url: https://github.com/pluralsh/plrl-cd-demo.git
```
* The Plural repositories Service Deployment watches for changes in `/app/repositories` and will sync it to the management cluster
  * The status `Pullable` means the Repository is ready to be used. 
![import-git-status](/images/how-to/import-git-status.png)
* Setup a Dev and Prod ServiceDeployment using the Added Repo
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: cd-demo-dev
  namespace: infra
spec:
  namespace: cd-demo
  git:
    folder: helm
    ref: main
  repositoryRef:
    kind: GitRepository
    name: cd-demo
    namespace: infra
  helm:
    version: "x.x.x"
    release: cd-demo-dev 
    values:
      image:
        repository: ghcr.io/pluralsh/plrl-cd-test
        pullPolicy: IfNotPresent
        tag: "sha-783cc0c"
      ingress:
        enabled: true
        className: nginx
        annotations: 
          cert-manager.io/cluster-issuer: letsencrypt-staging
        hosts:
          - host: cd-demo.plrl.livingroom.cloud
            paths:
              - path: /
                pathType: ImplementationSpecific
                backend:
                  service:
                    name: cd-demo-dev
                    port:
                      number: 80
        tls:
         - secretName: cd-demo-tls
           hosts:
             - cd-demo.plrl.livingroom.cloud
  clusterRef:
    kind: Cluster
    name: plrl-how-to-workload-00-dev
    namespace: infra
```
* You should be able to see the service and all its components running 
![](/images/how-to/micro-service.png)
---
title: Setting Up a Micro Service
description: Deploying a Micro Service with Plural
---


# Set Up
For this example we will deploy the [Plural CD Demo](https://github.com/pluralsh/plrl-cd-demo) App

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
---
title: Setting Up a Controller
description: Using Plural CLI to Deploy a Kubernetes Controller Resources
---

# Prerequisites
[Plural CLI](/how-to/set-up/plural-cli)

#### Ensure Cloud Provider CLI Authentication
**Plural** uses the _default_ profile when deploying resources  

AWS  
```sh
aws sts get-caller-identity
```  
AZ
```sh
az account show
```
GCP
```sh
gcloud auth list
```

#### Ensure your _[app.plural.sh](https://app.plural.sh/profile/me)_ User has `admin` permissions  

```sh
plural login
```

# Set Up
Deploy a few basic controllers to that cluster, I'd do ingress-nginx + external-dns

this should include supporting terraform to configure externaldns' IRSA rule on EKS

should be configured as GlobalServices w/ liquid templating for injecting that data in

# Troubleshooting
#### Get Kubeconfig for the MGMT Cluster
```sh
plural wkspace kube-init
```

Use `kubectl` with the newly added kube context  
The key namespaces to check are:   
* plrl-console
* plrl-deploy-operator
* plrl-runtime

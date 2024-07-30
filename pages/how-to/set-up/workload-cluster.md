---
title: Setting Up a Workload Cluster
description: Using Plural CLI to Deploy a Workload Kubernetes Cluster
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
Create first workload cluster with Stacks (should use the cluster-creator PR automation from plural up)

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

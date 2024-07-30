---
title: Setting Up a New MGMT Cluster
description: Using Plural CLI to Deploy a MGMT Kubernetes Cluster
---

### Prerequisites
[Plural CLI](/how-to/set-up/plural-cli)

##### Ensure Cloud Provider CLI Authentication
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

### Setup Repo and Deploy Resources
Ensure your _[app.plural.sh](https://app.plural.sh/profile/me)_ User has `admin` permissions  
Follow the onscreen prompts to setup the repo and deploy resources  

* The **Plural** CLI will create a new repository in the current directory
  * If there are permission related repository creation constraints  
    the repo can be cloned before running `plural` commands

* Use the provided **Plural** DNS Services for the MGMT Cluster
  * When providing a domain name provide the _canonical_ name, e.g. how-to-plrl.onplural.sh

```sh
plural login
plural up
```

# Troubleshooting
### Get Kubeconfig for the MGMT Cluster
```sh
plural wkspace kube-init
```

Use `kubectl` with the newly added kube context  
The key namespaces to check are:   
* plrl-console
* plrl-deploy-operator
* plrl-runtime

### "Console failed to become ready"
Sometimes the DNS Resolution can take longer than the expected five minutes  
It's also possible the console services take a bit longer to become ready  
```sh
2024/07/29 12:31:03 Console failed to become ready after 5 minutes, you might want to inspect the resources in the plrl-console namespace
```
In this instance the images in the _`plrl-console`_ namespace  
were taking a bit longer to download and initialize.  
Once the services were _up_ in the cli, I was able to access the console url

### Cannot list resources in the Kubernetes Dashboard
![alt text](/images/how-to/k8s-dash-403.png)
This is expected and due to missing [RBAC Bindings](https://github.com/pluralsh/documentation/blob/main/pages/deployments/dashboard.md) for the console users  

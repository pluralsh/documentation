---
title: Setting Up a New MGMT Cluster
description: Using Plural CLI to Deploy a MGMT Kubernetes Cluster
---

### Prerequisites
[Plural CLI](/how-to/set-up/plural-cli)

##### Ensure Cloud Provider CLI Authentication
Plural uses the _default_ profile when deploying resources  

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


### Create a New Repo for Plural
```sh
git clone git@github.com:pluralsh/plrl-how-to.git
cd plrl-how-to
```

### Setup Repo and Deploy Resources
Ensure your _[app.plural.sh](https://app.plural.sh/profile/me)_ User has `admin` permissions  
Follow the onscreen prompts to setup the repo and deploy resources  
* Use the provided Plural DNS Services for the MGMT Cluster
* When providing a domain name provide the _canonical_ name, e.g. how-to-plrl.onplural.sh
```sh
plural login
plural up
```

# Troubleshooting
### Get Kubeconfig for the MGMT Cluster
AWS 
```sh
aws eks update-kubeconfig --name [CLUSTER_NAME] 
```
AZ
```sh
az aks get-credentials --name [CLUSTER_NAME]
```
GCP
```sh
gcloud container clusters get-credentials [CLUSTER_NAME]
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
This is due to missing [RBAC Bindings](https://github.com/pluralsh/documentation/blob/8e205adfede17b0e412a2c8d81ac511dd71fe59b/pages/deployments/dashboard.md) for the console users  
![alt text](/images/how-to/k8s-dash-403.png)

##### Add the RBAC Helm Values in the MGMT Cluster Repo
```sh
./helm-values/ConsoleClusterRoleBindings.yaml
```
##### Configure the Cluster Role Binding for console User
```sh
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: console-binding-someone-your-company-com
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: admin
subjects:
  - apiGroup: rbac.authorization.k8s.io
    kind: User
    name: someone@your.company.com
```
You can list existing Cluster Roles with `kubectl get clusterroles`  
There are several ways to manage [RBAC Bindings](https://github.com/pluralsh/documentation/blob/8e205adfede17b0e412a2c8d81ac511dd71fe59b/pages/deployments/dashboard.md)  
This example binds the _`admin`_ cluster role to a single _someone@your.company.com_ user  


##### Apply the Bindings
```sh
kubectl apply -f ./helm-values/ConsoleClusterRoleBindings.yaml
```
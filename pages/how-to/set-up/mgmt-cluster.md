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

### "Cannot list resources in the Kubernetes Dashboard"
![alt text](/images/how-to/k8s-dash-403.png)
This is expected and due to missing [RBAC Bindings](https://github.com/pluralsh/documentation/blob/main/pages/deployments/dashboard.md) for the console users  

##### Creating an RBAC Service
* **Create an `rbac` dir in your MGMT repo 
and add the desired [k8s yaml](https://github.com/pluralsh/documentation/blob/main/pages/deployments/dashboard.md)** 
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: someones-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - apiGroup: rbac.authorization.k8s.io
    kind: User
    name: someone@your.company.com
# This will create a single binding for the someone@your.company.com user to the cluster-admin k8s role
```

* **Create a `services` dir in your MGMT repo**  
  * Add a Service Deployment CRD  
    This will create a service to sync the rbac bindings  
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: rbac
spec:
  clusterRef:
    kind: Cluster
    name: mgmt
    namespace: infra
  namespace: plrl-rbac
  git:
    folder: rbac
    ref: main
  repositoryRef:
    kind: GitRepository
    name: infra # can point to any git repository CRD
    namespace: infra
```
* **Commit and push your changes**
* **Apply the Service CRD to the MGMT Cluster**  
`kubectl apply -f ./services/rbac.yaml`

#### (Optionally) Make the RBAC Service Global
###### ℹ️ If you created a service with the Console UI 
###### you need to manually apply the service CRD referenced by the Global Service
* **Navigate to `https://console.[your-sub-domain].onplural.sh/cd/globalservices`**

* **Click the `New Global Service` button**  
  * Service Name: Name of the Existing Service
  * (Optionally) Add Cluster Tags
  * Select the Cloud Provider Distributions to Propagate the changes
* **Click `Continue`**  
* **Copy and Modify the Generated YAML**  
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: GlobalService
metadata:
  name: global-rbac
  namespace: infra
spec:
  serviceRef:
    name: rbac # ⬅️ We need to update this with the service we created for rbac
    namespace: infra
```
* **(Optionally) Save the Global Service YAML**
  * Saving the global service yaml is not required once it is applied to the cluster
  * I keep the applied yaml in `services/global-rbac.yaml` for reference

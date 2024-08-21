---
title: Setting Up a Controller
description: Adding Controllers to Workload Clusters
---

# Prerequisites
* **Plural Console `admin` permissions**  
* **[Plural CLI](/how-to/set-up/plural-cli)**
* **`kubectl` cluster access**


# Set Up

#### Example: ingress-nginx
* **Create an `ingress-nginx` Service Deployment CRD**
  * You can add the yaml to the _services_ folder in your `infra` repo
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: ingress-nginx
  namespace: infra
spec:
  namespace: ingress-nginx
  git:
    folder: controllers/ingress-nginx
    ref: main
  repositoryRef:
    kind: GitRepository
    name: infra
    namespace: infra
  helm:
    valuesFiles:
    - override-values.yaml
  clusterRef:
    kind: Cluster
    name: plrl-how-to-workload-00-dev
    namespace: infra
```  
* **Save the Chart to your Infra Repo**
  * In this example: `controllers/ingress-nginx`
```sh
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm pull ingress-nginx/ingress-nginx --untar
```
* **Add the `override-values.yaml` in the chart directory**
  * Make the desired configurations in the override values file.
* **Commit and Push the changes**
* **Apply the CRD**
  * You can get the cluster context with `plural wkspace kube-init`
  * Then apply the yaml to the cluster`kubectl apply -f ./services/ingress-nginx.yaml`
* **Navigate to `https://console.[YOUR DOMAIN].onplural.sh/cd/services`**  
  * Fom here you should see the new service being provisioned


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

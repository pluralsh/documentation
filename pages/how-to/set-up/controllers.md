---
title: Setting Up a Controller
description: Adding Controllers to Clusters
---

# Prerequisites
* **Plural Console `admin` permissions**  
* **`kubectl` cluster access**


# Set Up

### Example: Ingress NGINX
* **Add a new `HelmRepository` CRD to your _infra_ repo `./apps/repositories`**
  * Example: `ingress-nginx.yaml`
```yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: ingress-nginx
spec:
  interval: 5m0s
  url: https://kubernetes.github.io/ingress-nginx
```
* **Commit and Push the changes**  
* **Navigate to `https://console.[YOUR DOMAIN].onplural.sh/cd/services`**  
  * Click on the `helm-repositories` Service
  * You should see your newly added Helm Repository

* **Add a new [`ServiceDeployment`](https://docs.plural.sh/deployments/operator/api#servicedeployment) CRD YAML to `./apps/services`**
  * Example: `ingress-nginx.yaml`
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: ingress-nginx
  namespace: infra
spec:
  name: ingress-nginx
  namespace: ingress-nginx
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
      name: ingress-nginx # referenced helm repository above
  clusterRef:
    kind: Cluster
    name: plrl-how-to-workload-00-dev
    namespace: infra
```
* **Apply the CRD to the Cluster**
  * `k apply -f ./apps/services/ingress-nginx.yaml`
  * Notice how we apply the service CRD to the _MGMT_ cluster, but the application deploys on the workload cluster specified in the `clusterRef`


### Example: External DNS, on AWS
* **Add a new `HelmRepository` CRD to your _infra_ repo `./apps/repositories`**
  * Example: `externaldns.yaml`
```yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: external-dns
spec:
  interval: 5m0s
  url: https://kubernetes-sigs.github.io/external-dns
```

* **Create new Stack Run**
![](/images/how-to/create-stack-modal-0.png)
* **Click `Select Repository`**
![](/images/how-to/create-stack-modal-1.png)
* **Click `Setup Environment`**
![](/images/how-to/create-stack-modal-2.png)
Make sure to add `PLURAL_ACCESS_TOKEN`
* **Click Add Env Vars**

* **Add a new [`ServiceDeployment`](https://docs.plural.sh/deployments/operator/api#servicedeployment) CRD YAML to `./apps/services`**
  * Example: `externaldns.yaml.liquid`
  {% callout severity="info" %}
* The `.liquid` extension on `external-dns.yaml.liquid` tells the deployment agent to attempt to template the values file, otherwise it will interpret it as plain yaml.  
* You can use `plural cd services template` to test templates locally.
{% /callout %}
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  namespace: infra
spec:
  namespace: external-dns
  git:
    folder: helm-values
    ref: main
  repositoryRef:
    kind: GitRepository
    name: infra
    namespace: infra
  contexts:
    - externaldns # binds the externaldns context to this service
  helm:
    version: '6.14.1'
    chart: external-dns
    valuesFiles:
      - external-dns.yaml.liquid # we're using a multi-source service sourcing this values file from `helm-values/external-dns.yaml.liquid` in the infra repo above
    repository:
      namespace: infra
      name: external-dns
  clusterRef:
    kind: Cluster
    name: plrl-how-to-workload-00-dev
    namespace: infra
```
* **Commit and Push the Changes**





* ** **
* ** **
* ** **







* **Navigate to `https://console.[YOUR DOMAIN].onplural.sh/cd/services`**  


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

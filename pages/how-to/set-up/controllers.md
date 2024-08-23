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
* **Add `./terraform/modules/clusters/aws/external-dns.tf`**
```sh
module "external-dns_irsa_role" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 5.33"

  role_name                  = "${module.eks.cluster_name}-external-dns"
  attach_external_dns_policy = true

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["${var.external-dns-namespace}:external-dns"]
    }
  }
}
```
  * And any additional variables to `./terraform/modules/clusters/aws/variables.tf`
```sh
variable "external-dns-namespace" {
  type    = string
  default = "external-dns"
}
```
* **Commit and Push the Changes**  
Adding the terraform in the `~/terraform/modules/cluster/aws` directory  
will ensure all AWS cluster, other than MGMT, will contain those configurations.  
The Cluster Creator Stack Run is configured to watch that directory and deploy any committed changes.

* **Navigate to `https://console.[YOUR DOMAIN].onplural.sh/stacks`** to see the status of the run


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

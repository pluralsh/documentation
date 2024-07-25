---
title: Setting Up Plural Console
description: How to Deploy the Plural Console to a MGMT Cluster
---

# Pre Reqs

#### [Mac Homebrew](https://brew.sh/)
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
```
##### [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
```sh
brew install awscli
```
#### [Helm CLI](https://helm.sh/docs/intro/install/)
```sh
brew install helm
```
#### [Plural CLI](https://github.com/pluralsh/plural-cli/?tab=readme-ov-file#installation)
```sh
brew install pluralsh/plural/plural
```
### Configure AWS CLI Config
```ini
#~/.aws/config
# Note: The profile name is arbitrary
[profile plrl-sandbox]
sso_start_url = https://pluralsh.awsapps.com/start
sso_region = us-east-2
sso_account_id = 312272277431
sso_role_name = AdministratorAccess
region = us-east-1
output = json
```
#### Test access
```sh
aws sso login --profile plrl-sandbox
```
```sh
# example output
Attempting to automatically open the SSO authorization page in your default browser.
If the browser does not open or you wish to use a different device to authorize this request, open the following URL:

https://device.sso.us-east-2.amazonaws.com/

Then enter the code:

XXXX-XXXX
Successfully logged into Start URL: https://pluralsh.awsapps.com/start
```
##### See if the you are authenticated and can assume the proper role
```sh
aws --profile plrl-sandbox sts get-caller-identity
```
```sh
# example output
{
    "UserId": "XXXXXXXXXXXXXXXXXXXXX:kevin",
    "Account": "XXXXXXXXXXXX",
    "Arn": "arn:aws:sts::XXXXXXXXXXXX:assumed-role/AWSReservedSSO_AdministratorAccess_63ff4a47c5786193/kevin"
}
```

# Deploy K8s Cluster
If you already have an EKS Cluster running you can skip to [Cluster Configuration](#Cluster-Configuration)
### Create Plural Console Install Repo
```sh
mkdir -p ~/git/plrl/plural-console && cd $_
git init
git remote add origin git@github.com:pluralsh/plrl-console-kev.git
git submodule add https://github.com/pluralsh/bootstrap.git
mkdir clusters apps helm-values
mkdir apps/repositories apps/services apps/terraform
touch clusters/mgmt.tf clusters/providers.tf
cp bootstrap/terraform/clouds/aws/outputs.tf clusters/.
cp bootstrap/test/aws/provider.tf clusters/.
```

### Configure Terraform for AWS EKS Deployment
```sh
# ./clusters/mgmt.tf
locals {
  console_name = "plrl-console-kev"
}
module "mgmt" {
  source              = "../bootstrap/terraform/clouds/aws"
  cluster_name        = "${local.console_name}-eks"
  vpc_name            = "${local.console_name}-vpc"
  db_name             = "${local.console_name}-psql"
  kubernetes_version  = "1.29"
  deletion_protection = false
}

resource "aws_route53_zone" "primary" {
  name = "plrl.livingroom.cloud"
}
```

### Run Terraform
```sh
cd clusters
terraform init -upgrade
terraform plan
terraform apply
terraform output -json
```

### Get the Kubeconfig for New Cluster to use with `kubectl`/Lense App, etc
```sh
aws --profile plrl-sandbox eks update-kubeconfig --name plrl-console-kev-eks --alias plrl-console-kev-eks
```

# Cluster Configuration
### Copy External DNS and Cert Manager IAM Policies for K8s Service Accounts
```sh
cp bootstrap/existing/terraform/aws/iam.tf ./clusters/.
cp bootstrap/existing/terraform/aws/values.tf ./clusters/.
```
### Add your cluster Name and OIDC provider to the terraform variables
```sh
# ./clusters/variables.tf
variable "cluster_name" {
  description = "The name of the EKS cluster"
  type        = "string"
  default     = "plrl-console-kev-eks"
}

variable "cluster_oidc_issuer_arn" {
  type        = string
  description = "The OIDC issuer URL of the EKS cluster"
  default     = "oidc.eks.us-east-1.amazonaws.com/id/CF79038576E92F4C852874A4B10AE974"
}
```
### Add an AWS Route53 Hosted Zone
```sh
# ./clusters/iam.tf
resource "aws_route53_zone" "primary" {
  name = "plrl.livingroom.cloud"
}
```

### Apply the Changes to AWS
```sh
terraform apply
```
### Configure your DNS to use Route 53
#### Get the Hosted Zone's Name Servers
```sh
# Replace the ZONE_NAME with your domain and run the aws cli command to ge the name servers
ZONE_NAME="plrl.livingroom.cloud."
aws --profile plrl-sandbox route53 list-hosted-zones --query "HostedZones[?Name=='${ZONE_NAME}'].Id" --output text | xargs -I {} aws --profile plrl-sandbox route53 get-hosted-zone --id {} --query 'DelegationSet.NameServers' --output table
```
```sh
#example output
-----------------------------
|       GetHostedZone       |
+---------------------------+
|  ns-534.awsdns-02.net     |
|  ns-1750.awsdns-26.co.uk  |
|  ns-234.awsdns-29.com     |
|  ns-1029.awsdns-00.org    |
+---------------------------+
```
#### Create an NS Records for each AWS name server
* A minimum of two records are required
* Ensure the NS records are for the root or subdomain to be used by the plural consol
* In my case the is for plrl.livingroom.cloud
* I'm using CloudFlare as my domain provider with these records

| Type  | Name  | Content   | Proxy Status | TTL   |
|-------|-------|-----------|--------------|-------|
| A     | livingroom.cloud     | x.x.x.x | Enabled      | 1m  |
| NS | plrl   | ns-234.awsdns-29.com | Disabled   | 1m  |
| NS | plrl   | ns-1750.awsdns-26.co.uk | Disabled   | 1m  |
| NS | plrl   | ns-234.awsdns-29.com | Disabled   | 1m  |
| NS | plrl   | ns-1029.awsdns-00.org | Disabled   | 1m  |
##### Note: You may need to wait for [DNS propagation](https://www.whatsmydns.net/#NS/plrl.livingroom.cloud) before the console/TLS validation is available 

### Update Helm Values with the created IAM Roles and use Appropriate Provider
```sh
cp bootstrap/helm/* helm-values/.
```
```yaml
# ./helm-values/certmanager.yaml
installCRDs: true
serviceAccount:
  name: cert-manager
  annotations:
    eks.amazonaws.com/role-arn: "arn:aws:iam::312272277431:role/plrl-console-kev-eks-certmanager-extdns"
securityContext:
  fsGroup: 1000
  runAsNonRoot: true
```
```yaml
# ./runtime.yaml
... 

external-dns:
  enabled: true
  serviceAccount:
    name: externaldns
    annotations:
      plural.sh/dummy: ignore
      eks.amazonaws.com/role-arn: "arn:aws:iam::312272277431:role/plrl-console-kev-eks-certmanager-extdns"
...
  provider: aws # <- change to the provider you actually wish to use

  domainFilters:
  - plrl.livingroom.cloud # <- you need to change this

ingress-nginx:
  controller:
    service:
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
        service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp
        service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: 'true'
        service.beta.kubernetes.io/aws-load-balancer-type: external
        service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip
        service.beta.kubernetes.io/aws-load-balancer-proxy-protocol: "*"
        service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: '3600'

```
### Deploy Plural Runtime
```sh
helm repo add jetstack https://charts.jetstack.io || helm repo update
helm repo add plrl-bootstrap https://pluralsh.github.io/bootstrap || helm repo update
helm upgrade --install --create-namespace cert-manager jetstack/cert-manager -f helm-values/certmanager.yaml -n cert-manager
helm upgrade --install --create-namespace plrl-runtime plrl-bootstrap/runtime -f helm-values/runtime.yaml -n plrl-runtime
```

### Deploy Plural Console
```sh
plural login
# Note: If you deployed using bootstrap terraform you can get the PSQL connection string from running: terraform output --json
plural cd control-plane
helm repo add plrl-console https://pluralsh.github.io/console
helm upgrade --install --create-namespace -f values.secret.yaml console plrl-console/console -n plrl-console
```

#### View and Login to the Console: https://console.plrl.livingroom.cloud

### Add an [RBAC Binding](https://github.com/pluralsh/documentation/blob/8e205adfede17b0e412a2c8d81ac511dd71fe59b/pages/deployments/dashboard.md) for the console users
```sh
mkdir rbac
touch ./rbac/ConsoleClusterRoleBindings.yaml
```
### Configure the Cluster Role Binding for console User
```sh
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: console-kev-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: admin
subjects:
  - apiGroup: rbac.authorization.k8s.io
    kind: User
    name: Kevin@Plural.sh
```
### Apply the Bindings
```sh
kubectl apply -f ./rbac/ConsoleClusterRoleBindings.yaml
```


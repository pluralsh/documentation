---
title: Getting started with Runtime
description: Learn how to deploy and configure the Plural Runtime chart on your Kubernetes clusters.
---

This guide walks you through deploying the Plural Runtime chart to set up a complete network stack on your Kubernetes clusters.

## Prerequisites

Before getting started, ensure you have:

- A Kubernetes cluster managed by Plural
- A Git repository connected to Plural for GitOps
- Access to your cloud provider's DNS service (for external-dns configuration)

## Deployment Options

There are two main ways to deploy Runtime:

1. **Global Service** - Deploy to multiple clusters with shared configuration (recommended)
2. **Single Service** - Deploy to a specific cluster

## Option 1: Deploy as a Global Service

Using a Global Service ensures Runtime is consistently deployed across all clusters matching specific tags. This is the recommended approach for fleet-wide deployments.

Create a file at `bootstrap/components/runtime.yaml`:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: GlobalService
metadata:
  name: runtime
  namespace: infra
spec:
  cascade:
    delete: true
  tags:
    role: workload
  template:
    name: runtime
    namespace: plural-runtime
    repositoryRef:
      kind: GitRepository
      name: infra
      namespace: infra
    git:
      ref: main
      folder: helm
    helm:
      version: 0.1.35
      chart: runtime
      url: https://pluralsh.github.io/bootstrap
      valuesFiles:
      - runtime.yaml.liquid
```

Then create the values file at `helm/runtime.yaml.liquid`:

```yaml {% process=false %}
external-dns:
  enabled: true
  provider: aws
  txtOwnerId: plrl-{{ cluster.handle }}
  policy: sync
  domainFilters:
  - {{ cluster.metadata.dns_zone }}
  serviceAccount:
    annotations:
      eks.amazonaws.com/role-arn: {{ cluster.metadata.iam.external_dns }}

cert-manager:
  enabled: true
  serviceAccount:
    name: cert-manager
    annotations:
      eks.amazonaws.com/role-arn: {{ cluster.metadata.iam.cert_manager }}

ingress-nginx:
  enabled: true
  controller:
    service:
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
        service.beta.kubernetes.io/aws-load-balancer-type: external
        service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip

ingress-nginx-private:
  enabled: false
```

{% callout severity="info" %}
The `.liquid` extension enables dynamic templating using cluster metadata. See {% doclink to="plural_features_service_templating" %}Service Templating{% /doclink %} for more details.
{% /callout %}

## Option 2: Deploy as a Single Service

For deploying to a specific cluster, create a ServiceDeployment resource:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: runtime
  namespace: infra
spec:
  name: runtime
  namespace: plural-runtime
  clusterRef:
    name: my-cluster
    namespace: infra
  repositoryRef:
    kind: GitRepository
    name: infra
    namespace: infra
  git:
    ref: main
    folder: helm
  helm:
    version: 0.1.35
    chart: runtime
    url: https://pluralsh.github.io/bootstrap
    valuesFiles:
    - runtime.yaml
```

## Configuration Reference

### Disabling Components

Each component can be individually disabled. For example, to disable cert-manager if you're managing it separately:

```yaml
cert-manager:
  enabled: false
```

### Ingress NGINX Configuration

The default ingress controller configuration is optimized for production use:

```yaml
ingress-nginx:
  enabled: true
  controller:
    config:
      proxy-body-size: '0'
      proxy-read-timeout: '3600'
      proxy-send-timeout: '3600'
    autoscaling:
      enabled: true
      minReplicas: 2
      maxReplicas: 11
      targetMemoryUtilizationPercentage: 95
    resources:
      requests:
        cpu: 100m
        memory: 250Mi
```

### Private Ingress Controller

Enable the private ingress controller for internal services:

```yaml
ingress-nginx-private:
  enabled: true
  controller:
    ingressClass: internal-nginx
    service:
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-scheme: internal
```

### External DNS Configuration

Configure external-dns for your DNS provider:

{% tabs %}
{% tab title="AWS Route53" %}
```yaml
external-dns:
  enabled: true
  provider: aws
  domainFilters:
  - example.com
  serviceAccount:
    annotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::123456789:role/external-dns
```
{% /tab %}
{% tab title="Google Cloud DNS" %}
```yaml
external-dns:
  enabled: true
  provider: google
  domainFilters:
  - example.com
  google:
    project: my-gcp-project
```
{% /tab %}
{% tab title="Azure DNS" %}
```yaml
external-dns:
  enabled: true
  provider: azure
  domainFilters:
  - example.com
  azure:
    resourceGroup: my-resource-group
    tenantId: my-tenant-id
    subscriptionId: my-subscription-id
```
{% /tab %}
{% /tabs %}

{% callout severity="info" %}
External DNS is safe to run multiple times in the same cluster. You can deploy additional instances configured for different domains without conflicts.
{% /callout %}

### Cert Manager Configuration

Configure certificate issuance:

```yaml
cert-manager:
  enabled: true
  installCRDs: true

letsencrypt:
  enabled: true
  email: admin@example.com
```

## Cloud Provider Setup

### AWS (EKS)

For AWS deployments, ensure you have the necessary IAM roles configured. The `plural up` scaffolding includes these by default in `terraform/modules/clusters/aws/addons.tf`:

```tf
module "externaldns_irsa_role" {
  source = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 5.33"

  role_name                  = "${module.eks.cluster_name}-externaldns"
  attach_external_dns_policy = true
  attach_cert_manager_policy = true

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = [
        "plural-runtime:external-dns",
        "cert-manager:cert-manager"
      ]
    }
  }
}
```

### GCP (GKE)

For GKE, use Workload Identity for authentication. See [Google's Workload Identity documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) for setup instructions.

### Azure (AKS)

For AKS, configure Azure AD Pod Identity or Workload Identity. See [Azure's documentation](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview) for details.

## Verifying the Deployment

After deploying, verify the components are running:

```sh
kubectl get pods -n plural-runtime
```

You should see pods for:
- `ingress-nginx-controller-*`
- `external-dns-*`
- `cert-manager-*`

Check that the ingress controller has an external IP:

```sh
kubectl get svc -n plural-runtime
```

## Troubleshooting

### Ingress Controller Not Getting External IP

If the ingress controller service remains in `Pending` state:

1. Check cloud provider annotations are correct
2. Verify load balancer controller is running (for AWS)
3. Check service account IAM permissions

### DNS Records Not Being Created

If external-dns isn't creating records:

1. Verify the domain filter matches your zone
2. Check external-dns logs: `kubectl logs -n plural-runtime -l app.kubernetes.io/name=external-dns`
3. Verify IAM/service account permissions for DNS management

### Certificate Issuance Failing

If certificates are not being issued:

1. Check cert-manager logs: `kubectl logs -n plural-runtime -l app.kubernetes.io/name=cert-manager`
2. Verify the ClusterIssuer is ready: `kubectl get clusterissuer`
3. For DNS-01 challenges, ensure cert-manager has DNS permissions

## Next Steps

- {% doclink to="plural_features_continuous_deployment_global_service" %}Global Services{% /doclink %} - Learn more about deploying services across your fleet
- {% doclink to="plural_features_service_templating" %}Service Templating{% /doclink %} - Understand how to use Liquid templating for dynamic configuration
- {% doclink to="getting_started_how_to_use_controllers" %}Set up ingress on a cluster{% /doclink %} - Alternative approach using individual components

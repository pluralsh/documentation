---
title: Setting Up Ingress on a Cluster
description: Setting up your edge networking on a cluster, and learn a bit about GlobalServices and Add-Ons
---

# Setting the stage

A very common problem a user will need to solve when setting up a new cluster is getting edge networking set up.  This includes solving a few main concerns:

* Ingress - this sets up an ingress controller for load balancing incoming HTTP requests into the microservices on your cluster
* DNS registration - you can use externaldns to automate listening for new hostname registrations in ingress resources and registering them with standard DNS services like route53
* SSL Cert Management - the standard K8s approach to this is using Cert Manager.

`plural up` gets you 90% of the way there out of the box, you'll just need to configure a few basic things.  We also provide a consolidated [runtime chart](https://github.com/pluralsh/bootstrap/tree/main/charts/runtime) that makes installing these in one swoop much easier, but you can also mix-and-match from the CNCF ecosystem as well based on your organizations requirements and preferences.

The tooling you'll use here should also generalize to any other common runtime add-ons you might need to apply, which are all optimally managed via global services and if the templating is done well, will require a very small set of files to maintain.  Some of these concerns can be:

* setting up datadog-agent in all your clusters
* setting up istio/linkerd service meshes in your clusters
* setting up security tooling like trivy or kubescape in your cluster
* setting up cost management tooling like kubecost 

## Setting Up The Runtime Chart

We're going to use our [runtime chart](https://github.com/pluralsh/bootstrap/tree/main/charts/runtime) for now, but the technique can generalize to any other helm chart as well, so if you want to mix and match, feel free to simply use this as inspiration.  

First, let's create a global service for the runtime chart.  This will ensure it's installed on all clusters with a common tagset.  Writing this to `bootstrap/components/runtime.yaml`

{% callout severity="info" %}
The global services will all be written to a subfolder of `bootstrap`.  This is because `plural up` initializes a bootstrap service-of-services under that folder and so we can guarantee any file written there will be synced.  Sets of configuration that should be deployed independently and not to the mgmt cluster ought to live in their own folder structure, which we typically put under `services/**`. 

*Changes will not be applied until they are pushed or merged to your main branch that the root `apps` service is listening to.*
{% /callout %}

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: plrl-runtime
  namespace: infra
spec:
  tags:
    role: workload
  template:
    name: runtime
    namespace: plural-runtime # note this for later
    git:
      ref: main
      folder: helm
    repositoryRef:
      name: infra # this should point to your `plural up` repo
      namespace: infra
    helm:
      version: 4.4.x
      chart: runtime
      url: https://pluralsh.github.io/bootstrap
      valuesFiles:
      - runtime.yaml.liquid
```

Notice this is expecting a `helm/runtime.yaml.liquid` file.  This would look something like:

```yaml
plural-certmanager-webhook:
  enabled: false

ownerEmail: <your-email>

external-dns:
  enabled: true

  logLevel: debug

  provider: aws

  txtOwnerId: plrl-{{ cluster.handle }} # templating in the cluster handle, which is unqiue, to be the externaldns owner id

  policy: sync
  
  domainFilters:
  - {{ cluster.metadata.dns_zone }} # check terraform/modules/clusters/aws/plural.tf for where this is set

  serviceAccount:
    annotations:
      eks.amazonaws.com/role-arn: {{ cluster.metadata.iam.external_dns }} # check terraform/modules/clusters/aws/plural.tf for where this is set
```

You'll also want to modify `terraform/modules/clusters/aws/plural.tf` to add the `dns_zone` to the metadata, it will look something like this once complete:

{% callout severity="info" %}
Usually DNS is managed by systems that predate adoption of Plural and so we don't provision it by default.  We often recommend users create subdomains and register them w/ their root domain using an NS record to give their k8s cluster a sandboxed scope to register their dns entries in.
{% /callout %}

```tf
local {
  dns_zone_name = <my-dns-zone> # you might also want to register this in the module, or likely register it elsewhere.  Just the name is sufficient.
}

resource "plural_cluster" "this" {
    handle = var.cluster
    name   = var.cluster


    tags = {
      role   = "workload" # add this to allow for global services to target only workload clusters
      tier   = var.tier
      region = var.region
    }

    metadata = jsonencode({
      dns_zone = local.dns_zone_name

      iam = {
        load_balancer      = module.addons.gitops_metadata.aws_load_balancer_controller_iam_role_arn
        cluster_autoscaler = module.addons.gitops_metadata.cluster_autoscaler_iam_role_arn
        external_dns       = module.externaldns_irsa_role.iam_role_arn
        cert_manager       = module.externaldns_irsa_role.iam_role_arn
      }
    })

    kubeconfig = {
      host                   = module.eks.cluster_endpoint
      cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
      token                  = data.aws_eks_cluster_auth.cluster.token
    }
}
```

Notice also, we've already prebuilt the iam policies for external-dns for you in `terraform/modules/clusters/aws/addons.tf`.  If you want another add-on, you can easily imitate that pattern, or you're free to tune our defaults as well.  The terraform that does it looks like this:

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
        "external-dns:external-dns", 
        "cert-manager:cert-manager"
      ]
    }
  }
}
```

And uses some off-the-shelf tf modules they have created.  It's output is then plumbed to the `plural_cluster.this` resource which allows the dynamic templating in the `runtime.yaml.liquid` file.  In general, any file can add a `.liquid` extension, and our agent will dynamically template it.  You can read more about that [here](/deployments/templating).

## Setting Up AWS Load Balancer Controller (AWS only)

EKS is very bare bones and doesn't ship with a fully featured load balancer controller by default. To get full support for provisioning NLBs and ALBs, you should deploy the load balancer controller to your cluster, which would be done with a global service at `bootstrap/components/aws-load-balancer.yaml`:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: GlobalService
metadata:
  name: aws-load-balancer-controller
  namespace: infra
spec:
  cascade:
    delete: true
  tags:
    role: workload
  template:
    name: aws-load-balancer-controller
    namespace: kube-system
    protect: true # protect prevents deletion in the UI, but also tunes the cluster drain behavior to leave this service in-place which can help w/ cleanup
    helm:
      version: "x.x.x"
      chart: aws-load-balancer-controller
      url: https://aws.github.io/eks-charts
      valuesFiles:
      - loadbalancer.yaml.liquid
    git:
      folder: helm
      ref: main
    repositoryRef:
      kind: GitRepository
      name: infra
      namespace: infra
```

The `helm/loadbalancer.yaml.liquid` file would then be:

```yaml
clusterName: {{ cluster.handle }}
createIngressClassResource: false

serviceAccount:
  create: true
  name: aws-load-balancer-controller-sa
  annotations:
    client.lifecycle.config.k8s.io/deletion: detach
    eks.amazonaws.com/role-arn: {{ cluster.metadata.iam.load_balancer }} # notice this is also from terraform/modules/aws/plural.tf
```

## Setting Up Cert-Manager

Cert-Manager is an almost ubiquitous component in kubernetes and usually should be managed separately.  We'll set it up, and also provision a Route53 dns01 issuer alongside it (write to `bootstrap/components/cert-manager.yaml`):

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: GlobalService
metadata:
  name: cert-manager
  namespace: infra
spec:
  cascade:
    delete: true
  tags:
    role: workload
  template:
    repositoryRef:
      kind: GitRepository
      name: infra
      namespace: infra
    git:
      ref: main
      folder: helm
    helm:
      version: "v1.x.x"
      chart: cert-manager
      url: https://charts.jetstack.io
      valuesFiles:
      - certmanager.yaml.liquid
```

The values file needed here is and should be placed in `helm/certmanager.yaml.liquid`:

```yaml
installCRDs: true
serviceAccount:
  name: cert-manager
  annotations:
    eks.amazonaws.com/role-arn: {{ cluster.metadata.iam.cert_manager }}

securityContext:
  fsGroup: 1000
  runAsNonRoot: true
```

{% callout severity="info" %}
The `runtime` chart does provision a `letsencrypt-prod` issuer using the http01 ACME protocol, which usually requires no additional configuration. It might be suitable for your usecase, in which case the following is unnecessary.  We have noticed it's more prone to flaking vs dns01. Also it can only work on publicly accessible endpoints since it requires an HTTP call to a service hosted by your ingress.
{% /callout %}

This sets up IRSA auth to cert-manager to allow dns01 ACME cert validations to succeed using Route53.  You'll then want to create another service to spawn the cluster issuer resources cert-manager uses, you can do this by adding a file in `services/cluster-issuer/clusterissuer.yaml`:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: dns01
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/
    email: <your email> # replace here

    privateKeySecretRef:
      name: letsencrypt-prod

    # ACME DNS-01 provider configurations to verify domain
    solvers:
    - dns01:
        route53:
          region: us-east-1 # or whatever region you're configured for
```

And now you can add a final global service in `bootstrap/components/cluster-issuer.yaml`:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: GlobalService
metadata:
  name: cluster-issuer
  namespace: infra
spec:
  cascade:
    delete: true
  tags:
    role: workload
  template:
    name: cluster-issuer
    namespace: cert-manager
    repositoryRef:
      kind: GitRepository
      name: infra
      namespace: infra
    git:
      ref: main
      folder: services/cluster-issuer # simply source the raw yaml from the services/cluster-issuer folder 
```

## Push to Deploy

We registered all these manifests under the root `bootstrap` folder a `plural up`-derived management cluster listens to by default, so all you should need to do is either:

```sh
git commit -m "setup our cluster runtime"
git push
```

or create a PR, approve it, and merge to have the global deploy to all your clusters.  

{% callout severity="info" %}
You might need to wait a minute or two for the system to poll git and realize there's a new change.
{% /callout %}

Once you've configured all of these, you should see the new Global Services at https://{your-console-domain}/cd/globalservices.
---
title: Sandboxing Your Cluster
description: Deploy an instance with no outbound network dependencies to Plural
---

# Background

By default there are two ways your Plural Console will communicate with Plural:

- An HTTP call to confirm feature entitlements against your current subscription
- OIDC handshake if you have configured our OIDC provider

Both of these can be disabled individually or collectively. You might still have other things making outbound network requests, in particular, we ship with two repos pre-configured:

- https://github.com/pluralsh/deployment-operator
- https://github.com/pluralsh/scaffolds

The former is much more important as it hosts upgrades to our deployment agent (although it won't break anything if not pullable due to proxy configuration).

Also our deprecation and compatibility tracking ultimately source their data from the https://github.com/pluralsh/console repo.

## Sandboxed Licensing

As part of an enterprise agreement, we can issue you a year-long license key that can then be configured into your console instance via setting the `CONSOLE_LICENSE_KEY` env var. We are happy to help configure that as part of setting up your instance as well.

## Bring-Your-Own-OIDC

For companies that are more comfortable using their own auth provider, and don't require the ease of use of just plugging in ours, you can configure your own. If you don't have an OIDC compatible identity provider, we recommend installing [dex](https://dexidp.io/docs/getting-started/) as a passthrough. It can communicate with SAML or other auth providers and convert them to a conformant OIDC interface.

To set it up, you need to configure a few env vars as well, in particular:

- `OIDC_CLIENT_ID`: client id for your oidc connection
- `OIDC_CLIENT_SECRET`: client secret for your oidc connection
- `OIDC_DISCOVERY_URL`: the discovery url for your oidc provider, is usually something like `https://{your-idp-domain}/.well-known/openid-configuration`
- `OIDC_SCOPES` (optional): the scopes to fetch when issuing the oidc userinfo request (defaults to `openid email`). You want to at least make sure the email is fetchable for a user, and if you add groups to the scopes we'll auto-sync them into your instance as well.

## Self-host git repos

If your enterprise cannot accept external communication to github, we recommend vendoring the above repos into your own source control provider (most have a mechanism for doing this, or can always build a cron to do it as well which we're happy to help with).

The deployment-operator and scaffolds repos were both designed to be forked or vendored. Once you've decided upon a strategy for both, you can configure them as repositories in your console, then go to https://{your-plural-console}/cd/settings/repositories and chose to rewire the relevant repos as needed. You can also just directly modify the url and authorization information for the https://github.com/pluralsh/deployment-operator.git and other repos if you'd like too.

To reconfigure a self-managed repo for compatibilities and deprecations, you'll need to fork or vendor https://github.com/pluralsh/console then configure the `GITHUB_RAW_URL` env var to point to the new location. The current default is https://raw.githubusercontent.com/pluralsh/console. This will then be appended w/ the branch + path (eg "${GITHUB_RAW_URL}/master/static/compatibilities) to fetch the relevant data for both uis.

## Customizing Docker Registries

Lots of enterprises have strict requirements around the docker registries they use, or pull caches that whitelist a limited set of registries. We currently publish our images to dockerhub, gcr and our own registry, dkr.plural.sh. We are also adding quay.io in the near future for orgs that integrate with that as well. The important images for setting up your own instance are:

- pluralsh/console
- pluralsh/kas
- pluralsh/deployment-controller
- pluralsh/deployment-operator
- pluralsh/agentk

The first three will be configured in the main console chart and are installed once in your management cluster, the latter two are needed for your deployment agent pod, and require a bit more advanced configuration to manage them in bulk.

A starter values file for configuring images for your console in the management cluster would be:

```yaml
# configure main console image
image:
  repository: your.enterprise.registry/pluralsh/console
  tag: 0.8.7 # only if you want to pin a tag (not recommended as it's set by the chart already)

# configure console operator image
controller:
  controllerManager:
    manager:
      image:
        repository: your.enterprise.registry/pluralsh/console

# configure kas image
kas:
  image:
    repository: your.enterprise.registry/pluralsh/kas
```

And for the agent it would be:

```yaml
# configure main agent
image:
  repository: your.enterprise.registry/pluralsh/deployment-operator

# configure agentk (if this isn't pullable kubernetes dashboarding functionality will break but deployments can still proceed)
agentk:
  image:
    repository: your.enterprise.registry/pluralsh/agentk
```

For more advanced configuration, we definitely recommend consulting the charts directly, they're both open source at https://github.com/pluralsh/console and https://github.com/pluralsh/deployment-operator.

## Configuring Agent Helm Values

Like we said, the main console deployment is pretty easy to configure, but the agents need to be handled specially since they need to be configured in bulk. We provide a number of utilities to make reconfiguration scalable.

First, you'll first want to use our agent settings to configure your helm updates for agents globally, done at `/cd/settings/agents`. You should see a screen like the following that allows you to edit the helm values for agent charts managed through Plural:

![](/assets/deployments/agent-update.png)

When you're installing an agent on a new cluster, you'll want to specify your custom values so agent pods can properly bootstrap as well. You have two main options, install via cli or terraform. To configure custom values when using the cli, there's a `--values` flag that can point to a yaml file for your custom values, eg something like:

```bash
plural cd clusters bootstrap --name my-new-cluster --values ./agent-values.yaml
```

This will merge in those values with the chart, and you can use the example yaml above to jumpstart writing the exact spec you need.

For terraform, our provider also supports passing custom values like the following for eks:

```tf
data "aws_eks_cluster" "cluster" {
  name = var.cluster_name
}

data "aws_eks_cluster_auth" "cluster" {
  name = var.cluster_name
}

# store agent values in an adjacent file for the purpose of this example
data "local_file" "agent_values" {
  filename = "${path.module}/../helm-values/agent.yaml"
}

# this creates the cluster in our api, then performs a helm install w/ the agent chart in one tf resource
resource "plural_cluster" "my-cluster" {
    handle   = "my-cluster"
    name     = var.cluster_name
    tags     = var.tags

    helm_values = data.local_file.agent_values.content # can also just be passed as a raw string instead of using the file import method

    kubeconfig = {
      host                   = data.aws_eks_cluster.cluster.endpoint
      cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
      token                  = data.aws_eks_cluster_auth.cluster.token
    }
}
```

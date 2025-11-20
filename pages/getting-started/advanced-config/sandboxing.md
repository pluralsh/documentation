---
title: Sandboxing your cluster
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

OIDC providers require you to configure a redirect url, which for the Plural console will simply be: `https://{your-console-fqdn}/oauth/callback`.

To set it up, you need to configure a few env vars as well, in particular:

- `OIDC_CLIENT_ID`: client id for your oidc connection
- `OIDC_CLIENT_SECRET`: client secret for your oidc connection
- `OIDC_DISCOVERY_URL`: the discovery url for your oidc provider, is usually something like `https://{your-idp-domain}/.well-known/openid-configuration`
- `OIDC_SCOPES` (optional): the scopes to fetch when issuing the oidc userinfo request (defaults to `openid email`). You want to at least make sure the email is fetchable for a user, and if you add groups to the scopes we'll auto-sync them into your instance as well.

To simplify permission management, you can also configure specific emails to automatically be made admins via another env var: `CONSOLE_ADMIN_EMAILS`. It should be a comma seperated list, and on login we'll provision that user to be an admin w/in your Plural console instance. We'd recommend only setting this for a small set of users, then using group bindings for permissions from then on

## Self-Host Git Repos

If your enterprise cannot accept external communication to github, we can provide a fully self-hosted git server built with [soft-serve](https://github.com/charmbracelet/soft-serve) with the required Plural repos pre-cloned at a compatible version for your instance of the console.  This can be easily enabled via helm with the following values:

```yaml
extraEnv:
- name: CONSOLE_DEPLOY_OPERATOR_URL
  value: http://git-server.plrl-console:23232/deployment-operator.git # uses the git server for deployment operator updates
- name: CONSOLE_ARITIFACTS_URL
  value: http://git-server.plrl-console:23232/scaffolds.git # uses the git server for our default service catalog setup artifacts
gitServer:
  enabled: true
```

We publish a new version of this every release so you will simply need to ensure it's vendored and ready to pull on each helm upgrade.  Many organizations have a natural way to vendor docker images, and since this is deployed as a fully self-contained container image, you can simply repurpose that process to managing the necessary git repositories as well.

If you want to vendor the repositories entirely, the upstream repos are here:

- https://github.com/pluralsh/deployment-operator
- https://github.com/pluralsh/scaffolds

## Sandboxed Compatibility Tables

We also bundle the compatibility and deprecation data in our docker images, and you can disable live polling github by setting the env var:

```
CONSOLE_AIRGAP: "true"
```

This is a suitable replacement if you're ok with some data staleness and don't have a feasible alternative to vendor the data into your enterprise git source control nor can permit the github egress traffic.

## Customizing Docker Registries

Lots of enterprises have strict requirements around the docker registries they use, or pull caches that whitelist a limited set of registries. The important images for setting up your own instance are:

- ghcr.io/pluralsh/console
- ghcr.io/pluralsh/kas
- ghcr.io/pluralsh/deployment-controller
- ghcr.io/pluralsh/deployment-operator
- ghcr.io/pluralsh/agentk
- ghcr.io/pluralsh/git-server (optional if you want to use our vendored git server)
- ghcr.io/pluralsh/registry/bitnami/redis:7.4.2-debian-12-r5

{% callout severity="info" %}
All of these images follow semver, and are also published to `gcr.io` and `docker.io` as well for convenience, in the event that either of those are eligible for internal pull-through caches.  The redis instance is not meaningfully customized and any bitnami or equivalent redis container image can theoretically work there.
{% /callout %}

The first three will be configured in the main console chart and are installed once in your management cluster, the latter two are needed for your deployment agent pod, and require a bit more advanced configuration to manage them in bulk.

A starter values file for configuring images for your console in the management cluster would be:

```yaml
# configure main console image
global:
  registry: your.enterprise.registry

# configure kas image
kas:
  agent:
    proxy:
      image:
        repository: your.enteprise.registry/some/nginx

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

## Disable cert-manager based TLS

Our chart defaults to including TLS reconciled by cert-manager, but if you use a cloud-integrated cert management tool like Amazon Certificate Manager, it is unnecessary and could cause double-encryption.  Disabling is a simple values override, done with:

```yaml
# main plural ingress
ingress:
  tls:
    enabled: false

# disable for KAS ingress too
kas:
  ingress:
    tls:
      enabled: false
```

## Configuring Agent Helm Values

Like we said, the main console deployment is pretty easy to configure, but the agents need to be handled specially since they need to be configured in bulk. We provide a number of utilities to make reconfiguration scalable.

First, you'll first want to use our agent settings to configure your helm updates for agents globally, done at `/cd/settings/agents`. You should see a screen like the following that allows you to edit the helm values for agent charts managed through Plural:

![](/assets/deployments/agent-update.png)

This can also be set via CRD using:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: DeploymentSettings
metadata:
  name: global # this is a singleton resource that is always at this location
  namespace: plrl-deploy-operator
spec:
  agentHelmValues: # from values above
    image:
      repository: your.enterprise.registry/pluralsh/deployment-operator

    # configure agentk (if this isn't pullable kubernetes dashboarding functionality will break but deployments can still proceed)
    agentk:
      image:
        repository: your.enterprise.registry/pluralsh/agentk
```

From there, both our CLI and terraform provider will ensure these helm values are always applied either in a direct agent install with:

```bash
plural cd clusters bootstrap --name my-new-cluster
```

or via terraform with:

```tf
resource "plural_cluster" "my-cluster" {
    handle   = "my-cluster"
    name     = "my-cluster"
    
    tags = {
      tier = "dev"
      fleet = "my-fleet"
    }

    kubeconfig = { ... }

}
```
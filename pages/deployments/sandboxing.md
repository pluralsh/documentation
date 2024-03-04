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

`OIDC_CLIENT_ID`: client id for your oidc connection
`OIDC_CLIENT_SECRET`: client secret for your oidc connection
`OIDC_DISCOVERY_URL`: the discovery url for your oidc provider, is usually something like `https://{your-idp-domain}/.well-known/openid-configuration`

## Self-host git repos

If your enterprise cannot accept external communication to github, we recommend vendoring the above repos into your own source control provider (most have a mechanism for doing this, or can always build a cron to do it as well which we're happy to help with).

The deployment-operator and scaffolds repos were both designed to be forked or vendored. Once you've decided upon a strategy for both, you can configure them as repositories in your console, then go to https://{your-plural-console}/cd/settings/repositories and chose to rewire the relevant repos as needed. You can also just directly modify the url and authorization information for the https://github.com/pluralsh/deployment-operator.git and other repos if you'd like too.

To reconfigure a self-managed repo for compatibilities and deprecations, you'll need to fork or vendor https://github.com/pluralsh/console then configure the `GITHUB_RAW_URL` env var to point to the new location. The current default is https://raw.githubusercontent.com/pluralsh/console. This will then be appended w/ the branch + path (eg "${GITHUB_RAW_URL}/master/static/compatibilities) to fetch the relevant data for both uis.

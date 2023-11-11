---
title: Plural CD Bring-your-own-Kubernes
description: Bootstrap Plural CD on an existing cluster
---

## Overview

For users that just want to use our CD capabilities and full control of their kubernetes setup, you can install a simplified version of Plural CD onto an existing kubernetes cluster. We've made this a turnkey process, but there are some prerequisites, namely:

- You'll need to create a postgres db for state storage, and have a jdbc connection string for it ready of the form: `postgres://<user>:<password>@<host>:5432/<db>`
- You'll need to have your network setup in place so that all clusters you want to deploy to can make outbound network connections to the ingress you configure for plural CD.

## Bootstrapping

Make sure your kubeconfig is pointing to the management cluster you want to deploy to, then run the following:

```sh
plural login
plural cd control-plane
```

This will do a few things:

- ask you for basic configuration like fqdns for your CD install and also the postgres jdbc url
- set up a oidc provider for your cluster to provide secure user login
- print a full helm values file that will be used to install your instance.

You'll then want to run the helm command we provide to you, you have the option to inspect the values we've generated first, and also you can add some last mile configuration here. This can be things like flipping out the ingress class or cert manager issuer (we use `nginx` by default and an issuer of `letsencrypt-prod`).

Then run the helm command generated, which ought to be something along the lines of:

```sh
helm upgrade --install --create-namespace -f values.secret.yaml --repo https://pluralsh.github.io/console console console -n plrl-console
```

We also strongly recommend you find a secure place to store the generated `values.secret.yaml` file in case you want to manually manage future console updates. You can use tooling like `git-crypt` or `kops` to secure this in git, or save it in a secret manager.

## Configure Console Upgrades

The Plural Console has the capability of self-managing its own upgrades in BYOK mode. This can be configured in the global settings page for deployments.

You can also self-manage the chart to control your own upgrade cadence. We recommend you use our self-management though to simplify this process and ensure your constantly up-to-date.

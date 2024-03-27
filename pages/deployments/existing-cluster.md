---
title: Plural CD Bring-your-own-Kubernetes-cluster
description: Bootstrap Plural CD on an existing cluster
---

## Overview

For users that just want to use our CD capabilities and full control of their kubernetes setup, you can install a simplified version of Plural CD onto an existing kubernetes cluster. We've made this a turnkey process, but there are some prerequisites, namely:

- You'll need to create a postgres db for state storage, and have a jdbc connection string for it ready of the form: `postgres://<user>:<password>@<host>:5432/<db>`
- You'll need to have your network setup in place so that all clusters you want to deploy to can make outbound network connections to the ingress you configure for plural CD, in general this means setting up:

* ingress-nginx - the ingress controller we've configured by default in the chart
* cert-manager - the chart assumes cert-manager handles cert generation by default but this can be disabled as well if you use a load balancer bound cloud cert manager
* externaldns - to bind dns entries to the hosts defined in the console's ingress

You are free to customize these at your own risk, usually it's not that challenging. The most likely potential gotcha is ensuring the connection stickiness configuration handles a migration to a different ingress controller from ingress-nginx.

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

The Plural Console has the capability of self-managing its own upgrades in BYOK mode. This can be configured in the global settings page for deployments under `/cd/settings/auto-upgrade`. It will ask you to copy in the values file then if it all looks correct, will create a service against our upstream helm chart with those values as overrides. The ui should look something like this:

![](/assets/deployments/auto-upgrade.png)

You can then go to the service it creates at any time to tweak the values as you might need.

You can also self-manage the chart to control your own upgrade cadence. We recommend you use our self-management though to simplify this process and ensure you are constantly up-to-date.

## Manage Console Via CRD

You can also define a CRD to manage your console's upgrade lifecycle at your own pace. This is a two step process:

1. Create a secret with your current values file, something like:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: console-values
  namespace: plrl-console
stringData:
  values.yaml: <your values file>
```

This should be done out of band of git as the values contain sensitive information

2. Create a helm service referencing it in a folder currently being synced via GitOps:

```yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: console
  namespace: infra # or whatever namespace you prefer
spec:
  interval: 5m0s
  url: https://pluralsh.github.io/console
---
apiVersion: deployments.plural.sh/v1alpha1
kind: Cluster
metadata:
  name: mgmt # you'd have likely defined this cluster CRD already, but provided here for completeness
  namespace: infra
spec:
  handle: mgmt
---
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: console
  namespace: infra
spec:
  namespace: plrl-console # this namespace must be correct
  name: console
  helm:
    version: 0.8.x #  can use floating versions with the .x syntax or pin to specific versions and automate w/ renovate
    chart: console
    valuesFrom:
      namespace: plrl-console
      name: console-values
    repository:
      namespace: infra
      name: console # referenced helm repository above
  clusterRef:
    kind: Cluster
    name: mgmt # must be set to your management cluster
    namespace: infra
```

You can then add additional values configuration using the `values` field of a helm service, or convert it to a multi-source service and source values files directly from git.

---
title: Quickstart with the Plural CLI
description: Deploying your services using the Plural CLI.
---

## Overview

This guide goes over how to deploy your services with the Plural CLI. At the end of this tutorial, you will have:

- Provisioned new clusters, and/or deployed the Plural Deployment Operator on your existing clusters.
- Imported the Git repositories containing your code and manifests.
- Deployed your code onto your clusters of choice.
- Optionally updated any configurations and permissions for the clusters and services.

## Install the Plural CLI

The Plural cli is available on homebrew, a single line install can be done with:

```sh
brew install pluralsh/plural/plural
```

If you are using a machine that is not compatible with homebrew, we recommend simply downloading a pre-built release on github and installing it onto your machines path. The releases can be found here: https://github.com/pluralsh/plural-cli/releases.

## Onboard to Plural and install the Plural Console

If you haven't already, you'll need to follow the Plural guide to install Console. There are two recommended ways to do this:

- {% doclink to="getting_started_first_steps_existing_cluster" %}Bring Your Own Cluster{% /doclink %} - you've created a kubernetes cluster your way with all the main prequisites. You can use helm to install the management plane and then use the Console to manage itself from there.
- `plural up` - a single command to create a new management cluster on the major clouds, wire up a basic GitOps setup and get you started.

Both are pretty flexible, and even if you chose to use the BYOK method, we recommend looking into some of our example `plural up` repos to get some ideas on how to use our CRDs and terraform provider with all the other tools they'll commonly touch. You can see an example `plural up` repository [here](https://github.com/pluralsh/plural-up-demo).

## Use `plural up` to create your first management console

First you'll want to follow our guide {% doclink to="getting_started_first_steps_cli_quickstart" %}here{% /doclink %} to install our CLI. Once you've done this, you'll simply run:

```sh
plural up # optionally add --service-account <email> if you want to use a service account to group manage this console
```

{% callout severity="warn" %}
`plural up` is best run in an empty repo. That will let it oauth to github/gitlab and create the repository for you, alongside registering pull deploy keys to register it in your new console.
{% /callout %}

This will do a few things:

- create a new repo to house your IaC and yaml manifests
- execute terraform to create the new cluster
- execute another terraform stack to provision the GitOps setup for the Plural Console and any other services you'd like to deploy from that repo

We've also generated a README that should give an overview of how the repo can be used for things like:

- creating and registering new workload clusters with terraform
- adding new services in the main infra repo
- handling updates to the cluster terraform at your own pace

## Set Up the `plural cd` CLI

If you'd like to configure the plural cli to communicate with your new Console instance, the configuration process is pretty simple, you'll need to set your Console URL and Console token. Set them with:

```
PLURAL_CONSOLE_URL
PLURAL_CONSOLE_TOKEN
```

or alternatively you can run `plural cd login` to set them to a config file within `~/.plural`

{% callout severity="info" %}
`plural cd` is an alias for `plural deployments`, and can be used interchangeably within the CLI.
{% /callout %}

## List Clusters, Services, Repositories

The following commands can help you list a lot of the clusters, services, etc that have already been registered:

```sh
plural cd clusters list
plural cd services list @{cluster-handle}
plural cd repositories list
```

## Import Git Repositories and Deploy services

You'll need to then import the Git repository containing your service and the associated Kubernetes manifests. To do so, use `plural cd repositories create`:

```sh
plural cd repositories create --url <REPO_URL>
```

Optionally add flags for Github authorization if necessary.

To then deploy your service, find the repo ID for the service you want to deploy using `plural cd repositories list`.

You can then use the `plural cd services create` command:

```sh
plural cd services create --name <SERVICE_NAME> --namespace <SERVICE_NAMESPACE> --repo-id <REPO_ID> --git-ref <GIT_REF> --git-folder <GIT_FOLDER> CLUSTER_ID

```

See deployed services with the `plural cd services list` command. Your service should populate initially as `Stale` until your components are Ready, at which point they will flip to `Healthy`.

Congratulations! You've deployed your first service with Plural.

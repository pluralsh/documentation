---
title: Plural CD CLI Quickstart
description: Deploying your services using the Plural CLI.
---

## Overview

This guide goes over how to deploy your services with the Plural CLI. At the end of this tutorial, you will have:

- Provisioned new clusters, and/or deployed the Plural Deployment Operator on your existing clusters.
- Imported the Git repositories containing your code and manifests.
- Deployed your code onto your clusters of choice.
- Optionally updated any configurations and permissions for the clusters and services.

## Onboard to Plural and install the Plural Console

If you haven't already, you'll need to follow the Plural guide to install Console. You can use the guide for the [in-browser Cloud Shell](/getting-started/cloud-shell-quickstart) or the [CLI](/getting-started/quickstart) to get started.

{% callout severity="info" %}
`plural cd` is an alias for `plural deployments`, and can be used interchangeably within the CLI.
{% /callout %}

## Set Environment Variables

If you haven't already, you'll need to set your Console URL and Console token. Set them with:

```
PLURAL_CONSOLE_URL
PLURAL_CONSOLE_TOKEN
```

## Create Clusters

To deploy additional clusters, use the `plural cd clusters create` command. As an example:

```
plural cd clusters create --handle <CLUSTER_HANDLE> --version <K8s_VERSION> CLUSTER_NAME
```

To import an existing cluster, see the guide for [existing clusters](/deployments/existing-cluster).

## Import Git Repositories and Deploy services

You'll need to then import the Git repository containing your service and the associated Kubernetes manifests. To do so, use `plural cd repositories create`:

```
plural cd repositories create --url <REPO_URL>
```

Optionally add flags for Github authorization if necessary.

To then deploy your service, find the repo ID for the service you want to deploy using `plural cd repositories list`.

You can then use the `plural cd services create` command:

```
plural cd services create --name <SERVICE_NAME> --namespace <SERVICE_NAMESPACE> --repo-id <REPO_ID> --git-ref <GIT_REF> --git-folder <GIT_FOLDER> CLUSTER_ID

```

See deployed services with the `plural cd services list` command. Your service should populate initially as `Stale` until your components are Ready, at which point they will flip to `Healthy`.

Congratulations! You've deployed your first service with Plural.

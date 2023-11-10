---
title: Import Git Repositories
description: How to import a repo containing your service and manifests
---

## Structure

To deploy your service with Plural, configure your repository with a folder containing your Kubernetes manifests that indicates how your service should be deployed. As an example, you can check out the charts folder of the [Plural Deployment Operator](https://github.com/pluralsh/deployment-operator/tree/main/charts/deployment-operator).

## Import from the Browser

To deploy a service, Plural needs to pull the Git repository containing your Kubernetes manifests. Navigate to the "Git repositories" subtab and click the "Import Git" button in the top right corner.

Connect your repo by adding the URL. Plural supports both SSH and basic auth. If your manifests are located in private repo, add your credentials via upload or manual entry.

Plural will then attempt to connect to the repository. If successful, the status will update to `Pullable`, and you can then deploy your service from the "Services" subtab.

To update the repository URL, use the `Update` button inline with the repository row.

## Import from the CLI

To import a repo via the CLI, use the `plural cd repositories create` command. Provide the URL and any authentication required. As an example:

```
plural cd repositories create --url https://github.com/helm/examples.git
```

You should then see your repository show up when calling `plural cd repositories list`.

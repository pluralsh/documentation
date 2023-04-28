---
title: Security Concepts
description: Learn about what Plural has access to at various steps of deployment.
---

## What access does Plural have to my Cloud account?

There are 2 methods to deploy via Plural. The access that we have to your cloud account is discussed per each method below.

### When using the Plural CLI

Plural **does not** have access to any cloud environments when deployed through the CLI. We generate deployment manifests in the Plural Git repository and then use your locally configured cloud provider's CLI on your behalf. We cannot perform anything outside of deploying and managing the manifests that are created in your Plural Git repository.

### When using the Plural Cloud Shell

Plural **does** have access to your cloud credentials when deployed through the Cloud Shell. In order to streamline the Cloud Shell experience, we securely store ecrypted cloud credentials to create resources on your behalf. You can eject from the Cloud Shell to the CLI at any time to save your configuration and revoke our access. This is done with the following steps:

1. [Install the Plural CLI](/getting-started/quickstart).
2. Run `plural shell sync` on your local machine.
3. Run `plural shell purge` in the Cloud Shell to destroy it.

## What permissions does the Plural Console have?

Our console has elevated permissions when running in your Plural Kubernetes cluster, but it runs in its own environment to alleviate security concerns. Its permissions are required in order to listen for new versions of packages to apply automated updates to your applications.

## What permissions does Plural have to GitHub?

Plural **does not** have access to repositories that have not been created by Plural.

When using the CLI or Cloud Shell, Plural will receive the following permissions:

- Create GitHub repositories on your behalf
- Commit changes to repositories that Plural has created

## Where is application configuration stored, including credentials?

Configuration is stored in your Git repo. Credentials are stored encrypted in configuration.

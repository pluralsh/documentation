---
title: Security Concepts
description: Learn about what Plural has access to at various steps of deployment.
---

## Cloud Access

### Plural CLI

Plural **does not** have access to any cloud environments when deployed through the CLI. We generate deployment manifests in the Plural Git repository and then use your configured cloud provider's CLI on your behalf. We cannot perform anything outside of deploying and managing the manifests that are created in your Plural Git repository.

### Plural Cloud Shell

Plural **does** have access to your cloud credentials when deployed through the Cloud Shell. In order to streamline the Cloud Shell experience, we securely store cloud credentials to create resources on your behalf. You can eject from the Cloud Shell to the CLI at any time to save your configuration and revoke our access. This is done with the following steps:

1. [Install the Plural CLI](/getting-started/quickstart).
2. Run `plural shell sync` on your local machine.
3. Run `plural shell purge` in the Cloud Shell to destroy it.

## Plural Console

Our console has elevated permissions when running in your Plural Kubernetes cluster, but it runs in its own environment to alleviate security concerns. Its permissions are required in order to listen for new versions of packages to apply automated updates to your applications.

## GitHub

When using the CLI or Cloud Shell, Plural will receive the following permissions:

- Create GitHub repositories on your behalf
- Commit changes to repositories that Plural has created

Plural **does not** have access to repositories that have not been created by Plural.&#x20;

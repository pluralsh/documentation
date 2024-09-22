---
title: Security Concepts
description: Learn about what Plural has access to at various steps of deployment.
---

# Plural Console

The Plural Console by default has access to nothing in your cloud.  To grant it access you'll have to do one of the following:

* manually configure a SCM connection to connect to your Source Control Provider (eg Github)
* manually bind a workload identity role to the service account used by a Plural console-related pod (eg for stack runners)

In addition, the Console only will make two outbound network requests, outside of those used to run terraform or pull from Git:

* A request to validate your instances license.  This can be replaced with a cryptographic license key, and thus disabled.
* A request to compile our deprecation tables using our upstream dataset.  This can also be replaced by an airgapped version with the tables baked into our binary.  The tradeoff will be staleness.

# Plural Cloud

A Plural Console running in Plural Cloud can collect creds in a few ways:

1. Plural-managed terraform state could have various credentials inside it
2. SCM credentials are stored row-encrypted in our database (but can be revoked at any time).
3. Service secrets are stored row-encrypted in our database (but you can use cloud-native secret managers if you prefer robustness over convenience).

Since you'll still need to create a small management cluster to attach to your cloud console, that will be what is bound any cloud creds for executing terraform, etc, and so you do not need to exchange any cloud credentials with Plural to use Plural Cloud.

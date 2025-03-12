---
title: Host Your Plural Console with Plural Cloud
description: Let us manage your Plural instance, and connect it to Kubernetes clusters running in your Cloud
---

## Overview

Plural Cloud provides a hybrid deployment model where we take over management of the Plural control plane, including its DB, high availability and other operational requirements, and you register clusters in your cloud to be remotely operated.  The Plural cloud instance works the same as any other Plural instance, described in our [Architecture overview](/overview/architecture).  Plural cloud also supports two main tenancy modes:

* Shared - your cloud instance is hosted on a set of shared k8s clusters and shared postgres servers for minimal cost
* Dedicated - your cloud instance gets a dedicated k8s cluster and database, allowing maximal scalability and isolating your data fully from other tenants

One key differentiated aspect of the hybrid Plural architecture is we can manage infrastructure *in your cloud* without requiring us to *store your keys on our servers*.  This is due to the fact that the Plural control plane stores all declarative state of what needs to be deployed, but the actual action is performed by our agent that runs in either the management cluster or the leaf clusters you'll create at the end of the onboarding process.  Those clusters are usually wired with best practice cloud IAM solutions like EKS IRSA or GKE Workload Identity.

# Setup

The Cloud setup flow is relatively straightforward, go to `https://app.plural.sh/create-cluster` and fill out a wizard that looks like:

![](/assets/getting-started/cloud-start.png)

Once you select Plural Cloud, you'll see a wizard like the below:

![](/assets/getting-started/cloud-wizard.png)


After filling out the wizard, it'll take about 2-3 minutes to instantiate your cluster, from there, you'll need to perform two more steps, both of which will be explained in a modal in your new cloud instance:

* create an access token for the Plural CLI to use
* run `plural up --cloud`


## The "plural up --cloud" command

The `plural up --cloud` command will handle a few things:

* Setting up an initial GitOps repo with our default, production ready configurations.  This includes a ton of useful stuff, including:
    - initializes a service-of-services structure to set up full GitOps management
    - initializes the Plural Service Catalog, with quick deployments and configuration of a lot of useful tools, like a dev + prod eks fleet, elasticsearch for logging, scale out prometheus with victoria metrics, and Grafana backed by RDS
    - is the assumed repo structure for the [How to Use Plural Guide](/getting-started/how-to-use)
* Setting up a minimal management EKS Cluster.  This is there primarily so Plural Cloud can operate without requiring you to send us any cloud credentials to our servers.


The terraform and scripting should be entirely self-contained, and should take about 15 or so minutes to run to completion (can be longer for AWS).  It's also worth noting that the cloud and region for `plural up --cloud` can be different than the one used for your Plural instance, your infrastructure is entirely self contained.

## Next Steps

We strongly recommend your check out our [How To Guide](/getting-started/how-to-use) once your Console is set up, as it'll get you acquainted with a ton of the features of Plural.
---
title: Create Workload Clusters
description: Spawn New Clusters with Cluster API
---

## Overview

Plural supports both a Bring-Your-Own-Kubernetes model of cluster creation, and the ability to do full provisioning and lifecycle management of Kubernetes with Cluster API. If you'd rather define your clusters yourself using tools like terraform or Pulumi, feel free to check out the docs [here](deployments/import-cluster).

There are two tiers of cluster within Plural CD:

- Management Cluster - where the Plural control plane resides and also where CAPI controllers will reside. You are free to use this to host other services if you like, but security/reliability best-practices would suggest you at least segregate it from production systems
- Workload Cluster - where main production/staging services are hosted

Seperating workloads at the kubernetes cluster level has the benefit of minimizing the risk of bad kubernetes upgrades and allowing seperate teams/organizations to manage their resources without compromising others. That said if you don't have a strong handle on managing kubernetes at-scale, the operational overhead at the kubernetes level will make that model costly. Hopefully we can help minimize that.

## Create In-Browser

You can create a new cluster entirely in-browser by first clicking the `Create Cluster` button and filling out the form we provider, it should look something like:

![](/assets/deployments/create-cluster.png)

Clusters have both names and unique, human readable handles, the name is not guaranteed unique, since cloud providers don't enforce that across project/account/subscriptions. The handle is optional and will default to the name unless otherwise provided.

Generally there will be some basic cloud-specific cluster metadata, and then you can also configure the general structure of your node topology as well, the main concerns there being:

- node type
- min/max size
- whether to use spot nodes
- labels/taints to use for workload targeting criteria

## Configure Deletion Protection

If you click on a cluster and go to its properties page, you should be able to add delete protection to a cluster, which must be manually disabled before any cluster delete calls can succeed

## Create Using Terraform

Coming Soon!

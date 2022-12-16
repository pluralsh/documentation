---
title: Cluster Configuration
description: DevOps workflows that involve editing your cluster Terraform.
---

Plural offers a set of sane defaults to spin up a one-size-fits-all Kubernetes cluster, but there will be cases
where you'll want to edit the default cluster configuration to better fit your organization's needs. This will
involve editing the Terraform that we generate for you, which carries risks if administered incorrectly.

## Operations on node groups

### Modifying node types

Modifying node types allows you to optimize the infrastructure backing your applications for cost and/or performance. 

To do this, [TODO: Michael write here]

### Single-AZ vs. Multi-AZ node groups

To handle potential conflicts with our autoscaler, we by defualt split node groups per availability zone.
To change this, [TODO: Michael write here]

## Adding users/roles [AWS]

Because of the limitations set by AWS' IAM authenticator, you'll need to follow this process to add new users or roles to a cluster
running in AWS. [TODO: Michael write here]

## Creating private control plane endpoints

In order to set up application interfaces to live on private endpoints, you first need to configure a VPN (Available with Plural Professional). 
[TODO: Michael write here]
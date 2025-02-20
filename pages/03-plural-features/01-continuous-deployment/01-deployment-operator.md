---
title: The deployment operator
description: GitOps Management using the Plural Operator
---

The Plural operator defines a set of CRDs that allow you to manage your deployments in a fully GitOps manner. The controller ultimately communicates with our core apis and acts effectively as a frontend to automate provisioning/deprovisioning the requisite resources. The CRD structures also imitate the patterns used by Flux and is interoperable with many Flux types (particularly those from its source controller), with modular distinct types for the various roles in deployments, e.g. git/helm repositories, clusters, and services.

In general, Plural tries to be fully GitOps compliant, meaning virtually any write operation in the system can be realized via a CRD defined by our operator.  That ensures you always have full auditability and reproducibility for all changes executed in your kubernetes infrastructure.

## Full API Spec

The full api spec can be found by looking through the go types {% doclink to="operator-api" %}here{% /doclink %}.  You can also look at the code [here](https://github.com/pluralsh/console/tree/master/go/controller/api/v1alpha1).

## Read-Only vs Write resources

The operator also handles the complexity of resources defined via other tools. For instance, clusters will commonly actually be defined and provisioned in terraform, so write access should be done by that IaC tool. The operator will detect the resource was created elsewhere, and go into read-only mode, just generating the appropriate status fields to compose with other resources like services.

## Full Working Example

The `plural up` command is the simplest way to generate a full repository from the ground up, this will include all the terraform to create the management cluster, alongside workload clusters, a `README.md` documenting the given repo structure, and a basic app-of-apps setting up all the underlying services to get going. We also have a public tutorial example of this repo for people who'd rather just peruse available at [our demo repo](https://github.com/pluralsh/plural-up-demo).

This can be considered a reference architecture, but users have freedom to chose their own repository layouts or multi-vs-mono repo organizational structures however their needs might see fit.

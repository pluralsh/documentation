---
title: Introduction
description: >-
  Plural is your single pane of glass for Enterprise-Grade Kubernetes Fleet Management
---

# What is Plural?

Plural is a unified cloud orchestrator for the management of Kubernetes at scale.  In particular, the fleet management problem as we understand it is decomposed into providing a consistent workflow for 4 main concerns:

1. Kubernetes Continuous Deployment - you need a GitOps-based, drift-detecting mechanism to sync kubernetes yaml manifests, written in helm, kustomize, raw yaml, etc, into target kubernetes clusters.  It should also be orchestrable via API to support a scalable workflow to any fleet size.
2. Kubernetes Dashboarding - A secure, SSO-integrated Kubernetes dashboard layer for ad-hoc troubleshooting.  GitOps should handle anything on a write-path, but you still need a strong read-path that's not burdened with friction.
3. Infrastructure-As-Code Management - implemented via [Stacks](/stacks/overview), this provides a k8s-native, API-driven mechanism to scalably manage the terraform complexity that immediately arises when using kubernetes in earnest.
4. Self-Service Code Generation - the glue that ties everything together, a repeatable PR Automation API that allows you to self-serviceably generate the manifests for any workflow in 1-3 with a simple UI wizard.  Think of it like Backstage for Kubernetes.

In addition, we support a robust, enterprise-ready [Architecture](/deployments/architecture). This uses a separation of management cluster and an agent w/in each workload cluster to achieve scalability and enhanced security to compensate for the risks caused by introducing a Single-Pane-of-Glass to Kubernetes.  The agent can only communicate to the management cluster via egress networking, and executes all write operations with local credentials, removing the need for the management cluster to be a repository of global credentials.  If you want to learn more about the nuts-and-bolts feel free to visit our [Architecture Page](/deployments/architecture).

## Plural Open Source Marketplace

We also maintain a catalog of open source applications like Airbyte, Airflow, etc. that can be deployed to kubernetes on most major clouds.  We're in progress to merging that experience with our modernized Fleet Management platform, but if you're interested in any of them, we're happy to support them in the context of a commercial plan.


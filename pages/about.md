---
title: About Plural
description: Learn about Plural, the enterprise Kubernetes fleet management platform.
---

# About Plural

Plural is a unified cloud orchestrator for the management of Kubernetes at scale. Built for enterprise teams, Plural provides a single pane of glass for Kubernetes fleet management, enabling organizations to deploy, manage, and scale their Kubernetes infrastructure with confidence.

## Our Mission

Plural's mission is to simplify the complexity of Kubernetes management at enterprise scale. We believe that teams should spend their time building great products, not wrestling with infrastructure. Our platform automates the mindless gruntwork that comes with infrastructure management, from troubleshooting well-known bugs to fixing YAML typos.

## What We Do

Plural addresses the fleet management problem by providing a consistent workflow for four main concerns:

### Continuous Deployment
A GitOps-based, drift-detecting mechanism to sync Kubernetes YAML manifests (written in Helm, Kustomize, raw YAML, etc.) into target Kubernetes clusters. It's fully orchestrable via API to support scalable workflows for any fleet size.

### Kubernetes Dashboarding
A secure, SSO-integrated Kubernetes dashboard layer for ad-hoc troubleshooting. While GitOps handles the write-path, you still need a strong read-path that's not burdened with friction.

### Infrastructure-as-Code Management
Implemented via Stacks, this provides a Kubernetes-native, API-driven mechanism to scalably manage the Terraform complexity that immediately arises when using Kubernetes in earnest.

### Self-Service Code Generation
The glue that ties everything together: a repeatable PR Automation API that allows you to self-serviceably generate manifests for any workflow with a simple UI wizard.

## Enterprise-Ready Architecture

Plural uses a separation of management cluster and an agent within each workload cluster to achieve scalability and enhanced security. The agent can only communicate to the management cluster via egress networking and executes all write operations with local credentials, removing the need for the management cluster to be a repository of global credentials.

## AI-Powered Operations

Plural integrates with LLMs to enable complex automation within the realm of GitOps that ordinary deterministic methods struggle to get right. This includes:

- Running root cause analysis on failing Kubernetes services
- Auto-generating fix PRs by introspecting Plural's own GitOps and IaC engines
- Generating PRs for scaling recommendations from cost management integrations
- Explaining complex Kubernetes objects to reduce platform engineering support burden

## Open Source Foundation

Plural is part of the **Cloud Native Computing Foundation** and the **Cloud Native Landscape**. We maintain the following certifications:

- **GDPR**
- **SOC 2 Type 2**

## Learn More

- {% doclink to="overview_introduction" %}Introduction{% /doclink %} - Deep dive into Plural's capabilities
- {% doclink to="overview_architecture" %}Architecture{% /doclink %} - Explore the underlying architecture
- {% doclink to="getting_started_first_steps" %}Getting Started{% /doclink %} - Start using Plural today
- {% doclink to="faq_security" %}Security{% /doclink %} - Learn about our security practices

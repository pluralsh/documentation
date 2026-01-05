---
title: Runtime
description: Plural Runtime is an omnibus Helm chart that simplifies setting up essential network infrastructure for Kubernetes clusters.
---

Plural Runtime is a consolidated Helm chart that bundles the essential network infrastructure components needed for web-facing Kubernetes applications. Rather than managing multiple Helm releases for ingress, DNS, and TLS certificates separately, Runtime provides a unified, production-ready package with sensible defaults.

## Why Runtime?

Setting up a production-ready Kubernetes cluster typically requires configuring several interconnected components:

- **Ingress controllers** for load balancing HTTP traffic
- **DNS automation** to register hostnames automatically
- **Certificate management** to handle TLS certificates
- **Cloud-specific integrations** like AWS Load Balancer Controller

Runtime simplifies this by providing a single chart that:

- Installs and configures all components in one operation
- Uses production-ready defaults optimized for reliability
- Supports modular enable/disable for each component
- Works seamlessly with Plural's fleet management capabilities

## Core Components

Runtime includes the following components, each of which can be independently enabled or disabled:

### Ingress NGINX

Provides an `nginx` ingress class configured with:

- AWS NLB support for better websocket handling and cost efficiency
- Extended timeouts for long-running connections (3600s)
- Horizontal pod autoscaling (2-11 replicas) based on memory utilization
- Topology spread constraints for high availability across zones
- Structured JSON logging for observability

### Private Ingress NGINX

An additional ingress controller operating on internal networks, providing an `internal-nginx` ingress class. This is useful for services that should only be accessible within your VPC or private network.

### Cert Manager

Handles automated TLS certificate issuance with:

- Default `plural` ClusterIssuer for onplural.sh domains
- Let's Encrypt integration for ACME certificate provisioning
- Support for both HTTP-01 and DNS-01 challenge types

### External DNS

A daemon that automatically manages DNS records by:

- Watching for Ingress and Service resources
- Creating and updating DNS records in supported providers
- Pre-configured for Plural's onplural.sh domain management
- Safe to run multiple instances for different domains

### Flux Source Controller (Optional)

Provides GitOps capabilities for sourcing Kubernetes manifests from Git repositories.

## When to Use Runtime

Runtime is the recommended approach when you want to:

- **Quickly bootstrap new clusters** with a complete network stack
- **Maintain consistency** across your cluster fleet with standardized configurations
- **Reduce operational overhead** by managing fewer Helm releases
- **Leverage Plural's defaults** that are battle-tested in production environments

For organizations with specific requirements or existing tooling, the individual components (ingress-nginx, cert-manager, external-dns) can also be deployed independently using {% doclink to="plural_features_continuous_deployment_global_service" %}Global Services{% /doclink %}.

## Next Steps

- {% doclink to="plural_features_runtime_getting_started" %}Getting started with Runtime{% /doclink %} - Learn how to deploy and configure Runtime on your clusters
- {% doclink to="getting_started_how_to_use_controllers" %}Set up ingress on a cluster{% /doclink %} - Alternative approach using individual global services

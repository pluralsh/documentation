---
title: Continuous deployment
description: 'Learn how to deploy applications using Helm charts, Kustomize, and Git-based Kubernetes resources with advanced orchestration capabilities'
---

## Overview

This section provides practical examples of using Plural's Continuous Deployment feature to easily install and manage
applications in your Kubernetes clusters. Plural is a comprehensive platform that simplifies infrastructure management for
DevOps teams and developers.

These examples demonstrate how Plural can help you:

- **Deploy Applications Flexibly**: Use Helm charts with either inline values for simplicity or external values files for better organization of complex configurations
- **Provision Infrastructure**: Create and manage your entire infrastructure stack including Kubernetes clusters, databases, and cloud resources using Infrastructure Stacks powered by Terraform and Ansible
- **Enhance Kubernetes Deployments**: Apply Liquid templating to customize Helm values and raw Kubernetes manifests
- **Build Connected Services**: Create services with proper dependencies and orchestration between components
- **Implement GitOps Workflows**: Manage multi-environment deployments (like dev → staging → production) with clear separation and controlled promotion between environments
- **Automate Updates**: Leverage pipeline observers to automatically generate pull requests when new versions of your applications are available

Plural brings these capabilities together in a unified platform that combines the best practices of GitOps with powerful deployment tools that work across any infrastructure. The examples in this section will guide you through practical implementations that you can adapt to your own projects.

All files used in the provided examples can be found in our
[scaffolds](https://github.com/pluralsh/scaffolds/tree/main/examples) repository.
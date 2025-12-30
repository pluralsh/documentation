---
title: Pipelines
description: Automate the journey of code from development to production
---

Plural Pipelines automate Service Deployments across environments by promoting git-based changes through defined stages.
With support for approval and job gates, they offer safe, customizable delivery flows.

## Pipeline CRD in a Continuous Deployment Context

The Pipeline CRD defines a custom Kubernetes resource to model and automate complex, multi-stage deployment pipelines.
It integrates well with continuous deployment (CD) systems by enabling declarative configuration of deployment flows,
including gating, promotions, and service progression.

### The top-level resource that encapsulates the deployment workflow.
 - Stages represent discrete steps in your deployment pipeline.
 - Edges define the dependencies and ordering between stages.
 - FlowRef & ProjectRef provide contextual linkage to a broader application ecosystem.
 - Bindings can control RBAC policies for reading/writing pipeline data.

#### PipelineStage and PipelineStageService
Each stage is a logical unit within the pipeline. These can represent environments (e.g., dev, staging, prod) or specific deployment phases.
 - PipelineStageService includes:
    - ServiceRef: the Deployment Service being deployed.
    - Criteria: optional promotion rules that dictate when and how a service is allowed to advance.

This design fits CD by enabling conditional promotions, a critical part of automating production pushes safely.

#### PipelineEdge – Controlling Flow
Edges define the flow of execution between stages. You can specify edges by name or ID and attach promotion Gates.

#### PipelineGate – Promotion Control
Gates serve as checkpoints between pipeline stages and enforce promotion policies.
Three supported gate types:
 - APPROVAL: requires human sign-off (e.g., manager approval).
 - WINDOW: defines time-based constraints (e.g., deploy only during business hours).
 - JOB: runs a custom job (e.g., integration tests, security scans) before allowing promotion.

#### JobSpec and GateSpec – Custom Execution
For Job gates, the CRD allows inline definition of Kubernetes Jobs to be executed:
 - Specify namespace, containers, and Kubernetes-native configurations like annotations, labels, and serviceAccount.
 - Use Raw if you prefer to define jobs using full Kubernetes manifests.
 - Resource configurations help manage cluster efficiency and enforce compute limits.

## Setup
You're defining a simple two-stage continuous deployment pipeline using Plural’s Kubernetes-native CRDs.
 1. dev stage – deployed to a cluster named dev
 2. prod stage – promoted after passing a job and approval gate

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: guestbook-dev
  namespace: infra
spec:
  cluster: dev
  git:
    folder: guestbook
    ref: master
    url: git@github.com:pluralsh/guestbook.git # replace with valid git repo
---
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: guestbook-prod
  namespace: infra
spec:
  cluster: prod
  git:
    folder: guestbook
    ref: master
    url: git@github.com:pluralsh/guestbook.git # replace with valid git repo
```
### Pipeline CRD

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: Pipeline
metadata:
  name: test
  namespace: infra
spec:
  stages:
    - name: dev
      services:
        - serviceRef:
            name: guestbook-dev
            namespace: infra
    - name: prod
      services:
        - serviceRef:
            name: guestbook-prod
            namespace: infra
          criteria:
            serviceRef:
              name: guestbook-dev
              namespace: infra
            secrets:
              - test-secret
  edges:
    - from: dev
      to: prod
      gates:
        - name: sentinel
          type: SENTINEL # organize integration testing with a sentinel
          sentinelRef:
            name: dev-sentinel
            namespace: infra
        - name: approval-gate
          type: APPROVAL
```
This edge controls the transition from dev → prod. It includes:

 1. Sentinel Gate: leverages a [Plural Sentinel](/plural-features/plural-ai/sentinels) to do deep integration testing for dev.
 2. Approval Gate: Requires manual approval before deploying to prod


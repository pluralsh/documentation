---
title: Agent configuration and usage
description: Configure agent runtimes and run agent tasks.
---

## Prerequisites

- A repository connected in Plural Console (agents can only select from configured repos).
- SCM connection configured outside the agent UI (for example, via SCM integration settings).

## Configure an AgentRuntime

Use `AgentRuntime` to define the provider, credentials, and runtime options.
For field-level details, see the [AgentRuntime API reference](/api-reference/kubernetes/agent-api-reference#agentruntime) and [AgentRuntimeSpec API reference](/api-reference/kubernetes/agent-api-reference#agentruntimespec).

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: AgentRuntime
metadata:
  name: claude-default
  namespace: plrl-agents
spec:
  targetNamespace: plrl-agents
  type: CLAUDE
  default: true
  aiProxy: true
  config:
    claude:
      apiKeySecretRef:
        name: ai-config
        key: anthropic
      model: claude-3-5-sonnet-latest
```

Supported runtime types are `CLAUDE`, `OPENCODE`, and `GEMINI`.

## Tune runtime resources

`AgentRuntime` accepts a pod template so you can set CPU/memory requests and limits for the agent container. Use the `default` container name to target the main agent container.

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: AgentRuntime
metadata:
  name: claude-default
  namespace: plrl-agents
spec:
  targetNamespace: plrl-agents
  type: CLAUDE
  template:
    spec:
      containers:
        - name: default
          resources:
            requests:
              cpu: "1"
              memory: 2Gi
            limits:
              cpu: "4"
              memory: 8Gi
```

If you enable a browser sidecar, use `spec.browser.container.resources` to tune the browser container resources.

## Add network policies for the runtime

Agent runs execute inside `spec.targetNamespace`, so apply NetworkPolicies in that namespace. Use an empty `podSelector` to apply the policy to all pods in the namespace.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: agent-runtime-egress
  namespace: plrl-agents
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: kube-system
      podSelector:
        matchLabels:
          k8s-app: kube-dns
    ports:
    - protocol: UDP
      port: 53
    - protocol: TCP
      port: 53
  - to:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: egress
      podSelector:
        matchLabels:
          app: egress-proxy
    ports:
    - protocol: TCP
      port: 3128

```

Replace the `ipBlock` entries with the CIDRs or egress proxy that your agents must reach (SCM, AI endpoints, package registries, etc.).

## Run an agent from the Console UI

Agent runs are created from the Console UI. Use the flow below to start a run and review results.

### Step 1: Open Agent runs

Navigate to `Plural AI` -> `Agent runs`.

![](/assets/ai/agent_runs.png)

### Step 2: Create a new run

In the main view fill in:

- **Prompt** describing the task.
- **Repository** selected from the list of recent repositories or provide a custom URL.
- **Mode** set to `WRITE` or `ANALYZE`.
- **Provider** matching the runtime type you configured.

### Step 3: Track progress

The agent works in the background and streams updates to the run timeline.

![](/assets/ai/agent_run_details_running.png)

### Step 4: Review results

- In `WRITE` mode, the agent applies changes and opens a pull request.
- In `ANALYSIS` mode, the agent produces a markdown summary visible in the Console.

![](/assets/ai/agent_run_details_done.png)

## Optional: Enable Docker-in-Docker

If your agent needs to build images or run containers, enable DinD in the runtime:

```yaml
spec:
  dind: true
```

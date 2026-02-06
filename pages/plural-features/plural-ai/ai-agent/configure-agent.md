---
title: Agent configuration and usage
description: Configure agent runtimes and run agent tasks.
---

## Prerequisites

- A repository connected in Plural Console (agents can only select from configured repos).
- SCM connection configured outside the agent UI (for example, via SCM integration settings).

## Configure an AgentRuntime

Use `AgentRuntime` to define the provider, credentials, and runtime options.

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: AgentRuntime
metadata:
  name: claude-default
  namespace: plrl-deploy-operator
spec:
  targetNamespace: plrl-deploy-operator
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

---
title: Setting up a workbench
description: End-to-end guide to creating, configuring, and running your first workbench
---

## Prerequisites

Before creating a workbench you need:

* A Plural project to scope the workbench to. If you have not created one yet, see [Projects and multi-tenancy](../projects-and-multi-tenancy/index.md).
* Any external tools (Datadog, Prometheus, GitHub, Slack, etc.) configured in **Workbenches → Integrations**. Tools can be added later, but it is easiest to have them ready before creating the workbench. See [Workbench tools](./tools).
* If you plan to enable the coding agent, an `AgentRuntime` resource deployed to your management cluster. See [Configure an AgentRuntime](../plural-ai/ai-agent/configure-agent.md).

---

## Creating a workbench

Navigate to **Workbenches** in the Plural Console sidebar and click **Create workbench**. The creation flow is a five-step wizard. You can jump between steps at any time; the **Create workbench** button on the final step activates once all required fields are valid.

![](/assets/workbenches/workbench-create-wizard.png)

---

## Step 1: Workbench setup

### Name and description

Choose a name that reflects the agent's role — for example, `platform-incidents`, `cost-analysis`, or `infra-self-service`. The name must be unique within your Plural instance and is used in job logs, webhook confirmations, and chatbot messages.

### System prompt

The system prompt sets the agent's standing context — its role, the scope of infrastructure it covers, and any behavioral guidelines that apply to every job. You do not need to write one from scratch. Plural's **skills** system (Step 2) provides pre-built and custom instruction documents that the agent reads before each job, and these can do most of the heavy lifting for common use cases like incident response, cost analysis, or self-service infrastructure.

A system prompt is most useful for short, workbench-specific framing — the name of your platform, which team the agent is acting on behalf of, and any hard constraints you always want enforced. The detailed operational guidance belongs in skills.

{% callout severity="info" %}
You can leave the system prompt blank entirely and rely on skills and per-job prompts. Automation scenarios (crons, webhooks) work better with at least a brief system prompt to orient the agent, but it does not need to be long.
{% /callout %}

### Infrastructure capabilities

Enable the data sources the agent needs. All access still respects your underlying RBAC — enabling a capability does not grant the agent permissions it does not already have.

| Capability | Enable when you need the agent to... |
|---|---|
| **Services** | Inspect Plural-managed service deployments, check rollout status, or read service configuration |
| **Stacks** | Inspect IaC stack runs, read Terraform state summaries, or diagnose stack failures |
| **Kubernetes** | List and describe any Kubernetes resource via the cluster API (Deployments, Pods, Events, etc.) |
| **Pod logs** | Stream raw container stdout/stderr from Kubernetes pods |
| **Vulnerabilities** | Read Trivy vulnerability findings auto-associated with Plural services |

### Observability capabilities

| Capability | Enable when you need the agent to... |
|---|---|
| **Metrics** | Query Prometheus, Datadog, or other configured metrics backends |
| **Log aggregation** | Search and aggregate logs from Loki, Elastic, or other configured log backends |

{% callout severity="info" %}
The **Observability** capabilities use the backends you set up under [Observability Integration](../observability/index.md). **Pod logs** is a separate, direct Kubernetes log stream — it works without any observability backend.
{% /callout %}

---

## Step 2: Skills configuration

Skills are instruction documents the agent reads before executing a job. Use them to embed runbooks, tribal knowledge, or tool-usage guidance that is too detailed or too specific to put in the system prompt.

### Plural skills

Plural ships a library of pre-built skills for common operations. Select any number from the **Plural skills** tab. They are maintained by Plural and cover standard SRE workflows out of the box.

### Git skills

For org-specific runbooks or custom skills, point to a Git repository:

* **Repository** — a Git repository already registered in Plural
* **Git ref** — the branch or tag to read from (e.g. `main`)
* **Git folder** — the directory within the repo that contains skill files (e.g. `workbenches/skills`)
* **Skill file names** — one per line, relative to the folder (e.g. `incident-runbook.md`, `cost-queries.md`)

Skill files are fetched from Git at job start, so they stay current as your runbooks evolve.

![](/assets/workbenches/workbench-skills-step.png)

---

## Step 3: Coding agent

This step configures optional code-reading and code-writing capabilities. Skip it (leave the runtime unset) if your workbench is purely operational and does not need to touch source code.

For detailed guidance on setting up and using the coding agent, see [Coding agent](./coding-agent.md).

---

## Step 4: Access policy

Control who can view and trigger jobs.

* **Read permissions** — users and groups that can see the workbench and its job history
* **Write permissions** — users and groups that can create jobs, edit configuration, and manage automation

Bindings use the same user and group model as the rest of Plural. If you leave both lists empty, access falls through to the parent project's policy.

---

## Step 5: Attach tools

Select from the globally configured tools to give the agent access to external systems. Only tools you have already created under **Workbenches → Integrations** appear here.

Attach only the tools this specific workbench needs. A tightly-scoped tool list is easier to audit and reduces the risk of the agent touching systems it should not.

![](/assets/workbenches/workbench-attach-tools-step.png)

---

## Running your first job

Once the workbench is created, open it from the **Workbenches** list and type a prompt into the input field at the top of the **Jobs** tab.

A few prompts to start with:

* `What is the current health of all services in this project?`
* `Are there any Kubernetes pods in a CrashLoopBackOff or Pending state?`
* `Summarize the last hour of error logs for the payments service.`

The agent will stream activities as it works and produce a structured conclusion when it finishes. From there you can:

* [Save the prompt](./running-jobs#saved-prompts) for the team to reuse
* [Set up a cron schedule](./automation#cron-schedules) to run it automatically
* [Add a webhook trigger](./automation#webhook-triggers) to fire it on alerts

---

## Editing a workbench

Open the **•••** overflow menu on any workbench and select **Edit** to reopen the five-step wizard prepopulated with current values. Changes take effect on the next job run.

## Deleting a workbench

From the overflow menu, select **Delete**. This permanently removes the workbench and all associated job history, schedules, webhooks, saved prompts, and eval settings.

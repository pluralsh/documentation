---
title: Workbenches
description: Configurable AI agent environments for automated infrastructure operations
---

## Overview

Workbenches are named, project-scoped environments for running AI-driven operations against your infrastructure. Each workbench bundles a system prompt, a set of capabilities, connected tools, and automation triggers into a reusable workspace that your team can run on-demand, on a schedule, or in response to incidents.

At runtime, a **workbench job** is created — the agent executes using the configured capabilities and tools, emitting a live stream of activities as it works. When finished it produces a structured conclusion that can include summaries, dashboards, follow-up todos, topology pointers, and opened pull requests.

Key things you can do with a workbench:

* Run an AI agent against your Plural-managed services, stacks, and Kubernetes clusters — respecting your existing RBAC
* Connect external tools like Datadog, Prometheus, Elasticsearch, Slack, GitHub, and custom HTTP APIs so the agent has full operational context
* Trigger jobs automatically from observability alerts, issue trackers, or cron schedules

## Core concepts

### Workbench

The parent configuration object. It defines the agent's identity (name, system prompt), the project it belongs to, the agent runtime to use, which capabilities are enabled, which tools are attached, and who has access.

### Workbench job

A single run of the agent against a prompt. Jobs are created manually in the UI, by a cron schedule, by a webhook trigger, or from a [Plural Flow](/plural-features/flows). Each job has a status (`pending`, `running`, `complete`, `failed`) and a streaming activity log you can follow in real time.

### Activities

Step-by-step records produced while a job runs — tool calls, subagent results, internal thoughts, and intermediate conclusions. Activities are surfaced in the job detail panel and also feed the workbench's AI memory so future runs can learn from past work.

### Tools

External integrations the agent can call during a job. Tools are managed globally under the **Tools** section and then attached to individual workbenches. See [Tools](/plural-features/workbenches/tools) for the full list of supported integrations.

### Skills

Instruction files that extend what the agent knows how to do. Skills can be loaded from a Git repository or defined inline in the workbench. They are included in the agent's context alongside the system prompt.

## How workbenches fit into Plural

Workbenches live under a **project**, inheriting and extending that project's RBAC. Within a project they complement the rest of the Plural surface:

| Integration | How it connects |
|---|---|
| [Flows](/plural-features/flows) | A flow can launch a workbench job directly from its UI or via `FlowWorkbenchJobLauncher`, scoping the job to that flow's services and pipelines |
| Alerts | Observability alerts can automatically trigger workbench jobs via [webhook triggers](/plural-features/workbenches/automation#webhook-triggers) |
| Issues | Issue tracker events can trigger workbench jobs the same way, and the job has access to the originating issue |
| Pull requests | Jobs that open PRs record them on the job |
| Agent runtime | The AI model and sandbox environment that executes each job; configured at the workbench level |

![](/assets/workbenches/workbenches-overview.png)

## Getting started

1. Navigate to **Workbenches** in the Plural Console sidebar.
2. Click **Create workbench** and step through the [creation wizard](/plural-features/workbenches/configuration).
3. (Optional) Set up shared [tools](/plural-features/workbenches/tools) your workbench can call.
4. Run your first job from the workbench's **Jobs** tab.

Once you have a job running, you can layer in [automation](/plural-features/workbenches/automation) to trigger jobs on a schedule or from incidents.

---
title: Workbench tools
description: Configure external integrations for your workbench agents to call
---

## Overview

Tools are reusable external integrations that workbench agents can call as part of a job. They are configured globally and then attached to individual workbenches, so the same Datadog connection or MCP server can be shared across multiple workbenches without re-entering credentials.

Navigate to **Workbenches → Integrations** to browse the available tool types, or **Workbenches → Configured tools** to manage the tools you have already set up.

![](/assets/workbenches/workbench-tools-list.png)

---

## Tool types

### Plural native integrations

These capabilities are built directly into the workbench runtime and require no external credentials or tool setup. They are enabled per-workbench via the capability toggles in [Step 1 of the creation wizard](./configuration#step-1-workbench-setup).

| Capability | What the agent can access |
|---|---|
| **Services** | Plural-managed service deployments — health status, rollout history, configuration, and associated cluster |
| **Stacks** | IaC stack runs, Terraform state summaries, run logs, and failure details for Plural-managed stacks |
| **Kubernetes** | Full Kubernetes API access across your managed clusters — list and describe any resource (Deployments, Pods, Events, ConfigMaps, etc.) |
| **Pod logs** | Raw container stdout/stderr streamed directly from Kubernetes pods |
| **Vulnerabilities** | Trivy vulnerability findings auto-associated with Plural-managed services |
| **Metrics** | Query your configured Prometheus-compatible metrics backends via Plural's observability integration |
| **Log aggregation** | Search and aggregate logs from your configured backends (Loki, Elastic, etc.) via Plural's observability integration |

All native integrations respect your existing RBAC — enabling a capability here does not grant the agent access it would not otherwise have.

### Observability

| Tool | What the agent can do |
|---|---|
| **Prometheus** | Query metrics from a Prometheus-compatible endpoint |
| **Datadog** | Query metrics and logs from the Datadog API |
| **Loki** | Query log streams from a Loki-compatible endpoint |
| **Elastic** | Query and search indices in an Elasticsearch cluster |
| **Tempo** | Query distributed traces from a Grafana Tempo endpoint |
| **Jaeger** | Query distributed traces from a Jaeger backend |

### Source control

| Tool | What the agent can do |
|---|---|
| **GitHub** | Read repositories, list PRs, and (in Write mode) open pull requests |
| **GitLab** | Same as GitHub for GitLab projects |
| **Bitbucket Cloud** | Same as GitHub for Bitbucket Cloud |
| **Bitbucket Data Center** | Same as GitHub for self-hosted Bitbucket Data Center |

### Messaging

| Tool | What the agent can do |
|---|---|
| **Slack** | Post messages and read channel history |
| **Microsoft Teams** | Post messages to Teams channels |

### Issue tracking

| Tool | What the agent can do |
|---|---|
| **Atlassian (Jira)** | Create, read, and update Jira issues |
| **Linear** | Create and update Linear issues |

### Cloud

Cloud tools are backed by a **cloud connection** (an IAM role or credential set stored in Plural) and give the agent SQL-queryable access to cloud-provider data via [CloudQuery](https://www.cloudquery.io/).

Rather than asking the LLM to reason about cloud state from natural language descriptions, the agent uses three dedicated tools to work with cloud data precisely:

| Agent tool | What it does |
|---|---|
| `cloud_tables` | Lists available SQL tables for the cloud connection — the agent calls this first to discover what data it can query |
| `cloud_schema` | Returns the column schema for a specific table |
| `cloud_query` | Executes a PostgreSQL-compatible SQL query against the cloud account's data |

The agent is also always equipped with a **calculator tool** that evaluates arithmetic expressions deterministically. This means any aggregation, percentage change, or cost total is computed — never estimated by the LLM — eliminating hallucination on numerical results.

| Provider | Coverage |
|---|---|
| **AWS** | Cost Explorer, EC2, RDS, S3, CloudWatch, EKS, and more |
| **GCP** | Compute Engine, GKE, Cloud SQL, Billing, and more |
| **Azure** | VMs, AKS, storage, Azure Monitor, and more |

### Custom

| Tool | Description |
|---|---|
| **HTTP** | A custom REST endpoint. You define the request shape (URL, method, headers, body, JSON schema) and the agent can call it as a named tool |
| **MCP** | Any [Model Context Protocol](https://modelcontextprotocol.io) server. Plural handles authentication and audit-logs every call |

---

## Creating a tool

From **Workbenches → Integrations**, click the card for the tool type you want to add. Each type has its own credential form:

### Observability tools (Prometheus, Loki, Tempo)

All three use the same form:

* **Name** — a unique label for this tool instance
* **URL** — the base URL of the endpoint
* **Username / Password** — optional basic auth credentials
* **Bearer token** — optional token authentication
* **Tenant ID** — optional tenant header (used for multi-tenant Loki/Cortex deployments)

### Datadog

* **Name**
* **API key** — your Datadog API key
* **App key** — your Datadog application key
* **Site** — the Datadog site (e.g. `datadoghq.com`, `datadoghq.eu`)

### Elastic

* **Name**
* **URL** — Elasticsearch cluster URL
* **Username / Password** — basic auth (or leave blank for API key auth)
* **API key** — alternative to username/password

### Jaeger

* **Name**
* **URL** — Jaeger query service URL
* **Bearer token** — optional token authentication

### SCM tools (GitHub, GitLab, Bitbucket)

* **Name**
* **Token** — a personal access token or app token with the required scopes

Bitbucket Data Center also accepts **username + password** authentication.

### Slack

* **Name**
* **Bot token** — a Slack bot OAuth token (`xoxb-...`) with the `chat:write` and `channels:history` scopes

### Microsoft Teams

* **Name**
* **Webhook URL** — an incoming webhook URL for the target Teams channel

### Atlassian (Jira)

* **Name**
* **Domain** — your Atlassian domain (e.g. `yourorg.atlassian.net`)
* **Email** — the account email to authenticate as
* **API token** — an Atlassian API token for that account

### Linear

* **Name**
* **API key** — a Linear personal API key

### Cloud connection tools

Cloud tools are backed by a **cloud connection** stored in Plural. When creating a cloud tool you will be asked to either select an existing cloud connection or create a new one.

To create a cloud connection, click **Create cloud connection** and provide:

* **Name**
* **Provider** — AWS, GCP, or Azure
* The relevant credentials or IAM configuration for that provider

{% callout severity="info" %}
Cloud connections are shared across tools and can be reused. If you already have a connection configured for use elsewhere in Plural (for example, with a Stack or Cluster), you can select it here without re-entering credentials.
{% /callout %}

The IAM permissions needed depend on what you want the agent to query. For cost analysis, the minimum is read-only access to your cloud's billing API (AWS Cost Explorer, GCP Billing, or Azure Cost Management). For infrastructure queries (instance types, resource tags, capacity), you will also need read access to the relevant resource APIs.

### HTTP tool

* **Name**
* **Base URL** — the root URL the agent will call
* **Method** — GET, POST, PUT, PATCH, or DELETE
* **Headers** — any fixed headers to include (e.g. `Authorization: Bearer ...`)
* **Request body** — a fixed JSON body, if applicable
* **JSON schema** — a JSON Schema describing the input the agent should provide; the agent uses this schema to construct the request body when calling the tool

### MCP tool

* **Name**
* **URL** — the SSE endpoint of the MCP server
* **Authentication** — optional Plural JWT authentication (the server can verify the token to implement authz)

{% callout severity="info" %}
Plural logs every MCP tool call for audit purposes. If you need confirmation workflows before the agent executes an MCP call, configure that on the MCP server's registration rather than at the workbench level.
{% /callout %}

---

## Attaching tools to a workbench

Tools are attached to workbenches during creation (Step 5) or via **Edit** on an existing workbench. A workbench can only call the tools explicitly attached to it — this gives you fine-grained control over what each agent can reach.

---

## Tool RBAC

Each tool has its own **read** and **write bindings**. Users or groups without at least read access to a tool cannot attach it to their workbenches. This is particularly useful for restricting access to production cloud connections or sensitive API credentials.

Tool permissions are configured by navigating to a tool in **Workbenches → Configured tools** and clicking **Edit**.

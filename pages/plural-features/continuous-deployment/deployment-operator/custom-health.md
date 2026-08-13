---
title: CustomHealth
description: Define Lua health checks for Kubernetes resources evaluated by the deployment operator
---

`CustomHealth` lets you register a Lua health override for Kubernetes resources evaluated by the deployment operator. Use it when a resource's built-in health handler does not reflect the readiness or failure signals that matter for your workload.

## How CustomHealth works

`CustomHealth` is a namespaced CRD:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: CustomHealth
```

Its `spec` has four optional string fields: `group`, `version`, `kind`, and `script`. These fields have no defaults or custom validation. The deployment operator must have permission to observe the `CustomHealth` object.

When reconciled, a `CustomHealth` registers its script in a shared deployment-operator cache for an exact group/version/kind (GVK). It does not refer to, or watch, a target resource itself. The script runs later, when the operator evaluates the health of a matching target resource.

Health handlers are selected in this order:

1. A custom script for the target resource's exact GVK.
2. A built-in health handler.
3. A custom script registered with an empty `group`, `version`, and `kind`, which acts as a global fallback.

An empty `script` is ignored. Although `CustomHealth` exposes `status.conditions`, reconciliation does not report script evaluation success or failure there.

## Author Lua health checks

Each health evaluation uses gopher-lua with a fresh Lua state. The global `Obj` contains the complete target Kubernetes object as a Lua table.

Your script must set the global `healthStatus` to a Lua table. The operator reads these fields from it:

| Field | Description |
| --- | --- |
| `status` | Health state: `Healthy`, `Progressing`, `Degraded`, `Suspended`, `Unknown`, or `Missing`. |
| `message` | Optional message explaining the health state. |

If execution fails, or the operator cannot convert `healthStatus`, the **target resource** is reported as `Unknown` with the error message.

Two helper globals are available for evaluating Kubernetes-style status conditions. Both accept a Lua status table—normally `Obj.status`—and a condition name string, and return a boolean:

- `statusConditionExists(statusTable, conditionName)`
- `isStatusConditionTrue(statusTable, conditionName)`

The helpers inspect `statusTable.conditions`. They return `false` if conditions are missing or cannot be used.

### Example: Ready condition health check

The following is an example manifest, not a checked-in upstream configuration:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: CustomHealth
metadata:
  name: example-ready-condition
  namespace: <namespace>
spec:
  group: example.io
  version: v1
  kind: Example
  script: |
    healthStatus = { status = "Unknown" }

    if Obj.status ~= nil and statusConditionExists(Obj.status, "Ready") then
      healthStatus = { status = "Progressing" }
      if isStatusConditionTrue(Obj.status, "Ready") then
        healthStatus = { status = "Healthy" }
      end
    end
```

## Operational guidance

Treat health scripts as trusted operational code. Keep them bounded and efficient because they execute whenever the operator evaluates a matching resource.

The `CustomHealth` package does not configure a timeout; instruction, memory, source, or output limits; a custom module loader; a Kubernetes API helper; or its own explicit filesystem, process, or network wrapper. Avoid relying on unverified Lua runtime behavior when authoring scripts.

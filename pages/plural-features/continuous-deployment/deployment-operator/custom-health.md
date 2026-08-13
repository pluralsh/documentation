---
title: CustomHealth Lua authoring
description: Define CustomHealth Lua scripts for a target Kubernetes GVK
---

`CustomHealth` is an exact-GVK health override used by the deployment operator. Write one when you need to define the health status for a particular Kubernetes group, version, and kind.

Start with a complete manifest. This example targets `stable.example.com/v1`, `Widget` resources and safely handles a missing `status` or `status.phase` field.

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: CustomHealth
metadata:
  name: widget-health
spec:
  group: stable.example.com
  version: v1
  kind: Widget
  script: |
    -- obj is the target Kubernetes resource.
    local metadata = obj.metadata or {}
    local status = obj.status or {}
    local phase = status.phase

    if phase == "Ready" then
      healthStatus = {
        status = "Healthy",
        message = "Widget is ready",
      }
    elseif phase == "Failed" then
      healthStatus = {
        status = "Degraded",
        message = "Widget reported a failed phase",
      }
    elseif metadata.name == nil then
      healthStatus = {
        status = "Unknown",
        message = "Waiting for a resource name",
      }
    else
      healthStatus = {
        status = "Unknown",
        message = "Waiting for Widget " .. metadata.name .. " to report a health phase",
      }
    end
```

Set `metadata.name` to name the `CustomHealth` resource. Set `spec.group`, `spec.kind`, and, when needed, the optional `spec.version` to identify the target GVK. Put the Lua code in `spec.script`.

## Script inputs

The script receives a global `obj`: the unstructured target Kubernetes resource. Read the fields that define health for the target GVK from `obj`, and guard fields that might be absent.

## Script outputs

Every script must set global `healthStatus` to an object with these fields:

| Field | Purpose |
| --- | --- |
| `healthStatus.status` | The resource health status. |
| `healthStatus.message` | An actionable health message. |

`healthStatus.status` must be one of: `Healthy`, `Progressing`, `Degraded`, `Suspended`, `Unknown`, or `Missing`.

## Helpers

The following supported helpers can be used in `spec.script`:

- `checkResourceStatusConditions(obj)`
- `checkJobStatusConditions(obj)`

For example, assign a helper result directly to `healthStatus`:

```yaml
spec:
  script: |
    healthStatus = checkResourceStatusConditions(obj)
```

For a target whose health script uses the job helper:

```yaml
spec:
  script: |
    healthStatus = checkJobStatusConditions(obj)
```

## Authoring guidance

- Keep each script focused on the fields relevant to its target GVK.
- Guard optional or missing fields before reading them.
- Always assign a fallback `healthStatus`, such as `Unknown` when the resource does not yet contain the fields your script needs.
- Make `healthStatus.message` specific enough to help a reader understand the reported state.

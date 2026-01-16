---
title: Resource Application Logic
description: Control deploy ordering with sync waves, run lifecycle hooks, and clean them up via hook delete policies
---

## Overview

Plural’s deployment operator supports sync controls on any Kubernetes manifest you manage with Plural. You can:

- Order resource application using sync waves
- Run lifecycle hooks at specific phases of a sync
- Automatically clean up hook resources with delete policies

This lets you do things like run database migrations before an app rollout, seed data after,
and strictly order dependencies across services.

## Sync waves

Sync waves allow you to define the order within a sync phase in which resources are applied. Lower waves run first.

You can use sync waves on any Kubernetes resource by simply adding an `deployment.plural.sh/sync-wave` annotation.
We also support the Argo CD `argocd.argoproj.io/sync-wave` and Helm `helm.sh/hook-weight` annotations for compatibility.
The value is an integer (as a quoted string) and can be negative.

Annotations are checked in that order of precedence, with `deployment.plural.sh/sync-wave`
taking the highest precedence, then `argocd.argoproj.io/sync-wave`, then `helm.sh/hook-weight`. If none is set,
then the default ordering will be used.

Default wave ordering is:
- 0 - Non-namespaced resources (namespaces, CRDs, persistent volumes, cluster roles, etc.).
- 1 - Core namespaced configuration resources (config maps, secrets, roles etc.). 
- 2 - Core namespaced workload resources (deployments, daemon sets, jobs, pods, etc.).
- 3 - Core namespaced networking resources (services, ingresses, etc.).
- 4 - All other resources.

The operator applies all resources in ascending wave order.

### Example

```yaml
# Create a config map in wave -1, before the deployment in wave 6 and other resources in default waves
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
  annotations:
    deployment.plural.sh/sync-wave: "-1"
---
# Create the deployment in wave 6, after the config map and other resources in default waves
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  annotations:
    deployment.plural.sh/sync-wave: "6"
```

## Sync hooks (phases)

Hook resources are created and monitored at specific phases of a sync. 

Use the `deployment.plural.sh/sync-hook` annotation to designate a manifest as a hook. Alternatively,
you can use Helm `helm.sh/hook` for compatibility. Commonly, jobs are used for hooks.

Supported phases are:
- `pre-sync`: Run before `sync`. Use for DB migrations, pre-flight checks, or draining traffic.
- `sync`: The default phase if none is specified.
- `post-sync`: Run after `sync`. Useful for seeding data, smoke tests, or notifications.
- `sync-fail`: Run only if the `sync` phase fails. Useful for rollbacks, alerts, or diagnostics.
- `skip`: Do not apply this resource. Useful for temporarily disabling a resource without deleting it.

For `helm.sh/hook` we support the following values:
- `pre-install` and `pre-upgrade`: equivalent to `pre-sync`.
- `post-install` and `post-upgrade`: equivalent to `post-sync`.

A resource may belong to multiple phases, for example `pre-sync,post-sync`.

A resource can be both a hook and have a sync wave. This allows you to control the ordering of hooks relative
to other hooks and resources.

The operator executes hooks starting in the described order and proceeds to the next phase only when all hooks
in the current phase will apply and achieve a healthy state.

### Example

```yaml
# Create a pre-sync migration job in wave -1
apiVersion: batch/v1
kind: Job
metadata:
  name: migrate-db
  annotations:
    deployment.plural.sh/sync-hook: pre-sync
    deployment.plural.sh/sync-wave: "-1"
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: migrate
          image: myrepo/migrate:latest
          args: ["up"]
```

## Hook delete policies (cleanup)

By default, hook resources are left in the cluster after they run. You can opt into automatic cleanup with 
`deployment.plural.sh/sync-hook-delete-policy` annotation. You can also use Helm `helm.sh/hook-delete-policy`
annotation. Multiple policies can be comma-separated.

Use `hook-succeeded` and/or `hook-failed` to delete the resource after it completes successfully or fails, respectively.
If no delete policy is set, the resource will be kept.

Only jobs and pods are automatically deleted. Other resources need to be deleted manually or via other automation.

When a manifest of a hook is updated, the operator will reapply the resource even if it has already completed.

{% callout severity="warning" %}
If a job manifest sets `ttlSecondsAfterFinished`, Kubernetes will delete it after it completes.
The agent will then see the resource as missing and recreate it unless the manifest also
includes a hook delete policy via `deployment.plural.sh/sync-hook-delete-policy` or `helm.sh/hook-delete-policy`.

To avoid a delete/recreate loop, ensure the delete policy contains a value we accept: `hook-succeeded` and/or
`hook-failed`. With a valid delete policy set, completed hooks won’t be recreated unless their manifest changes.
{% /callout %}

### Example

```yaml
# Create a pre-sync migration job that is deleted on success
apiVersion: batch/v1
kind: Job
metadata:
  name: migrate-db
  annotations:
    deployment.plural.sh/sync-hook: pre-sync
    deployment.plural.sh/sync-hook-delete-policy: hook-succeeded
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: migrate
          image: myrepo/migrate:latest
          args: ["up"]
```

## FAQ
- Do I need a separate tool for these annotations to work?
  No. The operator understands these annotations and applies them as described.

- What happens if I don’t set a delete policy on a hook?
  The hook resource will be kept in the cluster so you can inspect logs and status. Add `hook-succeeded` and/or
  `hook-failed` to enable automatic cleanup.

- Can I control ordering between different hooks?
  Yes. Combine `deployment.plural.sh/sync-hook` with `deployment.plural.sh/sync-wave` on each hook.

- Are negative waves allowed?
  Yes. Negative, zero, and positive integers are supported. Lower numbers run first.

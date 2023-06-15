---
title: Tools for Debugging
description: Additional resources to help you monitor and debug applications.
---
## Health Checks

Every application has a general application-level health check, which aggregates the statuses of all core Kubernetes components and generates a digestible summary for human viewing.  These are viewable in the application switcher in the admin console, or by running:

```
plural watch <app-name>
```

This will generate output like:

```
Application: console (0.5.35)  READY
plural admin console

Components Ready: 15/15

Ready Components:
- service/console :: Ready
- service/console-headless :: Ready
- service/console-master :: Ready
- service/console-replica :: Ready
- service/plural-console :: Ready
- service/plural-console-repl :: Ready
...
```

If a component is not ready, it will also generate hints to kubectl commands which might help debug them further.

## Proxies

Plural also helps with discovering useful proxy commands for inspecting core resources.  This is done via the `Proxy` crd.  A decent example is the proxy to the admin consoles underlying Postgres database:

```yaml
apiVersion: platform.plural.sh/v1alpha1
kind: Proxy
metadata:
  name: db
  labels:
spec:
  type: db
  target: statefulset/console-postgresql
  credentials:
    secret: console-postgresql
    key: postgresql-password
    user: console
  dbConfig:
    name: console
    engine: postgres
    port: 5432
```

The interface is quite powerful, and supports things like fetching db credentials and initiating a sql shell, or spawning a web ui via `kubectl port-forward` and printing the credentials to stdout to allow a user easily log in.

## Logs

Application-aware log tails can be baked into any Plural application to prevent a user from having to dig through the Kubernetes API to find the specific Pod they should tail.  They can be discovered and watched using:

```shell {% showHeader=false %}
plural logs list <app>
plural logs tail <app> <name>
```

Now the relevant logs will be streamed to stdout.

The specification for these is baked into the `LogTail` crd, for example:

```yaml
apiVersion: platform.plural.sh/v1alpha1
kind: LogTail
metadata:
  name: aws-load-balancer
  labels:
spec:
  limit: 50
  target: deployment/bootstrap-aws-load-balancer-controller
  follow: true
```
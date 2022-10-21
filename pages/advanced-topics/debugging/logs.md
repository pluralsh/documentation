---
title: Logs
---

Application aware log tails can be baked into any plural application to prevent a user from having to dig through the kubernetes api to find the specific pod they should tail.  They can be discovered and watched using:

```shell {% showHeader=false %}
plural logs list <app>
plural logs tail <app> <name>
```

and the relevant logs will be streamed to stdout.

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

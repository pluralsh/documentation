---
title: Delete an Application
description: How to uninstall your Plural applications.
---

To uninstall applications run the following command in the CLI:

```shell {% showHeader=false %}
plural destroy <app-name>
```

This will do:

- Destroy all Terraform resources
- Bring down application in your cloud
- Empty the Kubernetes namespace associated with your application

This will **not** do:

- Remove application builds from your local Plural Git repository
- Remove application configuration values from `context.yaml`

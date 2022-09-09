---
description: How do I bring things down safely?
---

# Uninstalling Plural

## Overview

Uninstalling any Plural application or an entire Plural installation is a one-liner in your terminal. If you want to delete your Plural installation, make sure to run `plural destroy` before deleting your Git repository. If you delete your Git repository first, you will have to manually clean up all the resources that Plural has provisioned for you.&#x20;

## Uninstalling Individual Applications

To uninstall applications, use:

```
plural destroy <app-name>
```

This will do things like destroying terraform resources and emptying k8s namespaces, but it won't remove the application builds from your local repo, or the application configuration values from `context.yaml.`

## Uninstalling your Entire Installation

To uninstall your entire Plural installation and Kubernetes cluster, run:

```
plural destroy
```

{% hint style="danger" %}
Only do this if you're absolutely sure you want to bring down all associated resources with this repository.
{% endhint %}

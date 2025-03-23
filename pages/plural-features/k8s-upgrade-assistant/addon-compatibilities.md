---
title: Add-on compatibilities
description: Keep your add-ons compatible with next Kubernetes version
---

Ensuring add-on compatibility across different Kubernetes versions can be challenging as it requires careful planning,
thorough testing, and continuous maintenance to address the evolving nature of Kubernetes and its ecosystem.
Learn how Plural can assist you in that process.

# Compatibility scraping
Plural helps in ensuring that all known third-party add-ons are compatible with the next Kubernetes version
by systematically scraping multiple sources for compatibility information. This includes gathering data from
official documentations, GitHub repositories, and other relevant sources. By consolidating this information,
we create a comprehensive database of add-on compatibility details.

# Checking add-on compatibilities
Add-on compatibility data is then made accessible through the Plural Console, where you can easily check
the compatibility status of your add-ons with upcoming Kubernetes versions. This proactive approach helps
to avoid potential issues caused by API changes and other version-specific nuances, ensuring a smoother
transition to newer Kubernetes releases.

    ![addon-compatibilities](/assets/deployments/addon-compatibilities.png)

    ![addon-compatibilities-details.png](/assets/deployments/addon-compatibilities-details.png)

# Automating Deployments on Newly Discovered Add-On Versions

Plural's [Observer](https://docs.plural.sh/getting-started/how-to-use/pipelines#use-an-observer-to-automate-pipeline-context-creation-extra-credit) has the ability to automatically scrape our compatibility tables and generate PRs or Pipeline Runs whenever a new version is discovered that is compatible with a provided kubernetes version set.  It's probably easiest to simply look at an example:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: Observer
metadata:
  name: ingress-nginx
spec:
  crontab: "*/5 * * * *"
  initial: 4.8.0
  target:
    order: SEMVER
    type: ADDON
    addon:
      name: ingress-nginx
      kubernetesVersions:
      - "1.28"
      - "1.29"
      - "1.30"
  actions:
  - type: PIPELINE
    configuration:
      pipeline:
        pipelineRef:
          name: ingress-nginx
          namespace: infra
        context:
          name: ingress-nginx
          version: $value
```

This will scrape the tables for (Ingress NGINX)[https://github.com/kubernetes/ingress-nginx] that are compatible with all of kubernetes versions 1.28, 1.29, and 1.30 and create a pipeline context to bounce the pipeline we've defined to deploy it across dev and prod.  This makes it very easy to trace an upgrade path across multiple versions with very little manual effort besides at most approving PRs.

Observers are a lot more flexible, and can also call PR automations that can trigger your own deployment automation on merge as well.
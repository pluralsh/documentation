---
title: PR Automation Pipelines
description: Use PR Automations to generate revisions throughout a Pipeline
---

Plural Pipelines do not ordinarily require human intervention to deploy the services within them, instead relying on common conventions like passing along git shas plus configured secrets to ferry along code changes. That said, there are still cases where you would like a PR to perform each update:

- Robust GitOps flows where you need an auditable approval for each change
- Cases where other automations (eg GitOps app-of-apps or terraform) could interfere with the changes from a pipeline

Plural PR Automation pipelines provide a simple but highly configurable means of providing extensible, auditable, yet automated workflows that can meet those sorts of constraints.

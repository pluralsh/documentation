---
title: Setting Up a Pipeline
description: Using Plural Deploy Pipelines
---

# Prerequisites

#### Ensure your _[app.plural.sh](https://app.plural.sh/profile/me)_ User has `admin` permissions  


# Set Up
This example will setup pipelines to deploy the [Plural CD Demo](https://github.com/pluralsh/plrl-cd-demo)

* We'll Create a Prod Cluster to promote the _cd-demo_ application to
  * We'll follow the [steps for creating a new cluster](/how-to/set-up/workload-cluster), but select the `prd` tier
  * Merge the changes from the PR Automation and Approve the Stack changes
  * Once the cluster is created successfully we can create the prod service deployment


* Create a Pipeline.yaml in your _infra_ repo:
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: Pipeline
metadata:
  name: cd-demo
  namespace: infra
spec:
  stages:
    - name: dev
      services:
        - serviceRef:
            name: cd-demo-dev
            namespace: cd-demo
    - name: prod
      services:
        - serviceRef:
            name: cd-demo
            namespace: cd-demo
          criteria:
            serviceRef:
              name: cd-demo
              namespace: cd-demo
            secrets:
              - version
  edges:
    - from: dev
      to: prod
      gates:
        - name: approval-gate
          type: APPROVAL
---
apiVersion: deployments.plural.sh/v1alpha1
kind: PipelineContext
metadata:
  name: cd-demo-context
spec:
  pipelineRef:
    name: cd-demo
    namespace: infra
  context:
    version: 6.5.4
```
* Apply the yaml to your Management Cluster
  * `kubectl -n infra apply -f pipline.ymal`

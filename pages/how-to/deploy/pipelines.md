---
title: Setting Up a Dev->Prod Pipeline
description: Using Plural PR-based Pipelines to automate Dev -> Staging -> Prod Promotions 
---

# Overview

We've already gone over provisioning clusters, deploying a basic cluster runtime, and setting up a microservice.  You can use almost all those tools for a general deployment process if you wanted to and still maintain good velocity overall.  But any robust organization is going to split their environments into at least a `dev` and a `prod` stage, and start wasting cycles on promotions between them. Plural Pipelines are meant to solve for that.

This tutorial will cover:

* Using the cluster-creator PR Automation (PRA) to setup a prod cluster.
* Using the same technique as in the [Deploying a Microservice](/how-to/deploy/micro-service) tutorial to set up an example prod service
* Setting up a `PrAutomation` for generating the promotion related GitOps codechanges needed
* Setting up a `Pipeline` to orchestrate our promotion process.

## Setup Your Prod Cluster

Go through the [Setting Up Your First Workload Cluster](/how-to/set-up/workload-cluster) tutorial again to create another cluster which will serve as the prod cluster. This will involve:

1. Call the `cluster-creator` PRA to generate a PR to create your cluster.  Approve and merge it.
2. Wait for the new stack to be spawned, and approve its run.
3. Wait 10-20m for EKS to provision fully and be registered in Plural.

## Setup the Prod Instance of the `cd-demo` Service

Imitating the [Setting Up a Microservice](how-to/deploy/microservice) tutorial, write a new `ServiceDeployment` to `bootstrap/cd-demo/prod.yaml`:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: cd-demo-prod
  namespace: infra
spec:
  namespace: cd-demo
  git:
    folder: helm # this is where the helm chart is located in the git repository
    ref: main
  repositoryRef:
    kind: GitRepository
    name: cd-demo
    namespace: infra
  helm:
    values:
      image:
        repository: ghcr.io/pluralsh/plrl-cd-test
        tag: latest # VERSION
  clusterRef:
    kind: Cluster
    name: plrl-how-to-workload-00-prod # replace this with whatever you might have named your dev cluster
    namespace: infra
```

## Setup The PR Automation to Perform Promotions

We're going to use PR-based pipelining.  The main goal of this is to ensure all changes made to the system are recorded in Git for auditing and to ensure your setup is fully repeatable.  The PR Automation needed is relatively simple:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: PrAutomation
metadata:
  name: cd-demo-pipeline
spec:
  name: cd-demo-pipeline
  documentation: Updates the cd-demo service along each pipeline stage
  updates:
    regexReplacements:
    - regex: "tag: (.*) # VERSION"
      file: bootstrap/cd-demo/{{ context.pipeline.stage.name }}.yaml
      replacement: "tag: {{ context.version }} # VERSION"
  scmConnectionRef:
    name: github
  title: "Updating cd-demo version to {{ context.version }} (stage={{ context.pipeline.stage.name }})"
  message: "Updating cd-demo version to {{ context.version }} (stage={{ context.pipeline.stage.name }})"
  identifier: your-org/your-plural-up-repo # <---- replace with the slug for your plural up repo
  configuration:
  - name: version
    type: STRING
    documentation: The version tag to use
```

## Define Your Pipeline

Now that those two resources are in-place, you should be able to define your pipeline:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: Pipeline
metadata:
  name: cd-demo
spec:
  stages:
    - name: dev
      services:
        - serviceRef:
            name: cd-demo-dev
            namespace: infra
          criteria:
            prAutomationRef:
              name: cd-demo-pipeline
    - name: prod
      services:
        - serviceRef:
            name: cd-demo-prod
            namespace: infra
          criteria:
            prAutomationRef:
              name: cd-demo-pipeline
  edges:
    - from: dev
      to: prod
      gates:
      - name: approval-gate
        type: APPROVAL
```

To give a quick overview of what this resource is doing, it is:

* creating a pipeline with two stages, dev and prod.  Dev just has the `cd-demo-dev` service in it, and Prod has the `cd-demo-prod` service.
* Updates to each of these services use a PR Automation, defined by the `criteria.prAutoamtionRef` field.  That's pointing to the `cd-demo-pipeline` `PRAutomation` CRD we created above.
* The single dev -> prod edge defined has just a standard push-button approval gate.

Since this is also wrapped into a repeatable, declarative api, it's very easy to generate these dynamically using a wrapper PR Automation or any other codegen process.

## Push to Deploy

We registered all these manifests under the root `bootstrap` folder a `plural up`-derived management cluster listens to by default, so all you should need to do is either:

```sh
git commit -m "setup our cd-demo pipeline"
git push
```

or create a PR, approve it, and merge to have this pipeline deploy.  

{% callout severity="info" %}
You might need to wait a minute or two for the system to poll git and realize there's a new change.
{% /callout %}

Once you've configured all of these, you should see the new Pipeline available at https://{your-console-domain}/cd/pipelines

## Trigger your Pipeline

A pipeline is triggered by binding a pipeline context to it.  To test, it can be easiest to simply use the ui, which can be done by

1. Navigate to https://{your-console-domain}/cd/pipelines and click on the `cd-demo` row
2. Click `Add Context` at the bottom of the dev stage
3. Enter a json blob like `{"version": "<some-docker-tag>"}` to setup a new context.  The context should match `spec.configuration` from the PR Automation `cd-demo-pipeline` you created for this pipeline.

You can also trigger the pipeline via CRD, wich can be done by writing a file to `bootstrap/cd-demo/context.yaml`:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: PipelineContext
metadata:
  name: cd-demo-context
spec:
  pipelineRef:
    name: cd-demo
    namespace: infra
  context:
    version: {{some-docker-tag}}
```

## Use an Observer to Automate Pipeline Context Creation (EXTRA CREDIT)

The [Observer](/deployments/operator/api#observer) CRD is designed to poll external registries, like an OCI docker image registry, or a helm repository, or even Git, and execute defined actions based on the result. If you've adopted a `semver` based release versioning process, this can simplify the process of picking up new images to deploy, and also enhance security by adopting a "pull" model for deployment, instead of requiring a CI-derived push and the network security issues that creates (having to whitelist all Github or CircleCI IP-ranges).

If you want to do this, a simple observer CRD that could be implemented would be, defined at `bootstrap/cd-demo/observer.yaml`:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: Observer
metadata:
  name: cd-demo
spec:
  crontab: "*/5 * * * *"
  target:
    order: SEMVER
    type: OCI
    oci:
      url: ghcr.io/pluralsh/plrl-cd-test
      provider: BASIC # we support most OCI auth methods, this is public so easy to use
  actions:
  - type: PIPELINE
    configuration:
      pipeline:
        pipelineRef:
          name: cd-demo
          namespace: infra
        context:
          version: $value # the $value is the convention for the result of the poll operation against the OCI repo
```

Basically what this resource will do is:

1. Poll the `ghcr.io/pluralsh/plrl-cd-test` OCI repo using public credentials according to the `*/5 * * * *` crontab (every 5 minutes)
2. When a later semver is discovered (`order: SEMVER`), persist it as the new latest and trigger the associated actions.
3. Execute the lone action, to attach a new pipeline context which will resolve to `{"version": "$value"}` where `$value` is the new latest semver
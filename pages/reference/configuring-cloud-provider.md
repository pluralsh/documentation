---
title: Cloud Provider CLI Setup
description: >-
  Make sure that your cloud provider CLI is properly set up before installing
  Plural.
---

Before you can start installing your Kubernetes cluster and applications with the Plural CLI, you will need to make sure that your cloud provider CLI is set up correctly.

{% callout severity="info" %}
If you have already configured and installed your cloud provider CLI and are still seeing errors, make sure that you are on the latest version of the CLI.
{% /callout %}

## Installation

Follow the provider-specific instructions below.

{% tabs %}
{% tab title="AWS" %}
* Follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) to install your AWS cli.
* Verify that the cli has been added to your `$PATH`
* Follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) to configure your cli and connect it to your aws console
* Verify that your cli has been properly configured by running

```
aws configure list
```

You should see a set of values that looks like this:

```
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key     ****************RUG2 shared-credentials-file    
secret_key     ****************hJUU shared-credentials-file    
    region                us-east-2      config-file    ~/.aws/config
```
{% /tab %}

{% tab title="GCP" %}
* Follow the instructions [here](https://cloud.google.com/sdk/docs/install) to install the gcloud cli.
* Verify that the cli has been added to your `$PATH`
* Create a new project in gcp via the cli:

```
gcloud projects create example-project-name
```

* [Enable the Kubernetes Engine API](https://cloud.google.com/kubernetes-engine/docs/quickstart) for the project you just created.
* [Enable the Google DNS API](https://excelnotes.com/enable-cloud-dns-api/) for the project you just created.
* Run `gcloud init` and follow the prompts to configure the gcloud cli and connect it to the project you just created.
* Verify that your cli has been properly configured. It should look something like this. Make sure that your active configuration is set to the project you just created.

```
> gcloud config list
[compute]
region = us-east1
zone = us-east1-b
[core]
account = yirenlu92@gmail.com
disable_usage_reporting = True
project = example-project-name

Your active configuration is: [example-project-name]
```

* If you have multiple projects in GCP and previously have configured your gcloud cli to point to a different project, run

```
gcloud auth application-default login
```

to reset the application default credential and re-authorize the browser. Failure to do this could result in `project requested not found` errors further along.
{% /tab %}

{% tab title="Azure" %}
* Follow the instructions [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) to install your Azure cli.
* Follow the instructions [here](https://docs.microsoft.com/en-us/cli/azure/get-started-with-azure-cli) to sign into your Azure cli.
{% /tab %}
{% /tabs %}

## Permissions

{% tabs %}
{% tab title="GCP" %}
#### **Service Account Permissions**

When deploying via GCP, you may run into a Terraform error around permissions. Plural will need to create a various set of resources in order to make sure that your Kubernetes cluster is configured correctly. We recommend attaching the following permission roles to the service account associated with your CLI or Cloud Shell:

* `owner`
* `storage.admin`

Follow [these steps](https://cloud.google.com/sdk/docs/authorizing#authorize\_with\_a\_service\_account) to authorize your GCloud CLI with a new or existing Service Account.
{% /tab %}

{% tab title="AWS" %}
_No special permissions necessary._
{% /tab %}

{% tab title="Azure" %}
_No special permissions necessary._
{% /tab %}
{% /tabs %}




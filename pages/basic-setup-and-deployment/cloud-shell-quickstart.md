---
description: Setting up your first cluster in browser.
---

# Deploying with Cloud Shell

## Overview

This guide goes over how to get started with Plural using our in-browser Cloud Shell. At the end of this tutorial, you will have:

* Provisioned a virtual shell loaded with the dependencies to run Plural.
* Created a Plural GitHub repository to store your configuration in.
* Provisioned a fully-configured Kubernetes cluster.
* Installed an application and all its dependencies on your Kubernetes cluster.

in under 30 minutes, all within your browser.

## Login and Create the Plural Repository

Head over to [app.plural.sh](https://app.plural.sh) and set up an account.

Directly navigate to [app.plural.sh/shell](https://app.plural.sh/shell) to access the Cloud Shell. You'll be prompted to OAuth with GitHub. We're just getting your permission to create a GitHub repository for Plural configuration on your behalf. Give your repository a name, being sure to select the right organization or individual account on the left.

![](../.gitbook/assets/cloud-shell-quickstart/image-1.png)

### Set up a Cloud Provider

You now have two options. If you're just trying out Plural, you can have a free demo cluster on the house that will last for 6 hours. Just keep in mind that this option will be only available once.

![](../.gitbook/assets/cloud-shell-quickstart/image-2.png)

To set up with your own cloud provider, provide your credentials in the following screen.

### Set up a Workspace

We'll now start setting up your Kubernetes cluster configuration. Here's a guide to the config:

**cluster**: The name of your Kubernetes cluster. Name this based on what you're planning to run.

**bucket prefix**: We provision S3 buckets for storing logs and state. Just enter any string to help us uniquely name your buckets.

**subdomain**: We'll provision a subdomain for you to host your cluster and applications under. For example, if you choose `nintendo` as your subdomain and spin up an instance of Airflow, it will be available at `airflow.nintendo.onplural.sh`.

You should hit the following verification screen afterward. Hit `Create` once you're ready to go!

![Thankfully, Abhi remembered to deactivate the key before publishing this image.](../.gitbook/assets/cloud-shell-quickstart/image-3.png)

While your Cloud Shell is provisioning, double check that your repository was initialized by checking your GitHub repos. There should be a repository with an initial commit with the name that you configured.

## Configure Applications and Kubernetes Cluster

![](../.gitbook/assets/cloud-shell-quickstart/image-4.png)

Now that we're in, let's install two applications:

* The Plural console, so that we can upgrade/monitor our applications and deployments.
* An Airflow instance.

### Install the Console

Install the Console with the following one-liner:

{% tabs %}
{% tab title="AWS" %}
`plural bundle install console console-aws`
{% endtab %}

{% tab title="GCP" %}
`plural bundle install console console-gcp`
{% endtab %}
{% endtabs %}

You'll now be guided through a setup wizard for the console. For help with configuration, refer to [this guide](../repositories/console.md) for explanations on each step.

### Install Airflow

Install Airflow with the following one-liner:

{% tabs %}
{% tab title="AWS" %}
`plural bundle install airflow aws-airflow`
{% endtab %}

{% tab title="GCP" %}
`plural bundle install airflow gcp-airflow`
{% endtab %}
{% endtabs %}

Similarly to the console, you'll be guided through a setup wizard for Airflow. For help with configuration, refer to [this guide](../repositories/airflow.md).

Both the console and Airflow support [Plural OIDC](../identity-and-access-management/openid-connect.md), so as long as you're logged in to `app.plural.sh`, you can directly access both applications.

## Provision the Kubernetes Cluster and Install Applications

Now it's time for Plural to write all the Helm and Terraform required to bring up your Kubernetes cluster based on the config that you've entered. You can do that by running:

`plural build`

`plural build --only airflow`

Do a quick `ls` to check out the files we've created for you. We're now ready to deploy. Do that by running:

`plural deploy --commit "Deploy Plural console and Airflow"`

This will do two things:

* Push your configuration files created in the Cloud Shell to your newly created repository
* Deploy your Kubernetes cluster and the applications you've configured

Now grab a coffee or your favorite hot beverage while we wait for your cloud provider to provision your infrastructure.

## Check out your Deployments

### Plural Console

Head over to `console.YOUR_WORKSPACE.onplural.sh` (or the hostname you picked) to view the console that you have provisioned. If you enabled Plural OIDC, you'll be able to quickly login using your Plural account.

{% hint style="warning" %}
You may experience a delayed creation of your SSL certs for your applications. ZeroSSL currently may take up to 24 hours to provide you your certs.
{% endhint %}

Here, you'll be able to check node health, Pod health, logs, pre-built dashboards tailored for Airflow, and more.

![](../.gitbook/assets/cloud-shell-quickstart/image-5.png)

![](../.gitbook/assets/cloud-shell-quickstart/image-6.png)

### Airflow / Other Applications

To access your Airflow installation, access it similarly to the console at `airflow.YOUR_WORKSPACE.onplural.sh`

![](../.gitbook/assets/cloud-shell-quickstart/image-7.png)

You can now access your DAGs from the GitHub repo that you set up earlier. Just add any DAGs you want to use the repo and a sync will run every 5 minutes or so to pull them in.

Accessing other applications deployed on Plural will work exactly the same way.

## Wrapping Up

Now that we've set up a running cluster with Plural, we can add and remove applications to our existing cluster as we so choose.

### Leaving the Shell Experience

If you want to start using the CLI locally, just [install the Plural CLI](../#1.-install-plural-cli-and-dependencies) and run:

`plural shell sync`

This will sync your local installation with the Cloud Shell. You can then proceed to purge the shell if you wish to spin it down:

`plural shell purge`

### Uninstalling Applications

To uninstall an application from your cluster, run:

`plural destroy <app-name>`

### Feedback

If you have any feedback or questions about the experience, [head over to our community Discord](https://discord.gg/pluralsh) and drop us some feedback. The Cloud Shell is still in development and we are dedicated to perfecting the user experience, so any feedback would be immensely helpful to us.

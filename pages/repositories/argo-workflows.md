
# Argo-workflows

## Description
Plural will install Argo-workflows in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Argo-workflows for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install argo-workflows argo-workflows-aws {% endtab %} {% tab title="AZURE" %} plural bundle install argo-workflows argo-workflows-azure {% endtab %} {% tab title="GCP" %} plural bundle install argo-workflows argo-workflows-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"

`workflowBucket`: bucket to workflow artifacts in

`hostname`: FQDN to use for your Argo Workflows installation

`adminEmail`: email address for the admin user

`adminGroup`: specify a user group to grant admin rights to
    

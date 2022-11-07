
# Redis

## Description
Plural will install Redis in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Redis for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install redis aws-redis {% endtab %} {% tab title="AZURE" %} plural bundle install redis azure-redis {% endtab %} {% tab title="GCP" %} plural bundle install redis gcp-redis {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"

`masterHostname`: the dns name to access the redis master (optional)

`replicaHostname`: the dns name to access your redis replicas (optional)
    

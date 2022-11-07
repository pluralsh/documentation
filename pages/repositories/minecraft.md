
# Minecraft

## Description
Plural will install Minecraft in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Minecraft for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install minecraft minecraft-aws {% endtab %} {% tab title="AZURE" %} plural bundle install minecraft minecraft-azure {% endtab %} {% tab title="GCP" %} plural bundle install minecraft minecraft-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"

`hostname`: fqdn for your metabase instance
    

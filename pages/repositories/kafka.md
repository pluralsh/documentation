
# Kafka

## Description
Plural will install Kafka in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Kafka for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install kafka aws-kafka {% endtab %} {% tab title="AZURE" %} plural bundle install kafka azure-kafka {% endtab %} {% tab title="GCP" %} plural bundle install kafka gcp-kafka {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"


    

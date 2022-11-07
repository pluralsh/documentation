
# Trino

## Description
Plural will install Trino in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Trino for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install trino trino-aws {% endtab %} {% tab title="AZURE" %} plural bundle install trino trino-azure {% endtab %} {% tab title="GCP" %} plural bundle install trino trino-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`hostname`: domain on which you'd like to host trino's web interface
    

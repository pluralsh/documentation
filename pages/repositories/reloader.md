
# Reloader

## Description
Plural will install Reloader in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Reloader for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install reloader reloader-aws {% endtab %} {% tab title="AZURE" %} plural bundle install reloader reloader-azure {% endtab %} {% tab title="EQUINIX" %} plural bundle install reloader reloader-equinix {% endtab %} {% tab title="GCP" %} plural bundle install reloader reloader-gcp {% endtab %} {% tab title="KIND" %} plural bundle install reloader reloader-kind {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"


    

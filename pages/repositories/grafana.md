
# Grafana

## Description
Plural will install Grafana in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Grafana for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install grafana aws-grafana {% endtab %} {% tab title="AZURE" %} plural bundle install grafana azure-grafana {% endtab %} {% tab title="EQUINIX" %} plural bundle install grafana equinix-grafana {% endtab %} {% tab title="GCP" %} plural bundle install grafana gcp-grafana {% endtab %} {% tab title="KIND" %} plural bundle install grafana kind-grafana {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`hostname`: FQDN to use for your grafana installation
    

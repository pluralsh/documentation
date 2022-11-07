
# Kubecost

## Description
Plural will install Kubecost in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Kubecost for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install kubecost kubecost-aws {% endtab %} {% tab title="AZURE" %} plural bundle install kubecost kubecost-azure {% endtab %} {% tab title="GCP" %} plural bundle install kubecost kubecost-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





`hostname`: FQDN to use for your grafana installation

`hostname`: FQDN to use for your KubeCost installation
    

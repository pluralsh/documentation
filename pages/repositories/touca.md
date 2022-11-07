
# Touca

## Description
Plural will install Touca in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Touca for the following providers:

{% tabs %}
{% tab title="AZURE" %} plural bundle install touca touca-azure {% endtab %} {% tab title="GCP" %} plural bundle install touca touca-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`network_name`: Arbitary name for the network to place your cluster in, eg "plural"





`hostname`: the fully qualified domain name your touca instance will be available at
    

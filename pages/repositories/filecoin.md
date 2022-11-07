
# Filecoin

## Description
Plural will install Filecoin in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Filecoin for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install filecoin filecoin-aws {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"


    

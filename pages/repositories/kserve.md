
# Kserve

## Description
Plural will install Kserve in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Kserve for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install kserve kserve-aws {% endtab %} {% tab title="AZURE" %} plural bundle install kserve kserve-azure {% endtab %} {% tab title="GCP" %} plural bundle install kserve kserve-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





`masterHostname`: the dns name to access the redis master (optional)

`replicaHostname`: the dns name to access your redis replicas (optional)

`tempoBucket`: Arbitrary bucket name to store the traces in, eg plural-tempo-traces

`kialiHostname`: FQDN to use for the Kiali installation




    

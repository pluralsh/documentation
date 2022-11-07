
# Kubeflow

## Description
Plural will install Kubeflow in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Kubeflow for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install kubeflow kubeflow-aws {% endtab %} {% tab title="GCP" %} plural bundle install kubeflow kubeflow-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"







`backup_bucket`: bucket to store mysql backups in

`hostname`: FQDN to use for your accessing the mysql orchestrator

`masterHostname`: the dns name to access the redis master (optional)

`replicaHostname`: the dns name to access your redis replicas (optional)

`tempoBucket`: Arbitrary bucket name to store the traces in, eg plural-tempo-traces

`kialiHostname`: FQDN to use for the Kiali installation





`pipelines_bucket`: bucket to store the pipeline artifacts and logs in

`hostname`: FQDN to use for your Kubeflow installation
    

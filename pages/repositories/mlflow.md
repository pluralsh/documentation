
# Mlflow

## Description
Plural will install Mlflow in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Mlflow for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install mlflow mlflow-aws {% endtab %} {% tab title="AZURE" %} plural bundle install mlflow mlflow-azure {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`mlflow_bucket`: bucket to store the mlflow artifacts in

`hostname`: FQDN to use for your MLFlow installation
    

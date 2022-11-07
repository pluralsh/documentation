
# Dagster

## Description
Plural will install Dagster in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Dagster for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install dagster dagster-aws {% endtab %} {% tab title="AZURE" %} plural bundle install dagster dagster-azure {% endtab %} {% tab title="GCP" %} plural bundle install dagster dagster-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`dagsterBucket`: s3 bucket for storing dagster logs

`hostname`: fqdn on which to deploy your dagster instance
    


# Postgres

## Description
Plural will install Postgres in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Postgres for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install postgres aws-postgres {% endtab %} {% tab title="AZURE" %} plural bundle install postgres azure-postgres {% endtab %} {% tab title="EQUINIX" %} plural bundle install postgres equinix-postgres {% endtab %} {% tab title="GCP" %} plural bundle install postgres gcp-postgres {% endtab %} {% tab title="KIND" %} plural bundle install postgres kind-postgres {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"

`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives
    

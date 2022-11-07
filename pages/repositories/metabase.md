
# Metabase

## Description
Plural will install Metabase in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Metabase for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install metabase metabase-aws {% endtab %} {% tab title="AZURE" %} plural bundle install metabase metabase-azure {% endtab %} {% tab title="GCP" %} plural bundle install metabase metabase-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`hostname`: fqdn for your metabase instance
    

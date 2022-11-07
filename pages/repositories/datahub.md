
# Datahub

## Description
Plural will install Datahub in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Datahub for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install datahub datahub-aws {% endtab %} {% tab title="AZURE" %} plural bundle install datahub datahub-azure {% endtab %} {% tab title="GCP" %} plural bundle install datahub datahub-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`hostname`: hostname for your kibana instance



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`hostname`: domain on which you'd like to host datahub's page
    

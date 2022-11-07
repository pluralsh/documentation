
# Airbyte

## Description
Plural will install Airbyte in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Airbyte for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install airbyte airbyte-aws {% endtab %} {% tab title="AZURE" %} plural bundle install airbyte airbyte-azure {% endtab %} {% tab title="GCP" %} plural bundle install airbyte airbyte-gcp {% endtab %} {% tab title="KIND" %} plural bundle install airbyte airbyte-kind {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`airbyteBucket`: Arbitrary bucket name to store airbyte logs in

`hostname`: the fully qualified domain name your airbyte instance will be available at

`privateHostname`: a private dns name to securely access the airbyte api from
    

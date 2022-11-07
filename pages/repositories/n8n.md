
# N8n

## Description
Plural will install N8n in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support N8n for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install n8n n8n-aws {% endtab %} {% tab title="AZURE" %} plural bundle install n8n n8n-azure {% endtab %} {% tab title="GCP" %} plural bundle install n8n n8n-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`hostname`: domain on which you'd like to host n8n's page
    

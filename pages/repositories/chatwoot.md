
# Chatwoot

## Description
Plural will install Chatwoot in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Chatwoot for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install chatwoot chatwoot-aws {% endtab %} {% tab title="AZURE" %} plural bundle install chatwoot chatwoot-azure {% endtab %} {% tab title="GCP" %} plural bundle install chatwoot chatwoot-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`masterHostname`: the dns name to access the redis master (optional)

`replicaHostname`: the dns name to access your redis replicas (optional)

`chatwootBucket`: bucket to store chatwoot files in

`hostname`: FQDN to use for your chatwoot installation
    

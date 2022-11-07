
# Hasura

## Description

Plural will install Hasura in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Hasura for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install hasura hasura-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install hasura hasura-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install hasura hasura-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`hostname`: Fully Qualified Domain Name to use for your hasura installation, eg hasura.topleveldomain.com if topleveldomain.com is the domain you inputed for dns_domain above.



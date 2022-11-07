
# Sentry

## Description

Plural will install Sentry in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Sentry for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install sentry aws-sentry
{% /tab %}
{% tab title="AZURE" %}
plural bundle install sentry azure-sentry
{% /tab %}
{% tab title="GCP" %}
plural bundle install sentry gcp-sentry
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`masterHostname`: the dns name to access the redis master (optional)

`replicaHostname`: the dns name to access your redis replicas (optional)



`hostname`: hostname for your sentry instance

`filestoreBucket`: s3 bucket to store miscellaneous files to

`adminEmail`: admin user email



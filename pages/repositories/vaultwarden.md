
# Vaultwarden

## Description

Plural will install Vaultwarden in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Vaultwarden for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install vaultwarden vaultwarden-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install vaultwarden vaultwarden-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install vaultwarden vaultwarden-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`hostname`: FQDN to use for your Vaultwarden installation

`signupDomains`: comma separated list of domains to allow for user signup



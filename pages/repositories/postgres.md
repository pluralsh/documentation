
# Postgres

## Description

Plural will install Postgres in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Postgres for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install postgres aws-postgres
{% /tab %}
{% tab title="AZURE" %}
plural bundle install postgres azure-postgres
{% /tab %}
{% tab title="EQUINIX" %}
plural bundle install postgres equinix-postgres
{% /tab %}
{% tab title="GCP" %}
plural bundle install postgres gcp-postgres
{% /tab %}
{% tab title="KIND" %}
plural bundle install postgres kind-postgres
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"

`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives



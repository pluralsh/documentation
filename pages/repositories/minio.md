
# Minio

## Description

Plural will install Minio in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Minio for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install minio minio-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install minio minio-azure
{% /tab %}
{% tab title="EQUINIX" %}
plural bundle install minio minio-equinix
{% /tab %}
{% tab title="GCP" %}
plural bundle install minio minio-gcp
{% /tab %}
{% tab title="KIND" %}
plural bundle install minio minio-kind
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





`minio_bucket`: bucket to store minio data

`hostname`: Fully Qualified Domain Name to use for your minio gateway installation, eg minio.topleveldomain.com if topleveldomain.com is the domain you inputed for dns_domain above.

`consoleHostname`: Fully Qualified Domain Name to use for your minio console installation, eg minio.topleveldomain.com if topleveldomain.com is the domain you inputed for dns_domain above.



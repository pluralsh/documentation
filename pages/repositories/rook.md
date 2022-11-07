
# Rook

## Description

Plural will install Rook in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Rook for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install rook rook-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install rook rook-azure
{% /tab %}
{% tab title="EQUINIX" %}
plural bundle install rook rook-equinix
{% /tab %}
{% tab title="GCP" %}
plural bundle install rook rook-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`hostname`: FQDN to use for your the Ceph Dashboard

`s3Hostname`: FQDN to use for your the S3 API endpoint



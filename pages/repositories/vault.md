
# Vault

## Description

Plural will install Vault in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Vault for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install vault vault-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install vault vault-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install vault vault-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`hostname`: FQDN to use for your Vault installation




# Mongodb

## Description

Plural will install Mongodb in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Mongodb for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install mongodb mongodb-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install mongodb mongodb-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install mongodb mongodb-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





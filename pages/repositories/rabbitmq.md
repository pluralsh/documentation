
# Rabbitmq

## Description

Plural will install Rabbitmq in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Rabbitmq for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install rabbitmq rabbitmq-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install rabbitmq rabbitmq-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install rabbitmq rabbitmq-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"






# Spark

## Description

Plural will install Spark in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Spark for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install spark spark-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install spark spark-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install spark spark-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





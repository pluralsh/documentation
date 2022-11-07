
# Reloader

## Description

Plural will install Reloader in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Reloader for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install reloader reloader-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install reloader reloader-azure
{% /tab %}
{% tab title="EQUINIX" %}
plural bundle install reloader reloader-equinix
{% /tab %}
{% tab title="GCP" %}
plural bundle install reloader reloader-gcp
{% /tab %}
{% tab title="KIND" %}
plural bundle install reloader reloader-kind
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





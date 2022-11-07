
# Growthbook

## Description

Plural will install Growthbook in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Growthbook for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install growthbook growthbook-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install growthbook growthbook-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install growthbook growthbook-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





`hostname`: the domain name for your growthbook instance

`apiHostname`: the domain name for the growthbook api (should be different from hostname)

`growthbookBucket`: bucket for your growthbook instance



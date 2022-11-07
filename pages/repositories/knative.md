
# Knative

## Description

Plural will install Knative in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Knative for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install knative knative-aws
{% /tab %}
{% tab title="GCP" %}
plural bundle install knative knative-gcp
{% /tab %}
{% tab title="AWS" %}
plural bundle install knative knative-operator-aws
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





`masterHostname`: the dns name to access the redis master (optional)

`replicaHostname`: the dns name to access your redis replicas (optional)

`tempoBucket`: Arbitrary bucket name to store the traces in, eg plural-tempo-traces

`kialiHostname`: FQDN to use for the Kiali installation





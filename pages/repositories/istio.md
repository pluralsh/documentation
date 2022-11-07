
# Istio

## Description

Plural will install Istio in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Istio for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install istio istio-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install istio istio-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install istio istio-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





`masterHostname`: the dns name to access the redis master (optional)

`replicaHostname`: the dns name to access your redis replicas (optional)

`tempoBucket`: Arbitrary bucket name to store the traces in, eg plural-tempo-traces

`kialiHostname`: FQDN to use for the Kiali installation



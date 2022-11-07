
# Ingress-nginx

## Description

Plural will install Ingress-nginx in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Ingress-nginx for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install ingress-nginx ingress-nginx-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install ingress-nginx ingress-nginx-azure
{% /tab %}
{% tab title="EQUINIX" %}
plural bundle install ingress-nginx ingress-nginx-equinix
{% /tab %}
{% tab title="GCP" %}
plural bundle install ingress-nginx ingress-nginx-gcp
{% /tab %}
{% tab title="KIND" %}
plural bundle install ingress-nginx ingress-nginx-kind
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





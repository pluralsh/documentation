
# Kubescape

## Description

Plural will install Kubescape in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Kubescape for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install kubescape kubescape-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install kubescape kubescape-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install kubescape kubescape-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"

`accountGuid`: Unique identifier connecting results to the Kubescape Cloud account. To learn more go here https://hub.armosec.io/docs/kubescape-cloud-account#account-id



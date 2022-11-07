
# Grafana

## Description

Plural will install Grafana in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Grafana for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install grafana aws-grafana
{% /tab %}
{% tab title="AZURE" %}
plural bundle install grafana azure-grafana
{% /tab %}
{% tab title="EQUINIX" %}
plural bundle install grafana equinix-grafana
{% /tab %}
{% tab title="GCP" %}
plural bundle install grafana gcp-grafana
{% /tab %}
{% tab title="KIND" %}
plural bundle install grafana kind-grafana
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`hostname`: FQDN to use for your grafana installation



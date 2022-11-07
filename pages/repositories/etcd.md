
# Etcd

## Description

Plural will install Etcd in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Etcd for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install etcd etcd-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install etcd etcd-azure
{% /tab %}
{% tab title="EQUINIX" %}
plural bundle install etcd etcd-equinix
{% /tab %}
{% tab title="GCP" %}
plural bundle install etcd etcd-gcp
{% /tab %}
{% tab title="KIND" %}
plural bundle install etcd etcd-kind
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





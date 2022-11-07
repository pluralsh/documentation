
# Crossplane

## Description

Plural will install Crossplane in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Crossplane for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install crossplane crossplane-aws
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





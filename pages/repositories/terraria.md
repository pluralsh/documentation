
# Terraria

## Description

Plural will install Terraria in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Terraria for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install terraria terraria-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install terraria terraria-azure
{% /tab %}
{% tab title="EQUINIX" %}
plural bundle install terraria terraria-equinix
{% /tab %}
{% tab title="GCP" %}
plural bundle install terraria terraria-gcp
{% /tab %}
{% tab title="KIND" %}
plural bundle install terraria terraria-kind
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"

`hostname`: domain on which you'd like to host your terraria server

`worldsize`: size of the world you would like to be generated (small|medium|large)

`password`: password that will be required when joining the server (leave empty to disable)

`restAPIEnabled`: if additional rest API should be enabled and exposed on port 7878 (Y/n)



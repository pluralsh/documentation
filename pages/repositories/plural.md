
# Plural

## Description

Plural will install Plural in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Plural for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install plural plural-aws
{% /tab %}
{% tab title="GCP" %}
plural bundle install plural plural-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`enableChronograf`: whether to deploy the chronograf web ui

`chronografHostname`: Fully Qualified Domain Name for the chronograf web ui

`enableKapacitor`: whether to deploy kapacitor alerting

`enableTelegraf`: whether to deploy telegraf metrics collection

`databaseName`: name for the initial bootstrapped database

`influxdbHostname`: external dns name for your influxdb instance (leave empty if you don't want ingress)

`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives



`chartmuseum_bucket`: Bucket for helm charts

`assets_bucket`: bucket for misc assets (docker imgs/terraform modules)

`images_bucket`: bucket for images and icons

`plural_dns`: FQDN to use for your plural cluster

`plural_dkr_dns`: None

`admin_name`: name for initial admin user

`admin_email`: email for initial admin user

`publisher`: name for initial publisher

`publisher_description`: description for initial publisher

`hydra_host`: the fqdn to use for hydra, for managing plural oauth



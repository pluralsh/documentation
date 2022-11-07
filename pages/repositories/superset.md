
# Superset

## Description

Plural will install Superset in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Superset for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install superset superset-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install superset superset-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install superset superset-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`hostname`: Fully Qualified Domain Name to use for your superset installation, eg airflow.topleveldomain.com if topleveldomain.com is the domain you inputed for dns_domain above.

`username`: short name/handle for the initial admin user

`name`: full name for the initial admin user

`adminEmail`: email for the initial admin user



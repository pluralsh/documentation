
# Mysql

## Description

Plural will install Mysql in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Mysql for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install mysql aws-mysql
{% /tab %}
{% tab title="AWS" %}
plural bundle install mysql aws-mysql-percona
{% /tab %}
{% tab title="GCP" %}
plural bundle install mysql gcp-mysql
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"

`backup_bucket`: bucket to store mysql backups in

`hostname`: FQDN to use for your accessing the mysql orchestrator



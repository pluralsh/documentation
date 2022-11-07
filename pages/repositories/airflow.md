
# Airflow

## Description

Plural will install Airflow in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Airflow for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install airflow airflow-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install airflow airflow-azure
{% /tab %}
{% tab title="GCP" %}
plural bundle install airflow airflow-gcp
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`airflowBucket`: Arbitrary bucket name to store the logs in

`hostname`: Fully Qualified Domain Name to use for your airflow installation, eg airflow.topleveldomain.com if topleveldomain.com is the domain you inputed for dns_domain above.

`dagRepo`: Git Repo url for storing dags, should be a ssh url like git@github.com:pluralsh/airflow-dags.git

`branchName`: The branch to sync from

`adminUsername`: The airflow username for the admin

`adminFirst`: The first name for the admin

`adminLast`: The last name for the admin

`adminEmail`: The email for the admin

`private_key`: path to the private key to use for git authentication

`public_key`: path to the public key to use for git authentication



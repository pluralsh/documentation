---
description: Open-source ELT platform.
---

# Airbyte

## Description

Plural will install Airbyte in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one
CLI command.

## Installation

We currently support this repository on the following infrastructure providers:

{% tabs %}

{% tab title="AWS" %}
```plural bundle install airbyte airbyte-aws```
{% endtab %}
{% tab title="GCP" %}
```plural bundle install airbyte airbyte-gcp```
{% endtab %}
{% tab title="Azure" %}
```plural bundle install airbyte airbyte-azure```
{% endtab %}
{% tab title="KinD" %}
```plural bundle install airflow airbyte airbyte-kind```
{% endtab %}

{% endtabs %}

## Setup Configuration

`wal_bucket`: Plural uses Postgres as the backing database for cluster information. We need to store the WAL logs
somewhere to backup and restore from. This configuration step is **not idempotent**, if you have to redo configuration
for any reason, you'll need to create a new bucket. Alternatively you can directly edit the `context.yaml` file to use
the existing bucket that you create in this step.

`airbyteBucket`: We want to store your Airbyte logs in a S3-like bucket for easy access. Use the default by pressing [Enter] unless it's
been used before. This configuration step is **not idempotent**, if you have to redo configuration
for any reason, you'll need to create a new bucket. Alternatively you can directly edit the `context.yaml` file to use
the existing bucket that you create in this step.

`hostname`: This will be where your Airbyte instance is hosted. Generally, use `airbyte.$YOUR_ORG_NAME.onplural.sh`.

`privateHostname`: This will be the hostname under which the Airbyte API will be accessible. As a suggestion, use `airbytedev.$YOUR_ORG_NAME.onplural.sh`.

`Enable plural OIDC`: Enabling Plural OIDC means that you won't need to worry about authenticating into this app if you're logged into Plural. We highly recommend this
as long as you don't have any specific security requirements.
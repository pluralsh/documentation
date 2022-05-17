---
description: A DAG-based, dependency-aware job scheduler.
---

# Airflow

## Description

Plural will install Airflow in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one
CLI command.

## Installation

We currently support this repository on the following infrastructure providers:

{% tabs %}

{% tab title="AWS" %}
```plural bundle install airflow aws-airflow```
{% endtab %}
{% tab title="GCP" %}
```plural bundle install airflow gcp-airflow```
{% endtab %}
{% tab title="Azure" %}
```plural bundle install airflow azure-airflow```
{% endtab %}
{% tab title="KinD" %}
```plural bundle install airflow kind-airflow```
{% endtab %}

{% endtabs %}

## Setup Configuration

`airflowBucket`: We want store our logs in a S3-like bucket for easy access. Use the default by pressing [Enter] unless it's 
been used before. This configuration step is **not idempotent**, if you have to redo configuration
for any reason, you'll need to create a new bucket. Alternatively you can directly edit the `context.yaml` file to use
the existing bucket that you create in this step.

`hostname`: This will be where your Airflow instance is hosted. Generally, use `airflow.$YOUR_ORG_NAME.onplural.sh`.

`dagRepo`: We'll need a preexisting GitHub repository to store the DAGs that you create and use in Airflow. Either create
one now or use an existing DAG repository. Then grab the SSH URL from the `Code` tab on the repo to use here.

`branchName`: If you have an existing DAG repository, you may want to sync your existing dags into and from a specific 
branch. This will be the branch that Plural stays up to date with, so use `main` unless you want to prevent direct changes
to the repository.

`wal_bucket`: Plural uses Postgres as the backing database for cluster information. We need to store the WAL logs
somewhere to backup and restore from. This configuration step is **not idempotent**, if you have to redo configuration
for any reason, you'll need to create a new bucket. Alternatively you can directly edit the `context.yaml` file to use
the existing bucket that you create in this step.

`adminUsername`: Use your naming preference for admin accounts. No need to reinvent the wheel, `admin` is fine too.

`adminFirst`: Use your relevant operator's first name or just use `admin`.

`adminLast`: Use your relevant operator's last name or just use `admin`.

`adminEmail`: Use your relevant admin operator's email address. This will the email used to manage the Airflow instance.

`private_key`: This makes sure that your admin account has Read/Write access to the DAG repo. We recommend you stick with the default, unless you have
compliance reasons for this file not existing here.

`public_key`: Similar to `private_key`, this makes sure that your admin account has Read/Write access to the DAG repo. We recommend you stick with the default, unless you have
compliance reasons for this file not existing here.

`git_user`: Plural will perform Git operations on your behalf to manage your config repository. Just use your GitHub
username here, unless you have a dedicated user for Ops.

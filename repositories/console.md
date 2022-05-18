---
description: A Plural admin console for monitoring and ops.
---

# Plural Console

## Description

Plural will install Console in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one
CLI command.

## Installation

We currently support this repository on the following infrastructure providers: 

{% tabs %}

{% tab title="AWS" %}
```plural bundle install console console-aws```
{% endtab %}
{% tab title="GCP" %}
```plural bundle install console console-gcp```
{% endtab %}
{% tab title="Azure" %}
```plural bundle install console console-azure```
{% endtab %}
{% tab title="Equinix" %}
```plural bundle install console console-equinix```
{% endtab %}
{% tab title="KinD" %}
```plural bundle install console console-kind```
{% endtab %}

{% endtabs %}

## Setup Configuration

`vpc_name`: We need an isolated VPC to launch your resources in, so we create one for you. Stick with `plural` for
most cases.

`wal_bucket`: Plural uses Postgres as the backing database for cluster information. Storing the Postgres WAL logs in a S3-like bucket is required for backup and restore operations.
Use the default by pressing [Enter] unless it's been used before. This configuration step is **not idempotent**, if you have to redo configuration
for any reason, you'll need to create a new bucket. Alternatively you can directly edit the `context.yaml` file to use
the existing bucket that you create in this step.

`console_dns`: This will be where your console is hosted. Generally, use `console.$YOUR_ORG_NAME.onplural.sh`.

`Enable plural OIDC`: Enabling Plural OIDC means that you won't need to worry about authenticating into this app if you're logged into Plural. We highly recommend this
as long as you don't have any specific security requirements.

## Auth Configuration

`git_user`: Plural will perform Git operations on your behalf to manage your config repository. Just use your GitHub
username here, unless you have a dedicated user for Ops.

`git_email`: Use the email tied to the account associated with `git_user`

`admin_name`: Use your naming preference for admin accounts. No need to reinvent the wheel, `admin` is fine too.

`private_key`: This makes sure that your admin account has Read/Write access to the config repo. We recommend you stick with the default, unless you have 
compliance reasons for this file not existing here.

`public_key`: Similar to `private_key`, this makes sure that your admin account has Read/Write access to the DAG repo. We recommend you stick with the default, unless you have
compliance reasons for this file not existing here.

`passphrase`: If you have encrypted your SSH key with a passphrase for extra security, you'll need to enter it here in order
for Plural to use it for Git operations.
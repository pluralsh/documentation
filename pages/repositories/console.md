
# Console

## Description

Plural will install Console in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation

We currently support Console for the following providers:

{% tabs %}

{% tab title="AWS" %}
plural bundle install console console-aws
{% /tab %}
{% tab title="AZURE" %}
plural bundle install console console-azure
{% /tab %}
{% tab title="EQUINIX" %}
plural bundle install console console-equinix
{% /tab %}
{% tab title="GCP" %}
plural bundle install console console-gcp
{% /tab %}
{% tab title="KIND" %}
plural bundle install console console-kind
{% /tab %}

{% /tabs %}

## Setup Configuration

`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"





`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`console_dns`: Fully Qualified Domain Name for the console dashboard, eg console.topleveldomain.com if topleveldomain.com is the hostname you inputed above.

`git_user`: git username for console to use in git operations, eg your github username

`git_email`: email for git operations by console

`admin_name`: name for the initial admin user

`repo_url`: the url to the remote git repo

`access_token`: github/gitlab access token to use for http git authentication

`private_key`: path to the private key to use for git authentication

`public_key`: path to the public key to use for git authentication

`passphrase`: passphrase to use for encrypted private keys (leave empty if not applicable)



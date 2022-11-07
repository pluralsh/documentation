
# Gitlab

## Description
Plural will install Gitlab in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Gitlab for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install gitlab aws-gitlab {% endtab %} {% tab title="GCP" %} plural bundle install gitlab gcp-gitlab {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`wal_bucket`: Arbitary name for s3 bucket to store wal archives in, eg plural-wal-archives

`registryBucket`: bucket name for gitlab registry

`artifactsBucket`: bucket name for gitlab artifacts

`uploadsBucket`: bucket name for gitlab uploads

`packagesBucket`: bucket name for gitlab packages

`backupsBucket`: bucket name for gitlab backups

`backupsTmpBucket`: bucket name for gitlab tmp backups

`lfsBucket`: bucket name for git large file storage

`runnerCacheBucket`: bucket name for gitlab runner cache

`terraformBucket`: bucket name for gitlab managed terraform state
    

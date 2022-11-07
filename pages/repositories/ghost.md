
# Ghost

## Description
Plural will install Ghost in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Ghost for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install ghost ghost-aws {% endtab %} {% tab title="AZURE" %} plural bundle install ghost ghost-azure {% endtab %} {% tab title="GCP" %} plural bundle install ghost ghost-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`backup_bucket`: bucket to store mysql backups in

`hostname`: FQDN to use for your accessing the mysql orchestrator

`ghostUser`: username for your initial ghost user account

`ghostEmail`: email address for the initial ghost user

`ghostDomain`: fully qualified domain name for the ghost blog instance

`blogTitle`: title for your ghost-powered blog
    

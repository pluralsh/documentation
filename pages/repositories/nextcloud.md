
# Nextcloud

## Description
Plural will install Nextcloud in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Nextcloud for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install nextcloud nextcloud-aws {% endtab %} {% tab title="AZURE" %} plural bundle install nextcloud nextcloud-azure {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"

`nextcloud_bucket`: bucket to store nextcloud data

`hostname`: FQDN to use for your nextcloud installation
    

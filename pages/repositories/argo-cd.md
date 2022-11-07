
# Argo-cd

## Description
Plural will install Argo-cd in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Argo-cd for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install argo-cd argo-cd-aws {% endtab %} {% tab title="AZURE" %} plural bundle install argo-cd argo-cd-azure {% endtab %} {% tab title="GCP" %} plural bundle install argo-cd argo-cd-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`masterHostname`: the dns name to access the redis master (optional)

`replicaHostname`: the dns name to access your redis replicas (optional)

`hostname`: FQDN to use for your Argo CD installation

`adminGroup`: OIDC group that should receive admin permissions

`credentialTemplateURL`: Domain for which to configure private repository credentials

`credentialUsername`: Username to access private repositories

`credentialPassword`: Password or Personal Access Token to access private repositories

`privateRepoName`: Name for the private repository to add

`privateRepoURL`: URL of the private repository

`enableImageUpdater`: Enable the Argo CD Image Updater
    

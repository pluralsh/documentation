
# Ray

## Description
Plural will install Ray in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Ray for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install ray ray-aws {% endtab %} {% tab title="AZURE" %} plural bundle install ray ray-azure {% endtab %} {% tab title="GCP" %} plural bundle install ray ray-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`hostname`: domain on which you'd like to host RAY's page
    

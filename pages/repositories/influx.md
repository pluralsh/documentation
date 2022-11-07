
# Influx

## Description
Plural will install Influx in a dependency-aware manner onto a Plural-managed Kubernetes cluster with one CLI command.

## Installation
We currently support Influx for the following providers:

{% tabs %}
{% tab title="AWS" %} plural bundle install influx influx-aws {% endtab %} {% tab title="AZURE" %} plural bundle install influx influx-azure {% endtab %} {% tab title="GCP" %} plural bundle install influx influx-gcp {% endtab %}
{% endtabs %}

## Setup Configuration
`vpc_name`: Arbitary name for the virtual private cloud to place your cluster in, eg "plural"



`enableChronograf`: whether to deploy the chronograf web ui

`chronografHostname`: Fully Qualified Domain Name for the chronograf web ui

`enableKapacitor`: whether to deploy kapacitor alerting

`enableTelegraf`: whether to deploy telegraf metrics collection

`databaseName`: name for the initial bootstrapped database

`influxdbHostname`: external dns name for your influxdb instance (leave empty if you don't want ingress)
    

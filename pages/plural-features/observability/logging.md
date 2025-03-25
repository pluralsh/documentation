---
title: ElasticSearch Configuration
description: Configure multi-cluster Log Aggregation with Plural
---

## What You'll Get

Plural's built-in log support allows you to query logs at either the Plural Service or Cluster level, dependent on your permissions to those respective resources.  Service logs are relevant for developer personas, whereas cluster logs are usually useful for platform engineers or kubernetes admins.

Our `Logs` tab features all the standard features like text-based search, facet filtering and time filtering, looking something like so:

![](/assets/getting-started/log-tail.png)


And you can tune the log view with the filter modal like:

![](/assets/getting-started/log-filters.png)


In addition to the single-pane-of-glass benefits, log data is an incredibly powerful tool for enhancing the dataset used by Plural AI, and so is highly recommended as an addition to a production deployment of Plural.

## Deploy out of our Service Catalog

Plural ships by default with a full [Service catalog](/plural-features/service-catalog) to easily deploy solutions across your stack, among them a setup of ElasticSearch + Logstach using to support robust multi-cluster log aggregation.  This has an additional benefit of also serving as a vector store for additional data used by our AI engine if you wish to enable that.  In total this will set up:

* ElasticSearch using the [ECK operator](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-deploy-eck.html)
* LogStach (also using ECK) to aggregate logs at the cluster level and ship them to the singular ElasticSearch Instance

{% callout severity="info" %}
The system is made to be modular, and can support other logging backends.  If you're interested in using another one, let us know and we'll add it to our roadmap!
{% /callout %}

To deploy out of our storage catalog, go to `Service Catalog` -> `devops` -> `elastic` and fill out the wizard, it should look something like this:

![prometheus-setup](/assets/observability/elastic-setup.png)

{% callout severity="warning" %}
We recommend using at least 100Gi for storage if you have a fairly large fleet, this is simply due to the log volume emitted by Kubernetes being quite large at the baseline.  ECK can very easily be tuned post-hoc if you size it too small as well.

Also be sure the cluster you're deploying to has a working ingress setup, since it'll assume external-dns + cert-manager are there to set up DNS and TLS.
{% /callout %}

The generated PR will have configured:

* a deployment of ElasticSearch to store log and vector data 
* Logstash for log extraction, filtering and remote shipping to elasticsearch
* the configuration of the setup in the `DeploymentSettings` CRD to register them with Plural

## Custom Resource Configuration

If you were to do this manually with an existing Prometheus setup, you'd need to manually wire configuration like the following:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: DeploymentSettings
metadata:
  name: global # this is a singleton resource that is always at this location
  namespace: plrl-deploy-operator
spec:
  prometheusConnection:
    host: https://{your-prometheus-url}
    user: plrl # or whatever user you'd want
    passwordSecretRef:
      name: basic-auth-prom
      key: password
```

## ElasticSearch as a Vector Store

One of the reasons we lean on ElasticSearh as a default log store is its a broadly usable data store with recent support for vector search.  When this is enabled, Plural AI can start doing the following:

* Vectorize and search historical Pull Requests (gathered from [establishing a SCM webhook](/getting-started/how-to-use/scm-connection#add-an-scm-provider-webhook))
* Vectorize and search historical alert resolutions
* ...and more coming soon!
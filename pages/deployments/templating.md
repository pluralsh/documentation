---
title: Service Templating
description: How to deploy and configure services in Plural
---

# Overview

Plural allows a number of different mechanism to template service configuration into your yaml before applying to the destination cluster. There are a few key usecases for this:

- injecting cluster-level configuration into a service, like IRSA role ARNS or other information needed to configure authentication to cloud services
- injecting Plural secrets into service manifests
- injecting information from other tools passed from service contexts

All templating is done via Shopify's [liquid](https://shopify.github.io/liquid/) template engine. It's a mature templating language with generally better documentation than go's native text/template. We also inject a subset of the Sprig library into the engine, you can see how it's configured [here](https://github.com/pluralsh/deployment-operator/blob/main/pkg/manifests/template/raw.go#L22).

It's important to know where templates can be applied and what data is available.

## Templatable files and Disabling templating

The following files can have liquid templating applied to them:

- yaml files in raw (non-helm/kustomize/etc) services
- helm values files ending in `.liquid`

If you don't want to apply templating at all, which is usually only necessary if your yaml has template strings embedded w/in them, you can set:

```yaml
spec:
  templated: false
```

on your ServiceDeployment spec to tell the deployment agent to bypass all templating on that service.

## Available Data

You will have the following data fields available for templating:

- `configuration` - a `map[string]string` which contains any secrets configured for that service
- `cluster` - a stripped down struct containing metadata about a cluster
- `contexts` - a `map[string]map[string]interface{}` containing a map of maps, keyed on context name. The contexts are usually created in other tools like terraform, and can be bound to a service by name. See our [docs](/deployments/terraform-interop) on terraform interoperability to learn more

You can access them using `{{ }}`. As an example, if you wanted to template a service secret into a kubernetes secret, it might look something like:

```yaml
apiVersion: v1
kind: Secret
stringData:
  MY_SECRET: { { configuration.secret } }
```

---
title: Pricing Calculator
description: >-
  Estimate the costs of using Plural to running the applications
  and configuration you need for your business with our Pricing Calculator.
---

{% calculator %}
{% /calculator %}

{% callout severity="info" title="How do we calculate cloud costs?" %}
By default, Plural deploys the following on a given provider:

- The Kubernetes control plane
- 3 nodes, each with 2 cores / 8GB

Each initial deployment has a certain amount of headroom for installing applications and will scale accordingly as more are added. Costs to Plural are calculated based on which plan is chosen; Plural Professional is priced by the number of users and clusters.
{% /callout %}

{% callout severity="info" title="What is a cluster?" %}
A cluster is a set of worker machines (called nodes) that run containerized applications. A single cluster can contain many different applications that work together to perform various workflows. A single cluster is often sufficient for getting started, but it can be beneficial in some circumstances to have multiple clusters running (e.g., a development and production cluster).
{% /callout %}

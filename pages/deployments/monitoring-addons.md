---
title: Monitoring Setup
description: Set up common monitoring agents
---

## Datadog

The `datadog` add-on will automatically install Datadog's onto a cluster for you. You can also create a global service to automate installing the agent throughout your fleet. It will ask for your datadog api and app keys, and automatically inject them into the agent. We'll also manage future upgrades of the agent so you don't have to.

Once the agent is installed, there are often additional features that need to be enabled to get the full Datadog ecosystem functioning. We recommend visiting their docs [here](https://docs.datadoghq.com/containers/kubernetes/installation/?tab=operator#next-steps)

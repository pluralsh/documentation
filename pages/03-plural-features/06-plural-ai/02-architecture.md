---
title: Plural AI Architecture
description: How Plural AI Works
---

## Overview

At its core, Plural AI has three main components:

* A causal graph of the high-level objects that define your infrastructure.  An example is this Plural Service owns this Kubernetes Deployment, which owns a ReplicaSet which owns a set of Pods.
* A permission engine to ensure any set of objects within the graph are interactable by the given user of Plural's AI.  This hardens the governance process around access to the completions for our AI.  The presence of Plural's agent in your Kubernetes fleet also makes the ability to query end-clusters much more secure from a networking perspective.
* Our PR Automation framework - this allows us to hook into SCM providers and automate code fixes in a reviewable, safe way.

In the parlance of the AI industry, you can think of it as a highly advanced RAG (retrieval augmented generation), with an agent-like behavior, since it's always on and triggered by any emergent issue in your infrastructure.

## In Detail

Here's a detailed walkthrough of how the AI engine works in the case of a Plural Service with a failing Kubernetes deployment.

1. The engine is told the service is failing from our internal event bus
2. The failing components of that service are collected, with the failing deployment selected first
3. The metadata of the service are added to the prompt (what cluster its on, how its sourcing its configuration, etc)
4. The events, replica sets, spec of the k8s deployment are queried and added to a prompt
5. The failing pods for the deployment are selected from the replica sets, and a random subset are queried individually
6. Each failing pods events and spec are added to the growing prompt

This will then craft an insight for the Deployment node, which can be combined with insights from any other components to collect to a service-level insight.

If this investigation were done again, we'd be able to cache any non-stale insights and prevent rerunning the inference a second time where it would be unnecessary.

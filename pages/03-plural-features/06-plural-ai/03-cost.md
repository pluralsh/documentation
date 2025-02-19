---
title: Plural AI Cost Analysis
description: How much will Plural AI cost me?
---

Plural AI is built to be extremely cost efficient.  We've found it will often heavily outcompete the spend you would use on advanced APM tools, and likely even DIY prometheus setups.  That said, AI inference is not cheap in general, and we do a number of things to work around that:

* Our causal knowledge graph heavily caches at each layer of the tree. This allows us to ensure repeated attempts to generate the same insight are deduplicated, reducing inference API calls dramatically
* You can split the model used by usecase.  Insight generation can leverage cheap, fast models, whereas the tool calls that ultimately generate PRs use smarter, advanced models, but are executed less frequently so the cost isn't felt as hard.
* We use AI sparingly.  Inference is only done when we know something is wrong.

That said, what does that actually mean?

## Basic Cost Analysis

We at Plural dogfood our own AI functionality in our own infrastructure.  This includes a sandbox test fleet of over 10 clusters, and a production fleet of around 5 clusters for both our main services and Plural Cloud.  Plural's AI Engine runs on the management clusters for each of these domains since launch, and while we might do a decent-ish job of caretaking those environments, or current daily OpenAI bill is $~2.64 per day, or roughly $81 per month.

This is staggeringly cost effective, when you consider a Datadog bill for our equivalent infrastructure is at minimum $10k, even a prometheus setup is well over 100/mo for the necessary compute including datastore, grafana, grafana's database, load balancers, and agents.  Granted, some of these services will ultimately be necessary to have Plural AI reach its full potential, but we could see a world where:

```sh
OpenTelemetry + Plural AI >> Datadog/New Relic
```

as a general debugging platform, while being a miniscule fraction of the current cost.
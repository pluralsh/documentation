---
title: Configure Against Multiple Providers
description: How to mix and match models to optimize cost and performance
---

The current state of GenerativeAI is a sprawl of vendors offering products with different specialties and price points, and its common to have an optimal AI setup involve usage of models across multiple different vendors or multiple models within the same vendor.  Plural provides a number of knobs that are designed to make that degree of customization seamless, and compatible w/in a GitOps workflow.

## Provider Selection within Plural AI

There are three main usecases where we can differentiate models:

1. High-volume insight inference - usually a smaller, cheaper model is the right choice here (gpt-4.1-mini for instance)
2. On-demand agentic, tool-calling - this is used in Plural AI chat, pr generation, and similar features within the platform.  Here a user very likely will want to use a capable model like Anthropic Claude Sonnet 4.5.
3. Embedding - Plural also consistently vector embeds your infra data derived from GitOps and data scraping.  Its possible you'll need to configure a dedicated embedding model provider if the base provider doesn't support it.

Often toggling these individual can give you the best cost/feature tradeoff for your usecase.

## Example Configuration

To tune your AI configuration, the recommended approach is to do it within a GitOps workflow using our `DeploymentSettings` Kubernetes CRD.  If you set up Plural with `plural up`, this will already be defined for you at `bootstrap/settings.yaml`.  Here's a basically complete example of how to configure its AI model settings:


```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: DeploymentSettings
metadata:
  name: global
  namespace: plrl-deploy-operator # this namespace is required
spec:
  ai:
    enabled: true
    provider: OPENAI # OPENAI gpt-4.1-mini for low-cost, high-volume
    embeddingProvider: OPENAI # openai has an embedding model built-in
    toolProvider: ANTHROPIC # anthropic for complex tool calling

    # example configurations of the various different AI providers supported, its not necessary to
    # configure all of them
    anthropic:
      model: claude-sonnet-4-5
      tokenSecretRef:
        name: ai-config
        key: anthropic

    openAI:
      tokenSecretRef:
        name: ai-config
        key: openai
      model: gpt-4.1-mini
      toolModel: gpt-4.1
    
    azure: 
      tokenSecretRef:
        name: ai-config
        key: azure
      endpoint: https://plural-openai.openai.azure.com/openai/deployments
      apiVersion: '2024-10-21'

    vertex:
      project: pluralsh-test-384515
      location: us-east5
      model: anthropic/claude-sonnet-4-5
      serviceAccountJsonSecretRef:
        name: ai-config
        key: vertex
```

{% callout severity="info" %}
All the secretRef's below reference a kubernetes secret defined like:

```yaml
apiVersion: v1
kind: Secret
metadata:
    namespace: plrl-deploy-operator
    name: ai-config
stringData:
  openai: ...
  anthropic: ...
  azure: ...
  vertex: ...
```
{% /callout %}

## Model Selection Logic

The model selected is generally a waterfall like so.

1. For a use-case demanding a tool-capable model:

| provider | tool model | default model |
|----------|------------|---------------|
| tool     | yes        | n/a          |
| tool     | no         | yes          |
| default  | yes        | n/a          |
| default  | no         | yes          |


2. For a high-volume usecase, the tool provider is ignored, and the table above is recognized for just the default provider usecases

3. For embedding model selection, the logic is:

| provider  | embedding model | default model |
|-----------|----------------|---------------|
| embedding | yes            | n/a           |
| embedding | no             | yes           |
| default   | yes            | n/a           |
| default   | no             | yes           |

(so very similar to the tool provider use-case)

## Recommendations

We've found decent success with the following combinations:

For OpenAI:

1. Any openai model above gpt-4.1-mini, but a tuned setup would chose gpt-4.1 or above for tools, and gpt-4.1-mini for the default
2. For embeddings, we default to `text-embedding-3-large`

For VertexAI:

1. High volume usecases with `gemini-2.5-flash` and tools with `anthropic/claude-sonnet-4-5` is a realistic combo.
2. You can use OpenAI as your embedding provider, or any of the Vertex embedding model's as well.

For Anthropic, its important to note they have no embedding model, so you'll always have to mix providers. This is a decent setup:

1. Configure `claude-sonnet-4-5` for tools (set as `toolProvider`)
2. OpenAI gpt-4.1-mini for volume, which is our default (it's cheaper than most anthropic models) (set as `provider`)
3. OpenAI `text-embedding-3-large` as your embedding model, which is our default, and would be selected as its the base provider.

{% callout severity="info" %}
Configuring a default model is usually optional, we chose sane defaults for all major providers.
{% /callout %}

## Learn More

You can see the full docs for this resource at our [Agent API docs](https://docs.plural.sh/overview/management-api-reference#deploymentsettingsspec)

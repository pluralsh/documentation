---
title: Setup Plural AI
description: How to configure Plural AI
---

Plural AI can easily be configured via the `DeploymentSettings` CRD or at `/settings/global/ai-provider` in your Plural Console instance.  An example `DeploymentSettings` config is below:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: DeploymentSettings
metadata:
  name: global
  namespace: plrl-deploy-operator
spec:
  managementRepo: pluralsh/plrl-boot-aws

  ai:
    enabled: true
    provider: OPENAI
    anthropic: # example anthropic config
      model: claude-3-5-sonnet-latest
      tokenSecretRef:
        name: ai-config
        key: anthropic

    openAI: # example openai config
      tokenSecretRef:
        name: ai-config
        key: openai

    vertex: # example VertexAI config
      project: pluralsh-test-384515
      location: us-east1
      model: gemini-1.5-pro-002
      serviceAccountJsonSecretRef:
        name: ai-config
        key: vertex
```

You can see the full schema at our [Operator API Reference](/deployments/operator/api#deploymentsettings).  

In all these cases, you need to create an additional secret in the `plrl-deploy-operator` namespace to reference api keys and auth secrets.  It would look something like this:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ai-config
  namespace: plrl-deploy-operator
stringData:
  vertex: <service account json string>
  openai: <access-token>
  anthropic: <access-token>
```

{% callout severity="warn" %}
Be sure not to commit this secret resource into your Git repository in plain-text, as that will result in a git secret exposure.

Plural provides a number of mechanisms to manage secrets, or you can use the established patterns within your engineering organization.
{% /callout %}
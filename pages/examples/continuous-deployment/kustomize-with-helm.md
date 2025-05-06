---
title: Extend a Helm chart with Kustomize and Liquid
description: 'Learn how to deploy WordPress using Helm and extend it with Kustomize and Liquid templates, combining the best of both worlds'
---
## Overview
In this guide, you'll learn how to deploy WordPress on your Kubernetes cluster using Plural with Helm and extend it with Kustomize and Liquid templates.
This approach combines the power of Helm for packaging applications with Kustomize for additional customization, giving you more flexibility
in managing your deployments. You'll see how to use Liquid templates to generate secrets and configuration values, making your
deployments more secure and maintainable.

## Prerequisites

Before you begin, make sure to cover [prerequisites and setup](../#prerequisites).

## Step-by-Step Guide: Deploying WordPress with Helm and Kustomize
Let's walk through deploying WordPress using Helm and extending it with Kustomize. Feel free to adjust provided file
examples according to your needs and commit them to your configured Git repository.

### Step 1: Create a GeneratedSecret resource
First, we'll create a `GeneratedSecret` resource to generate secure credentials for our WordPress deployment.

##### [apps/examples/kustomize-with-helm/generatedsecret.yaml.liquid](#TODO)
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: GeneratedSecret
metadata:
  name: plrl-04-wordpress-config
  namespace: examples
spec:
  destinations:
    - name: plrl-04-wordpress-config
      namespace: examples
  template:
    dbUser: admin
    dbPassword: '{{ "{{ 32 | randAlphaNum " }}}}'
    dbRootPassword: '{{ "{{ 32 | randAlphaNum " }}}}'
    dbReplicationPassword: '{{ "{{ 32 | randAlphaNum " }}}}'
    dbName: 'bitnami_wordpress'
    dbSecret: 'wordpress-mariadb'
    wordpressSecret: 'wordpress'
    wordpressPassword: '{{ "{{ 32 | randAlphaNum " }}}}'
```

### Step 2: Set up Helm values with Liquid templates
Now, let's set up Helm values with Liquid templates to customize the WordPress Helm chart.

##### [helm-values/plrl-04-wordpress.yaml.liquid](#TODO)
```yaml
service:
  type: ClusterIP
  auth:
    database: bitnami_wordpress
    username: admin
    existingSecret: wordpress-mariadb
```

### Step 3: Set up Kustomize for additional resources
Let's set up Kustomize to create additional resources that will complement our Helm deployment.

##### [services/examples/kustomize-with-helm/kustomization.yaml](#TODO)
```yaml
resources:
  - secret.yaml
```

##### [services/examples/kustomize-with-helm/secret.yaml.liquid](#TODO)
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: {{ configuration.dbSecret }}
stringData:
  mariadb-root-password: '{{ configuration.dbRootPassword }}'
  mariadb-replication-password: '{{ configuration.dbReplicationPassword }}'
  mariadb-password: '{{ configuration.dbPassword }}'
---
apiVersion: v1
kind: Secret
metadata:
  name: {{ configuration.wordpressSecret }}
stringData:
  wordpress-password: '{{ configuration.wordpressPassword }}'
```

### Step 4: Create a ServiceDeployment resource for Helm
Now, we'll create a ServiceDeployment resource that uses Helm to deploy WordPress.

##### [apps/examples/kustomize-with-helm/servicedeployment.yaml](#TODO)
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: plrl-04-wordpress
  namespace: examples
spec:
  repositoryRef:
    kind: GitRepository
    name: example
    namespace: examples
  git:
    folder: helm-values
    ref: main
  helm:
    url: oci://registry-1.docker.io/bitnamicharts
    chart: wordpress
    release: wordpress
    version: 24.x.x
    valuesFiles:
      - plrl-04-wordpress.yaml.liquid
  configurationRef:
    name: plrl-04-wordpress-config
    namespace: examples
  clusterRef:
    name: mgmt
    namespace: examples
```

### Step 5: Create a ServiceDeployment resource for Kustomize
Finally, we'll create a ServiceDeployment resource that uses Kustomize to deploy additional resources.

##### [servicedeployment-extras.yaml](#TODO)
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: plrl-04-extras
  namespace: examples
spec:
  repositoryRef:
    kind: GitRepository
    name: example
    namespace: examples
  git:
    folder: services/examples/kustomize-with-helm
    ref: main
  configurationRef:
    name: plrl-04-wordpress-config
    namespace: examples
  clusterRef:
    name: mgmt
    namespace: examples
```

### Step 6: Check Plural Console and access WordPress
After a couple of minutes, the service should be deployed and running. You can check the status in the Plural Console.

## Key Takeaways
Congratulations! You've just learned how to:
- Deploy WordPress using Helm
- Extend it with Kustomize for additional resources
- Generate secure credentials using GeneratedSecret
- Use Liquid templates to customize your deployment

This approach gives you more flexibility in managing your deployments, allowing you to:
- Use Helm for packaging and managing applications
- Use Kustomize for additional customization and resources
- Generate secure credentials and configuration values using Liquid templates
- Manage complex deployments with a clear separation of concerns

Need help? Join our community [Discord server](https://discord.com/invite/bEBAMXV64s) or check out more examples in our documentation.

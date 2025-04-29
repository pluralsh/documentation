---
title: Deploy basic helm chart with values file
description: 'Learn how to deploy a Grafana instance using Helm chart with configuration values stored in a separate values file, including ingress setup and TLS configuration'
---

## Overview

In this guide, you'll learn how to deploy Grafana (a popular monitoring tool) on your Kubernetes cluster using Plural.
We'll show you how to use Helm charts - think of them as pre-packaged applications - with configuration values stored in a separate values file.
This approach helps separate configuration from deployment logic, making it easier to manage complex deployments and track
configuration changes over time.

## Prerequisites

Before you begin, make sure you have:

- A Plural cluster set up with continuous deployment (CD) enabled
- A Git repository connected to your Plural setup (this is where we'll store our configuration files)
- Plural Console running on your cluster (this is the web interface we'll use to monitor our deployment)
- `cert-manager`, ingress controller and `externaldns` installed in the target cluster. Since we are using `mgmt` cluster, these should be already installed by default.

If you're missing any of these, check out {% doclink to="getting_started_first_steps" %}first steps{% /doclink %} first.

## Step-by-Step Guide: Deploying Grafana with External Values File
Let's walk through deploying Grafana using a Helm chart with an external values file. Feel free to adjust provided file
examples according to your needs and commit them to your configured Git repository under the `apps` directory. There is a
default `apps` service that deploys all resources from that directory.

### Step 1: Create a Cluster resource
First, we need to adopt a cluster that will serve as a target cluster where our application will be deployed. Normally,
the `mgmt` cluster should already exist in the `infra` namespace. We can however, adopt as many readonly clusters through
our custom resources as we want.

#### [cluster.yaml](#TODO)
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: Cluster
metadata:
  name: mgmt
  namespace: examples
spec:
  # providing only a handle allows us to adopt the existing cluster
  handle: mgmt
```

### Step 2: Create a GitRepository resource
Next, we need to create a GitRepository resource that will be used to read helm values file that service configuration
points to.

#### [gitrepository.yaml](#TODO)
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: GitRepository
metadata:
  name: example
  namespace: examples
spec:
  # This can point to your main infra repository used by the Plural CD engine
  # or to a different one. It will be used to store helm values file for our service.
  url: git@github.com:<your_example_repository>.git
```

### Step 3: Create a values file for your Grafana configuration
Create a separate values file to store your Grafana configuration. This approach keeps your configuration neatly separated from the deployment definition.

#### [plrl-02-grafana.yaml](#TODO)
```yaml
# Custom values for Grafana
ingress:
  enabled: true
  annotations:
    cert-manager.io/cluster-issuer: plural
  ingressClassName: nginx
  
  hosts:
    - grafana-test.your-domain.com

  tls:
    - hosts:
        - grafana-test.your-domain.com
      secretName: grafana-tls
```
### Step 4: Create a ServiceDeployment resource
Next, create your service deployment that references the external values file you just created.

#### [servicedeployment.yaml](#TODO)
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: plrl-02-grafana
  namespace: examples
spec:
  # GitRepository reference that points to a git repo where values file is stored
  repositoryRef:
    kind: GitRepository
    name: example
    namespace: examples
  git:
    # A directory in the git repository with the values file
    folder: helm-values
    ref: main
  helm:
    # Remote helm repository
    url: https://grafana.github.io/helm-charts
    # Chart within that repository that should be deployed
    chart: grafana
    # Version can use an exact version or 'x' to allow patch/minor/major version bumps without user interaction
    version: x.x.x  # Replace with your desired version or leave as is to always use the latest version
    # Reference to our external values file
    valuesFiles:
      # a relative path to the values file based on the configured git folder
      - plrl-02-grafana.yaml
  # A reference to the cluster resource instance we've created in the previous step
  clusterRef:
    kind: Cluster
    name: mgmt
    namespace: examples
```

### Step 5: Check Plural Console and access Grafana
After a couple of minutes, service should be deployed and running.
![](/assets/examples/plrl-02-grafana-1.png 'CD tab -> mgmt cluster -> plrl-02-grafana service')

Grafana should now be accessible at the configured address.
![](/assets/examples/plrl-01-grafana-2.png 'https://grafana-test.your-domain.com')

## Advantages of External Values Files
Using external values files offers several benefits:
1. **Separation of concerns** - Keep deployment logic separate from configuration
3. **Reusability** - Reuse the same values file for multiple deployments
4. **Security** - Store sensitive configuration in separate, properly secured files
5. **Readability** - Maintain cleaner, more organized deployment files

## Key Takeaways
Congratulations! You've just learned how to:
- Deploy an application (Grafana) using Helm charts in Plural
- Store and manage configuration in an external values file
- Connect your deployment to a specific cluster
- Set up secure access to your application with TLS (https)
- Monitor your deployment using Plural Console

This approach scales well for managing complex applications or multiple deployments. As your configuration grows, you can further organize your values files by splitting them into environment-specific versions or by application component.

Need help? Join our community [Discord server](https://discord.com/invite/bEBAMXV64s) or check out more examples in our documentation.

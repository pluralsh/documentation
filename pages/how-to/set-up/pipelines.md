---
title: Setting Up a Pipeline
description: Using Plural Deploy Pipelines
---

# Prerequisites

#### Ensure your _[app.plural.sh](https://app.plural.sh/profile/me)_ User has `admin` permissions  

```sh
plural login
```

# Set Up
Set Up a dev -> staging -> prod pipeline

include creation of the rest of the cluster fleet with stacks

include CRDs

use the prior microservice

# Troubleshooting
#### Get Kubeconfig for the MGMT Cluster
```sh
plural wkspace kube-init
```

Use `kubectl` with the newly added kube context  
The key namespaces to check are:   
* plrl-console
* plrl-deploy-operator
* plrl-runtime

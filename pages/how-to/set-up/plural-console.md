---
title: Setting Up Plural Console
description: How to Deploy the Plural Console to a MGMT Cluster
---

### Prerequisites
[Plural CLI](/how-to/set-up/plural-cli)  

### Deploy Plural Console  
The `plural cd control-plane` command creates the _`values.secret.yaml`_  
and we use `helm` to apply them to the cluster
```sh
plural login
# Note: If you deployed using bootstrap terraform you can get the PSQL connection string from running: terraform output --json
plural cd control-plane
helm repo add plrl-console https://pluralsh.github.io/console
helm upgrade --install --create-namespace -f values.secret.yaml console plrl-console/console -n plrl-console
```


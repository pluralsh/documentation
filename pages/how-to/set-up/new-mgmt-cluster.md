---
title: Setting Up a New MGMT Cluster
description: Using Plural CLI to Deploy a MGMT Kubernetes Cluster
---

### Prerequisites
[Plural CLI](/how-to/set-up/plural-cli)

##### Ensure AWS CLI Authentication
Plural uses the _default_ profile when deploying resources in AWS
```sh
aws sts get-caller-identity
```

### Create a New Repo for Plural
```sh
git clone git@github.com:pluralsh/plrl-how-to.git
cd plrl-how-to
```

### Setup Repo and Deploy Resources
Ensure your _[app.plural.sh](https://app.plural.sh/profile/me)_ User has `admin` permissions  
Follow the onscreen prompts to setup the repo and deploy resources  
* Use the provided Plural DNS Services for the MGMT Cluster
* When providing a domain name provide the _canonical_ name, e.g. how-to-plrl.onplural.sh
```sh
plural login
plural up
```

# Troubleshooting
### "Console failed to become ready"
Sometimes the DNS Resolution can take longer than the expected five minutes  
It's also possible the console services take a bit longer to become ready  
```sh
Apply complete! Resources: 5 added, 0 changed, 2 destroyed.

Outputs:

identity = "arn:aws:iam::312272277431:role/how-to-plrl-plrl-stacks"
Querying console.how-to-plrl.onplural.sh...
...
Querying console.how-to-plrl.onplural.sh...
DNS fully resolved, testing if console is functional...
Pinging https://console.how-to-plrl.onplural.sh...
...
Pinging https://console.how-to-plrl.onplural.sh...
2024/07/29 12:31:03 Console failed to become ready after 5 minutes, you might want to inspect the resources in the plrl-console namespace
```
This example is an EKS cluster  
I am able to get the _kubeconfig_ via the AWS CLI  
```sh
aws eks update-kubeconfig --name [cluster name] --alias [context name] 
```
I'm now able to use `kubectl` with the newly added kube context  
and see what's happening in all the _`plrl`_ namespaces  
The key namespaces to check are:   
* plrl-console
* plrl-deploy-operator
* plrl-runtime

In this instance I saw images in the _`plrl-console`_ namespace  
were taking a bit longer to download and initialize.  
Once the services were _up_ in the cli, I was able to access the console url

### User "someone@example.com" cannot list resource

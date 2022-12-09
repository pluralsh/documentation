---
title: Troubleshooting
description: >-
  Here is a non-exhaustive list of common issues or errors during the install or
  operation of Plural. If you see an error not listed here or get stuck in
  general, just hop into our Discord for help.
---

# Git Misconfigurations
### Could not compare workspace to origin
`Failed to get git information: Could not compare current workspace to origin, do you have an 'origin' remote configured, or does your repo not have an inital commit?`

This error either means you cannot push information to Git, or you do not have a remote branch set up to track your local one. Make sure you've added your SSH keys to Github and verify that your origin is set by running `git remote -v`.

### Out of date
`Your local workspace is not in sync with remote, either 'git pull' recent changes or 'git push' any missed changes.`

This error can happen if you're ahead of or behind your remote by a few commits, so try `git push` if `git pull` does not resolve the issue.


# Cloud Errors
### Google Credentials
`You don't have necessary services enabled. Please run: 'gcloud services enable serviceusage.googleapis.com cloudresourcemanager.googleapis.com container.googleapis.com' with an owner of the project to enable or enable them in the GCP console.`

Ensure that you've run the gcloud command in the correct project, and make sure you have owner rights.

### AWS Credentials
`Failed to get aws account (is your aws cli configured?)`

Ensure your AWS CLI is set up, that you have the correct profile chosen, and that you're authenticated in to AWS. If necessary, run `export AWS_PROFILE=<profile-name>` in the terminal you are running Plural in and auth in with `aws sso login`.


### IAM policy update 403 permission denied

You will see permission errors if your Cloud account does not have permissions to create the IAM roles needed by Plural. Apply the correct permissions to the user account that Plural is deploying as.

### Requested project not found

`Error 404: The requested project was not found., notFound`

If you are running `plural build` and encounter a `project requested not found` error it's possible that your application default credential is set to the wrong gcp project. Run:

```
gcloud auth application-default login
```

to reset the credential and reauthorize the browser for the correct project.

# Initialization Errors
### Workspace Initialization
`Your workspace hasn't been configured, try running 'plural init'`
`Could not find workspace.yaml file, you might need to run 'plural init'`



# Deployment Errors

### Invalid apiVersion for K8s

`error: exec plugin: invalid apiVersion "client.authentication.k8s.io/v1alpha1" error: exec plugin: invalid apiVersion "client.authentication.k8s.io/v1alpha1" exit status 1`

You might see this when attempting to sync crds or run helm commands in a run of `plural deploy`. It's due to legacy versions of the aws cli generating deprecated kubeconfigs, if you upgrade your cli and rerun `plural deploy` it should be able to proceed successfully.


### Failed deploy model

`Failed deploy model due to Internal error occurred: failed calling webhook "mtargetgroupbinding.elbv2.k8s.aws": Post "https://aws-load-balancer-webhook-service.bootstrap.svc:443/mutate-elbv2-k8s-aws-v1beta1-targetgroupbinding?timeout=10s"`

The aws load balancer controller webhook is not fully reliable, if you see that it's just a matter of recreating the webhook which you can do with:

```
kubectl delete validatingwebhookconfiguration aws-load-balancer-webhook -n bootstrap
plural bounce bootstrap
```

### Error acquiring state lock
`Terraform acquires a state lock to protect the state from being written by multiple users at the same time. Please resolve the issue above and try again.`

If your deploy is interrupted, it's possible terraform state gets confused. To fix this, you'll need to:

```
cd <app-name>/terraform
terraform force-unlock <lock-id>
```

You should be able to find the state lock id from the error message. Terraform stacks for each app are located in a standard terraform folder each time.

### May not specify more than one provider type

If you are running `plural deploy` and encounter the error below there may be stale state from the previous install.

```
Error: UPGRADE FAILED: cannot patch "letsencrypt-prod" with kind ClusterIssuer: admission webhook "webhook.cert-manager.io" denied the request: spec.acme.solvers[0].dns01.route53: Forbidden: may not specify more than one provider type
```

Run:

```
helm del bootstrap -n bootstrap
plural deploy
```

### Error reading route table association

`error reading Route Table Association () : Empty result`

This is a possible terraform race condition where the route tables think they're being read before they've been created, but in fact, they have already been created. As a temporary fix, just wait some time and rerun the deploy:

```
plural deploy
```

### Cloud resource limits exceeded

It's possible plural will deploy resources that exceed your cloud limits. In general the most pessimistic of these are load balancer limits and VPC limits. Be sure you have headroom in both those dimensions. This can lead to terraform state corruption, in which case you'll need to do something along the lines of for all resources missing from your terraform state:

```
cd application-name/terraform
terraform import path_to_terraform_resource resource_id
```

If you devise a better way to recover crashed terraform state, please give us a shout in our [Discord](https://discord.gg/pluralsh). We'd love to automate this better.



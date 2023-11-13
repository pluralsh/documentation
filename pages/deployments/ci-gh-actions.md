---
title: Github Actions Example
description: Call Plural CD from a simple Github Actions workflow
---

## Overview

We've built a basic FastApi [example app](https://github.com/pluralsh/plrl-cd-demo) to demonstrate how to easily integrate Plural Deployments with Github actions. The app itself just has a single api to echo it's current git commit. As far as the Github Actions setup, it is a fairly representative pipeline that does:

- a quick unit test to check correctness
- builds a docker image (using the docker/setup-metadata action for tagging).
- takes the sha tag from the deployed image and applies it to our example Plural service

Here's a link to the example [code](https://github.com/pluralsh/plrl-cd-demo). The README there is pretty thorough and worth diving, but we can give the tldr here.

This model allows you to let your CI system what it does best, test code and build deployable artifacts, and then allow our CD solution to handle the longer duration and security-intensive task of deployment from there.

## Kubernetes Manifest setup

The manifests for the service are defined at `/kubernetes`. It's a fairly simple service with a `Deployment`, which runs 2 replicas of the api server, a `Service` which sets up internal network access to the server pods, and an `Ingress`, which sets up external load balancing to that service and also configures dns + tls certificates through integration with external-dns and cert-manager. There is also templating built-in to allow the service to be parameterized by `hostname` and by `tag`. These are stored as service secrets.

## Actions Setup

The action is defined at `.github/workflows/push.yaml`. The final step of the workflow calls the `plural cd services update` command that rewires the service to use the current sha. The command in longform is:

```sh
plural cd services update @{cluster-handle}/{service-name} --conf {name}={value} --conf {name2}={value2} ...
```

Feel free to run `plural cd services update --help` for more documentation as well.

## Addendum

Since the plural cli is a standalone go binary, it can easily be injected in any CI framework in much the same way by installing it and the executing the appropriate cli command to modify your service once a deployable artifact has been built.

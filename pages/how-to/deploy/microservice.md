---
title: Setting Up an Example Micro Service
description: Deploying a basic Microservice to a cluster managed by Plural
---

# Overview

Now that you have a few clusters up, you'll likely want to start deploying real workloads into them.  This will show you a relatively basic usecase with an example repo we've created at https://github.com/pluralsh/plrl-cd-demo.git.

You will:
* add a new git repository to your Plural Console
* deploy a service to a workload cluster with a git hosted helm chart.

It's worth noting you can put the helm repository in any repo, it doesn't have to be the application repo.  You can also create your own helm repository using OCI or Github Pages, and source charts from there.

## Add the Application's Git Repository

To deploy anything, you need to have a repository to source yaml manifests from.  We'll just use a basic Git repository, done by adding to `bootstrap/repositories/cd-demo.yaml`:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: GitRepository
metadata:
  name: cd-demo
spec:
  url: https://github.com/pluralsh/plrl-cd-demo.git
```

The example repo is public, if yours requires authentication, you can backfill the auth information in the UI, or a simple way to check it all into Git is reference an `SCMConnection` that can provide repository read permissions, like so:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: GitRepository
metadata:
  name: cd-demo
spec:
  url: https://github.com/pluralsh/plrl-cd-demo.git
  scmConnectionRef:
    name: github
    namespace: infra
```

{% callout severity="info" %}
`scmConnectionRef` requires that you use an `https` git url
{% /callout %}


## Add a ServiceDeployment to point to that Git Repository

You'll also want to register a new service deployment for this `cd-demo` repository, that can be done by writing to `bootstrap/cd-demo/dev.yaml`:

```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ServiceDeployment
metadata:
  name: cd-demo-dev
  namespace: infra
spec:
  namespace: cd-demo
  git:
    folder: helm # this is where the helm chart is located in the git repository
    ref: main
  repositoryRef:
    kind: GitRepository
    name: cd-demo
    namespace: infra
  helm:
    values:
      image:
        repository: ghcr.io/pluralsh/plrl-cd-test
        tag: latest # VERSION
  clusterRef:
    kind: Cluster
    name: plrl-how-to-workload-00-dev # replace this with whatever you might have named your dev cluster
    namespace: infra
```

## Push to Deploy

We registered all these manifests under the root `bootstrap` folder a `plural up`-derived management cluster listens to by default, so all you should need to do is either:

```sh
git commit -m "setup example microservice"
git push
```

or create a PR, approve it, and merge to have this new service deploy.  

{% callout severity="info" %}
You might need to wait a minute or two for the system to poll git and realize there's a new change.
{% /callout %}
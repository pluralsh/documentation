---
title: Introduction
description: >-
  Plural empowers you to build and maintain production-ready applications on
  Kubernetes in minutes with no management overhead.
---

## What is Plural?

Plural is a self-hosted, open-source, unified application deployment platform that deploys your selected applictions into a Kubernetes cluster in the cloud provider of your choice. Plural acts as:

- An infrastructure provisioner, spinning up new clusters as needed
- A continuous deployment solution, allowing you to deploy your services across environments
- A single pane of glass for complete visibility into what's deployed where
- An open-source marketplace to deploy 3rd party software into your clusters

Plural leverages Cluster API, Helm, Terraform, and YAML to create your desired infrastructure. Spinning up a first cluster is as easy as running `plural build`, and all configuration within your Plural Git repository is fully ejectable from the platform and ecosystem.

![](/assets/introduction/introduction-marketplace.png)
![](/assets/deployments/deployment-services.png)

**Some key features of the platform include:**

- Bundled infrastructure provisioning and application deployment
- Automated upgrades for open-source software
- Cross-tool dependency management
- GitOps workflow with batteries-included transparent secret encryption
- Built on common open-source tools, so if you don't like us, you can always eject your application from Plural and use it as you please.

Notably, we support bringing your own Kubernetes cluster for our continuous deployment workflows.

## Deployment Options

### Plural CLI

This is the current standard deployment method. Click below for a quickstart to managing configuration locally.

- [Quickstart: Using the Plural CLI on your Machine](/getting-started/quickstart)

### Plural Cloud Shell

We have created a Cloud Shell with all of the tools and dependencies needed to run Plural. This is available [here](https://app.plural.sh/shell) to try out. If you want to **try out Plural without entering cloud credentials**, we offer a demo environment of our Plural Console that you can access [here](https://www.plural.sh/demo-login).

- [Using our in-browser Cloud Shell](/getting-started/cloud-shell-quickstart)

If you need support getting your Plural deployment up and running, join the [Plural Discord here!](https://discord.gg/pluralsh)

## Architecture

The Plural architecture has three main components:

- Plural Console for management of all applications on your infrastructure
- Plural API and Catalog site (available at [https://app.plural.sh](https://app.plural.sh))
- Plural CLI and Git SCM to maintain the state of a user's applications

### Plural Console

The Plural Console is the operational hub for all applications managed by Plural. It is deployed in-cluster alongside applications and provides a few key features:

- Horizontally scalable Git cache - we should be able to ingest as many git repos as you'd like and auto-shard them throughout your cluster automatically and efficiently.
- Configuration Management - supports re-configurable backends, but allows you to easily parameterize services with information like hostnames, docker image tags, and other secret and non-secret information.
- Auth Proxy - this is a secure bidirectional grpc channel initiated by a deployment agent used to make kubernetes api calls no matter where a cluster may live and give you full dashboarding capabilities from the Plural CD UI.
- Cluster API Providers - Plural CD natively integrates with cluster api and allows you to create and manage new clusters at scale and fork your own kubernetes cluster APIs on top of existing setups for services like EKS, AKS and GKE or on-prem solutions like Rancher
- Support - in-person support can be handled in our chat interface available directly in the admin console, with a lot of nice features like direct zoom integration

It's deployed as a highly available, scalable web service, with postgres as its datastore. It also directly integrates with Plural's OIDC for login and user management.

See our [Plural CD Architecture page](/deployments/architecture) for more information

### Plural API

The primary responsibility of the Plural API is to store the packages needed for open-source application installation - terraform, helm - and ingesting high-level dependency information about them. This allows us to properly sequence installations. It also serves as a publish-subscribe layer to communicate updates to clusters that have installed those applications, and can leverage the dependency information ingested to delay updates until a cluster has caught up with all the necessary dependencies.

It also can serve as an identity provider for any Plural application, delegating authentication via OIDC and also maintaining user group info and communicating it down to applications.

### Plural CLI

The Plural CLI can be used for interaction with the Plural API and Plural Console. The CLI effectively uses the Plural API as a package manager, and works as a higher level build tool on top of the DevOps packages it supports.

It also is responsible for managing secret encryption of all application state in plural installation repos and provides a few useful tools for troubleshooting an application our admin console might not be well-suited to solve.

Finally it also provides the toolchain for publishing applications to the plural API.

## Docs Translations

### Japanese

The wonderful team at [St-Hakky](https://www.about.st-hakky.com/) has translated most of our docs to Japanese on their website. To view the [translated docs, click here](https://book.st-hakky.com/docs/plural-overview).

St-Hakky のすばらしいチームが、ウェブサイトでほとんどのドキュメントを日本語に翻訳してくれました。 翻訳されたドキュメントを表示するには、ここをクリックしてください。

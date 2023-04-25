---
title: Introduction
description: >-
  Plural empowers you to build and maintain production-ready applications on
  Kubernetes in minutes with no management overhead.
---

## What is Plural?

Plural is an open-source, unified, application deployment platform that stands up a Kubernetes cluster and selected applications in the cloud provider of your choice. Plural stores your infrastructure code and configuration in a fresh Git repository of your choosing, which we refer to as a Plural [workspace](/getting-started/manage-git-repositories/your-plural-workspace).

Plural writes all the Helm, Terraform, and YAML needed for your desired infrastructure with `plural build`, and deploys it all into production with `plural deploy`. All configuration within your Plural Git repository is fully ejectable from the platform and ecosystem.

![](/assets/introduction/introduction-marketplace.png)

**Some key features of the platform include:**

- Automated Upgrades
- Cross-tool dependency management
- GitOps workflow with batteries-included transparent secret encryption
- Built on common open source tools, so if you don't like us, you can always eject your application from Plural and use it as you please.

Notably, we **do not** support bringing your own Kubernetes cluster yet, but it's on our roadmap.

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

- Plural API and Catalog site (available at [https://app.plural.sh](https://app.plural.sh))
- Plural CLI and Git SCM to maintain the state of a user's applications
- Plural Console for management of all plural applications on your infrastructure

At a high level, the interactions between all three components look something like this:

![](/assets/reference/architecture.png)

### Plural API

The primary responsibility of the Plural API is to store the packages needed for application installation - terraform, helm - and ingesting high-level dependency information about them. This allows us to properly sequence installations. It also serves as a publish-subscribe layer to communicate updates to clusters that have installed those applications, and can leverage the dependency information ingested to delay updates until a cluster has caught up with all the necessary dependencies.

It also can serve as an identity provider for any Plural application, delegating authentication via OIDC and also maintaining user group info and communicating it down to applications.

### Plural CLI

The Plural CLI effectively uses the Plural API as a package manager, and works as a higher level build tool on top of the DevOps packages it supports. It will handle things like running installations in dependency order, detecting changes between runs, and templating out a workspace from scratch.

It also is responsible for managing secret encryption of all application state in plural installation repos and provides a few useful tools for troubleshooting an application our admin console might not be well-suited to solve.

Finally it also provides the toolchain for publishing applications to the plural API.

### Plural Console

The Plural Console is the operational hub for all applications managed by Plural. It is deployed in-cluster alongside applications and provides a few key features:

- Automated upgrades - by subscribing to the API's upgrade websocket
- Observability - leveraging the dashboard and logging Kubernetes CRDs deployed alongside Plural applications
- Support - in-person support can be handled in our chat interface available directly in the admin console, with a lot of nice features like direct zoom integration

It's deployed as a highly available, scalable web service, with postgres as its datastore. It also directly integrates with Plural's OIDC for login and user management.

## Docs Translations

### Japanese

The wonderful team at [St-Hakky](https://www.about.st-hakky.com/) has translated most of our docs to Japanese on their website. To view the [translated docs, click here](https://book.st-hakky.com/docs/plural-overview).

St-Hakky のすばらしいチームが、ウェブサイトでほとんどのドキュメントを日本語に翻訳してくれました。 翻訳されたドキュメントを表示するには、ここをクリックしてください。

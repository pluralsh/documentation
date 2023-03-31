---
title: Concepts
description: >-
  A brief overview of concepts used throughout our docs.
---

## Components

Plural deploys open-source third party `applications` into a net new `cluster` in your cloud environment. You can browse a list of all available applications in the Plural [Marketplace](https://www.plural.sh/marketplace). Plural uses [Terraform](https://www.terraform.io/) to create and manage the cluster, and uses an application’s [Helm charts](https://helm.sh/docs/topics/charts/) to deploy and update that application.

All the necessary configuration for an individual cluster and its applications is stored in an `installation repository` in your Github or Gitlab account that’s created at the time of deployment.

Each application has a set of `packages` that encompasses the application’s Helm charts, Terraform, and Docker images necessary to install and manage that application. These packages are stored in a `repository`, and a user can install that repository and the set of packages within.

A `bundle` is a collection of packages that we automate the installation and configuration of that’s specific to a cloud provider. `Stacks` are collections of bundles (i.e., a one-shot installation of a set of applications with a guided configuration experience).

An `installation` is a specific deployment of an application onto a cluster. As an example, an organization can have multiple installations of the same application on different clusters.

Plural `OIDC` (OpenID Connect) is a form of [SSO](https://www.onelogin.com/learn/how-single-sign-on-works) that enables Plural users to add an authentication layer on top of any apps they deploy with Plural. Instead of using the application's normal login screen, you are instead prompted to login with Plural. This login is connected to your login at [app.plural.sh](https://app.plural.sh/?__hstc=156969850.241daab91cb4e8e8e57fdd6f2b1266f5.1675451782881.1680120796944.1680203822803.30&__hssc=156969850.1.1680203822803&__hsfp=646352474).

## Environment

The Plural `Cloud Shell` is an in-browser alternative to running the Plural CLI that provides a hosted interactive terminal for you to deploy and manage clusters. All CLI commands will work in the Cloud Shell, and currently each Cloud Shell instance is tied to a single cluster and account.

The Plural `CLI` is a command line interface that can be used to run all Plural commands locally.

The `Console` is a web application created by Plural that runs within a cluster deployed by Plural. The Console serves as a control panel for all your Plural applications by managing automated upgrades delivered from the Kubernetes API, showing application metrics and logs, serving as a built-in K8s dashboard, and being the touchpoint for incidents which can be filed with the owner of an application.

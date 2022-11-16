---
title: Update an Application
description: How to update an application's version.
---

## How to update your applications

You can set your installed applications up to receive updates by clicking the gear in the top-right corner of the application's detail page in the Plural app. You can find your installed applications at https://app.plural.sh/installed.

![](</assets/operations/update-application.png>)

## How Plural updates app versions

We use a tool called [Renovate](https://github.com/renovatebot/renovate) to automate the updating of application version images. Renovate creates pull requests against our plural-artifacts GitHub repository to perform these updates on a regular basis. [Here](https://github.com/pluralsh/plural-artifacts/pull/236) is an example of one of those PRs.

Once we have tried out the changes and have confirmed that the new version is stable, we will merge the PR and the change will be available for all Plural installations to pull down when they wish to.

Occasionally, we do manually update these versions to pull in application changes more quickly. If a current version is breaking user workflows or if a new version of an application is heavily requested, we will manually perform this operation.
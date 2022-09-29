---
description: Configuring your version control management to work with Plural.
---

# Setting up GitOps

## Overview

Plural defines all of your infrastructure as code, using Helm, Terraform, and YAML files to denote what is being deployed into your cloud provider or on-prem environment. To manage versioning safely, we use a GitOps practice that requires you to store these files in their own Git repository.&#x20;

If you are using the [**Plural Cloud Shell**](https://app.plural.sh/shell), we handle setting this up for you.

{% hint style="info" %}
Currently we're limited to a one cluster to one repo mapping, but eventually that will be relaxed. We also strongly urge users to store installations in a fresh, separate repository to avoid our automation trampling existing files.
{% endhint %}

Plural currently supports the following version control providers:

* [GitHub](https://github.com/)
* [GitLab](https://about.gitlab.com/)

Support for the following providers is on our roadmap:

* [Bitbucket](https://bitbucket.org/product/)
* [Mercurial](https://www.mercurial-scm.org/)

## Setting up a Git Repository for Plural

You have two options when setting up a Git repository for use with a Plural workspace:

* Use Plural OAuth by running `plural init` anywhere. (_Recommended_)
* Set up an empty, configured Git repository beforehand.

Let's go over both options.

### Using Plural OAuth

To have Plural set up your Git repository, you'll just need to have SSH set up with your version control provider. Then, run:

```bash
plural init
```

This will kick off the process of setting up your Plural workspace. Once you've gone through a few setup steps, you'll get the following prompt:\
**`? you're attempting to setup plural outside a git repository. would you like us to set one up for you here?`**` ``(Y/n)`

Enter `Y`, pick your version control provider of choice, and you will receive an OAuth screen to let Plural create and manage repositories on your behalf. Note, Plural can only manage repositories that it has created.

If everything goes well, it should look like this:

![](<../.gitbook/assets/Screen Shot 2022-07-27 at 5.11.01 PM.png>)

### Manual Git Setup

To set up a Git repository yourself, you'll need a fresh repository with the following requirements:

* Cloned with SSH
* Must have an initial commit
* Must be in sync with the upstream/origin repository

If the requirements aren't fulfilled, you'll hit an error in the `plural init` setup process. To get started, follow these steps:

1. &#x20;Go to your version control provider and create a fresh repository.&#x20;
2. Clone the repository to the machine that you'll be running the Plural CLI on.
3. Make sure that the repository has an initial commit (a README works). GitHub and GitLab provide the option to add an initial commit on creation, so choose that.
4. Run `plural init` from the root of the repository.

And you should be good to go!

## GitOps Best Practices

Plural has three basic steps to the deploy process:

1. **Install a bundle**: `plural bundle install <bundle-name> <bundle-provider>`
2. **Build your configuration**: `plural build`
3. **Deploy your configuration**: `plural deploy`&#x20;

When Step 2 (`plural build`) is completed, you'll notice all of your new configuration has been created in your local repository. In this state, the files are not yet committed or pushed up to your origin repository.

You can manually commit and push the files yourself, _**but we recommend**_ using the `--commit` CLI argument when running `plural deploy`:&#x20;

```
plural deploy --commit "deploying console and dagster"
```

This will commit and push up your configuration changes for you to your origin repository, using the commit message you've specified.&#x20;

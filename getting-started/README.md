ß---
description: Setting up your first cluster in your terminal.
---

# Quickstart (CLI)

## Overview

This is a guide on how to get Plural running on your own machines using our CLI. If you prefer an in-browser Cloud Shell experience with all the dependencies loaded, check out our quickstart guide [here](cloud-shell-quickstart.md).

## 1. Install Plural CLI and dependencies

The Plural cli and dependencies are available using a package manager for your system. For Mac, we recommend using Homebrew, although our Docker image should be usable on virtually any platform

{% tabs %}
{% tab title="Mac" %}
```
brew install pluralsh/plural/plural
```

The brew tap will install plural, alongside terraform, helm and kubectl for you. If you've already installed any of those dependencies, you can add `--without-helm`, `--without-terraform`, or `--without-kubectl`
{% endtab %}

{% tab title="curl" %}
You can download the binaries attached to our github releases here: [https://github.com/pluralsh/plural-cli/releases](https://github.com/pluralsh/plural-cli/releases). There will be binaries for linux, windows, and mac and all compatible platforms.

For example, you can download v0.2.57 for Darwin arm64 via:

```
curl -L -o plural.tgz 'https://github.com/pluralsh/plural-cli/releases/download/v0.2.57/plural-cli_0.2.57_Darwin_arm64.tar.gz'
tar -xvf plural.tgz
chmod +x plural
mv plural /usr/local/bin/plural
```



{% hint style="info" %}
Be sure to download the CLI version for your target OS/architecture, the above example is only valid for ARM Mac's
{% endhint %}



You will still need to ensure helm, terraform and kubectl are properly installed, you can find installers for each here\\

| Tool      | Installer                                                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------------------- |
| helm      | [https://helm.sh/docs/intro/install/](https://helm.sh/docs/intro/install/)                                                 |
| terraform | [https://learn.hashicorp.com/tutorials/terraform/install-cli](https://learn.hashicorp.com/tutorials/terraform/install-cli) |
| kubectl   | [https://kubernetes.io/docs/tasks/tools/#kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)                         |
{% endtab %}

{% tab title="Docker" %}
We offer a docker image with the plural cli installed along with all cli dependencies: terraform, helm, kubectl, and all the major cloud clis: gcr.io/pluralsh/plural-cli:0.1.1-cloud. We also provide a decent configuration of zsh in it, so you can drive the entire plural workflow in an interactive session. The best strategy is probably to mount the config dir of the cloud provider you're using, like (\~/.aws), in the docker run command:\\

```
docker run -it --volume $HOME/.aws:/home/plural/aws \
               --volume $HOME/.plural:/home/plural/.plural \ 
               --volume $HOME/.ssh:/home/plural/.ssh \
               --volume $HOME/<path-to-installation-repo:/home/plural/workspace \ # optional if you want to manage git via a volume
    gcr.io/pluralsh/plural-cli:0.1.1-cloud zsh
```

Once you're in the container's zsh, you'll want to clone the repo you'll use for your installations state there, or alternatively you can clone it outside your container and mount another volume pointing to it.
{% endtab %}

{% tab title="EC2 AMI" %}
We have EC2 AMI's with plural cli installed, along with all cloud provider clis, terraform, helm and kubectl for those interested in creating a remote environment. A registry of the AMIs can be viewed here: [https://github.com/pluralsh/plural-cli/blob/master/packer/manifest.json](https://github.com/pluralsh/plural-cli/blob/master/packer/manifest.json)\\

If there's interest in images for GCP and Azure, please to give us a shout in our discord or feel free to open a github issue.

This doc gives more details on launching AMIs if you are unfamiliar: [https://aws.amazon.com/premiumsupport/knowledge-center/launch-instance-custom-ami/](https://aws.amazon.com/premiumsupport/knowledge-center/launch-instance-custom-ami/). You'll want to select "Public images" within the ami search bar and you can use the ami id embedded in the `artifact_id` in our manifests, eg `ami-0249247d5fc865089`. Be sure to chose the one for the appropriate region.
{% endtab %}
{% endtabs %}





## 2. Install and Configure Cloud Provider CLI

You should now install and configure your cloud provider cli ([awscli](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html), [gcloud](https://cloud.google.com/sdk/docs/install), [az](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)) if you have not done so already. This is also a good time to take care of some cloud setup tasks from your provider's console. Follow the provider-specific instructions below.

{% tabs %}
{% tab title="GCP" %}
* Follow the instructions [here](https://cloud.google.com/sdk/docs/install) to install the gcloud cli.
* Verify that the cli has been added to your `$PATH`
* Create a new project in gcp via the cli:

```
gcloud projects create example-project-name
```

* [Enable the Kubernetes Engine API](https://cloud.google.com/kubernetes-engine/docs/quickstart) for the project you just created.
* [Enable the Google DNS API](https://excelnotes.com/enable-cloud-dns-api/) for the project you just created.
* Run `gcloud init` and follow the prompts to configure the gcloud cli and connect it to the project you just created.
* Verify that your cli has been properly configured. It should look something like this. Make sure that your active configuration is set to the project you just created.

```
> gcloud config list
[compute]
region = us-east1
zone = us-east1-b
[core]
account = yirenlu92@gmail.com
disable_usage_reporting = True
project = example-project-name

Your active configuration is: [example-project-name]
```

* If you have multiple projects in GCP and previously have configured your gcloud cli to point to a different project, run

```
gcloud auth application-default login
```

to reset the application default credential and re-authorize the browser. Failure to do this could result in `project requested not found` errors further along.
{% endtab %}

{% tab title="AWS" %}
* Follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) to install your AWS cli.
* Verify that the cli has been added to your `$PATH`
* Follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) to configure your cli and connect it to your aws console
* Verify that your cli has been properly configured by running

```
aws configure list
```

* You should see a set of values that looks like this:

```
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key     ****************RUG2 shared-credentials-file    
secret_key     ****************hJUU shared-credentials-file    
    region                us-east-2      config-file    ~/.aws/config
```
{% endtab %}

{% tab title="Azure" %}
* Follow the instructions [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) to install your Azure cli.
* Follow the instructions [here](https://docs.microsoft.com/en-us/cli/azure/get-started-with-azure-cli) to sign into your Azure cli.
{% endtab %}
{% endtabs %}

## 3. Register and Configure Domain Name

You need a registered domain that your Plural applications can be deployed to. You may use either:

1. `onplural.sh` subdomain backed by the Plural Domain Service (recommended). If you are choosing to use the Plural domain service, you don't need to do anything extra now. Simply follow the prompts further down.
2.  your own domain or subdomain backed by one of the dns service providers we currently support:

    1. Route53
    2. Google Cloud DNS
    3. Azure DNS

    For more instructions on how to setup a domain using one of these providers [refer to our guide here](dns-setup/).

## 4. Create and Initialize Plural Repo

Run this command within a directory that you want to store your configuration repository in: 

```
plural init
```

The Plural CLI will then guide you through a workflow using GitHub/GitLab OAuth to create a repository on your behalf. If you don't want the Plural CLI
to do this automatically, then create a repository [manually](https://docs.github.com/en/get-started/quickstart/create-a-repo) and run `plural init` at the root of the repo.

{% hint style="info" %}
Currently we're limited to a one cluster to one repo mapping, but eventually that will be relaxed. We also strongly urge users to store installations in a fresh, separate repository to avoid our automation trampling existing files.
{% endhint %}

Along the `plural init` workflow, we will set the Git attributes to configure encryption and configure your cloud provider for this installation.

You will also be asked whether you want to use Plural's domain service and if so, what you want the subdomain to be. Here's an example of what it looks like below:

```
Do you want to use plural's dns provider: [Yn] Y
What do you want to use as your subdomain, must be a subdomain under onplural.sh: tryunitofwork.onplural.sh
```

This process will generate a `workspace.yaml` file at the root of your repo that stores your cloud provider configuration information.

## 5. Install Plural Applications

To view the applications you can install on Plural, navigate to the explore tab at [https://app.plural.sh/explore/public](https://app.plural.sh/explore/public).

To actually install applications on Plural, the preferred method is to use our installation bundles. You can view the available bundles by navigating to the specific app on [https://app.plural.sh](https://app.plural.sh) or listing them via the cli using:

```
plural bundle list <app-name>
```

If the app is paid, you should click on the bundle in the interface to ensure you set up all the subscriptions needed to install the application properly.

Once you've found the bundle you want and are ready to go, run this in the root of your repo:

```
plural bundle install <app-name> <bundle-name>
```

You should be asked a lot of questions about how your app will be configured, including whether you want to enable Plural OIDC (single sign-on):

![](<../.gitbook/assets/Screen Shot 2021-11-11 at 7.55.50 PM.png>)

Unless you don't wish to use Plural as an identity provider due to internal company security requirements, you should enter (Y). This will enable you to use your existing `app.plural.sh` login information to log into all Plural-deployed applications.

Ultimately all the values you input at this step will be stored in a file called `context.yaml` at the root of your repo.

## 6. Build and Deploy Plural Applications

With all bundles installed, simply run:

```bash
plural build
plural deploy --commit "initial deploy"
```

This will generate all deployment artifacts in the repo, then deploy them in dependency order.

{% hint style="info" %}
`plural deploy` can take a fair amount of time, and network disconnects can cause potential issues as a result. If you're running on a spotty network, or would like to step out while it's running we recommend running it in [tmux](https://github.com/tmux/tmux/wiki)
{% endhint %}

## 7. Install Plural Admin Console

The plural admin console is a web application that serves as a control panel for all your plural applications. It:

* manages automated upgrades delivered from the Kubernetes api
* serves as a thin Grafana to visualize application metrics and logs
* serves as a built-in k8s dashboard for all plural apps in the cluster, along with providing app-level health checking
* is the touchpoint at which incidents can be filed with the owner of an application

The console is not a strict dependency, but it is highly recommended to install it. It can be installed and deployed like any other application on Plural. For more detailed instructions, please refer to [this guide](admin-console.md).

{% hint style="info" %}
The admin console is separate from [app.plural.sh](https://app.plural.sh) which is primarily a package registry.
{% endhint %}

## 8. Log In to Plural Application

Once `plural deploy` has completed, you should be ready to log in to your application at `{app-name}.{domain-name}`.

The application urls will have been printed out to the terminal at the end of the `plural deploy` logs.

If you selected (Y) to using Plural's OIDC above, then you should be able to login with your `app.plural.sh` login credentials.

If you selected (N) to using Plural's OIDC, login credentials are available at`{app-name}/helm/{app-name}/values.yaml.` The key name should be pretty self-descriptive, for instance the initial admin password for the plural console is in a key named: `console.secrets.admin_password`.

## 9. Upgrade and deploy new apps

The full `plural build && plural deploy` commands are only necessary if you have a queue of multiple apps to be deployed that you need assistance with sequencing the installations. If there's just a single targeted application to deploy, simply do:

```
plural build --only ${app}
plural deploy --commit "updated ${app}"
```

## 10. Uninstall Applications

To uninstall applications, you can use

```
plural destroy <app-name>
```

This will do things like destroying terraform resources and emptying k8s namespaces, but it won't remove the application builds from your local repo, or the application configuration values from `context.yaml.`

## 11. Working in Teams

The getting started instructions here refer to a single user managing Plural installations for multiple applications. If you want to turn over management of your Plural-installed applications to a whole team, follow the instructions in the guide [here](../identity-and-access-management/identity-and-installations/sharing-existing-plural-installation-repos.md).

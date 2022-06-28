---
description: A quick guide to getting up and running with the Plural CLI.
---

# Quickstart

## Overview

This is a guide on how to get Plural running on your own machines using our CLI. If you prefer an in-browser Cloud Shell experience with all the dependencies loaded, check out our quickstart guide [here](cloud-shell-quickstart.md).

## Install Plural CLI and dependencies

The Plural CLI and its dependencies are available using a package manager for your system. For Mac, we recommend using Homebrew, although our Docker image should be usable on virtually any platform.

{% tabs %}
{% tab title="Mac" %}
```
brew install pluralsh/plural/plural
```

The brew tap will install plural, alongside Terraform, Helm and kubectl for you. If you've already installed any of those dependencies, you can add `--without-helm`, `--without-terraform`, or `--without-kubectl`
{% endtab %}

{% tab title="curl" %}
You can download the binaries attached to our GitHub releases here: [https://github.com/pluralsh/plural-cli/releases](https://github.com/pluralsh/plural-cli/releases). There will be binaries for linux, windows, and mac and all compatible platforms.

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



You will still need to ensure helm, terraform and kubectl are properly installed, you can find installers for each here

| Tool      | Installer                                                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------------------- |
| helm      | [https://helm.sh/docs/intro/install/](https://helm.sh/docs/intro/install/)                                                 |
| terraform | [https://learn.hashicorp.com/tutorials/terraform/install-cli](https://learn.hashicorp.com/tutorials/terraform/install-cli) |
| kubectl   | [https://kubernetes.io/docs/tasks/tools/#kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)                         |
{% endtab %}

{% tab title="Docker" %}
We offer a docker image with the plural cli installed along with all cli dependencies: terraform, helm, kubectl, and all the major cloud clis: gcr.io/pluralsh/plural-cli:0.1.1-cloud. We also provide a decent configuration of zsh in it, so you can drive the entire plural workflow in an interactive session. The best strategy is probably to mount the config dir of the cloud provider you're using, like (\~/.aws), in the docker run command:

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
We have EC2 AMI's with the Plural CLI installed, along with all cloud provider clis, terraform, helm and kubectl for those interested in creating a remote environment. A registry of the AMIs can be viewed here: [https://github.com/pluralsh/plural-cli/blob/master/packer/manifest.json](https://github.com/pluralsh/plural-cli/blob/master/packer/manifest.json)

If there's interest in images for GCP and Azure, please to give us a shout in our discord or feel free to open a GitHub issue.

This doc gives more details on launching AMIs if you are unfamiliar: [https://aws.amazon.com/premiumsupport/knowledge-center/launch-instance-custom-ami/](https://aws.amazon.com/premiumsupport/knowledge-center/launch-instance-custom-ami/). You'll want to select "Public images" within the ami search bar and you can use the ami id embedded in the `artifact_id` in our manifests, eg `ami-0249247d5fc865089`. Be sure to chose the one for the appropriate region.
{% endtab %}
{% endtabs %}

## Configure Cloud Provider CLI and Settings

You should now install and configure your cloud provider cli ([awscli](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html), [gcloud](https://cloud.google.com/sdk/docs/install), [az](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)) if you have not done so already. This is also a good time to take care of some cloud setup tasks from your provider's console. Follow the provider-specific instructions below.

{% tabs %}
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

{% tab title="Azure" %}
* Follow the instructions [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) to install your Azure cli.
* Follow the instructions [here](https://docs.microsoft.com/en-us/cli/azure/get-started-with-azure-cli) to sign into your Azure cli.
{% endtab %}
{% endtabs %}
  
## Create your Plural Repo

Run this command within a directory that you want to store your configuration repository in:

```
plural init
```

The Plural CLI will then guide you through a workflow using GitHub/GitLab OAuth to create a repository on your behalf.

{% hint style="info" %}
Currently we're limited to a one cluster to one repo mapping, but eventually that will be relaxed. We also strongly urge users to store installations in a fresh, separate repository to avoid our automation trampling existing files.
{% endhint %}

Along the `plural init` workflow, we will set the Git attributes to configure encryption and configure your cloud provider for this installation.

You will also be asked whether you want to use Plural's domain service and if so, what you want the subdomain to be. We recommend that you use our DNS service if you don't have any security reasons that prevent you from doing so.
The hostname that you configure with us will determine where your applications are hosted. For example, if you enter `singular.onplural.sh`, your applications will be available at `$APP_NAME.singular.onplural.sh`.

This process will generate a `workspace.yaml` file at the root of your repo that stores your cloud provider configuration information.

## Install Plural Applications

To view the applications you can install on Plural, navigate to the explore tab at [https://app.plural.sh/explore/public](https://app.plural.sh/explore/public).

Run `plural bundle list <app-name>` to find installation commands and information about each application available for install.

To install applications on Plural, run:

```
plural bundle install <app-name> <bundle-name>
```

We can try this out by installing the Plural Console, a powerful Kubernetes control plane:

{% tabs %}

{% tab title="AWS" %}
```plural bundle install console console-aws```
{% endtab %}
{% tab title="GCP" %}
```plural bundle install console console-gcp```
{% endtab %}
{% tab title="Azure" %}
```plural bundle install console console-azure```
{% endtab %}

{% endtabs %}

You should be asked a lot of questions about how your app will be configured, including whether you want to enable **Plural OIDC** (single sign-on).
Unless you don't wish to use Plural as an identity provider due to internal company security requirements, you should enter (Y). This will enable you to use your existing `app.plural.sh` login information to log into all Plural-deployed applications.

Ultimately all the values you input at this step will be stored in a file called `context.yaml` at the root of your repo.

## Build and Deploy your Kubernetes Cluster and Applications

With all bundles installed, run:

```bash
plural build
plural deploy --commit "initial deploy"
```

This will generate all deployment artifacts in the repo, then deploy them in dependency order.

{% hint style="info" %}
`plural deploy` can take a fair amount of time, and network disconnects can cause potential issues as a result. If you're running on a spotty network, or would like to step out while it's running we recommend running it in [tmux](https://github.com/tmux/tmux/wiki)
{% endhint %}

Once `plural deploy` has completed, you should be ready to log in to your application at `{app-name}.{domain-name}`.

{% hint style="warning" %}
You may experience a delayed creation of your SSL certs for your applications. ZeroSSL currently may take up to 24 hours to provide you your certs.
{% endhint %}

**And you are done!** You now have a fully-configured Kubernetes cluster and are free to install applications on it to your heart's content. If you want to take down any of your individual applications, run `plural destroy <APP-NAME>`. If you're just testing 
us out and want to take down the entire thing, run `plural destroy`. 


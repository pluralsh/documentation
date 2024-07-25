---
title: Installing the Plural CLI
description: Guides for installing the Plural CLI
---

### Prerequisites

[Mac Homebrew](https://brew.sh/)
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
```
 [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), [Helm CLI](https://helm.sh/docs/intro/install/), [Terraform](https://developer.hashicorp.com/terraform/install), [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/) 
```sh
brew install awscli helm terraform kubectl
```

### Install [Plural CLI](https://github.com/pluralsh/plural-cli/?tab=readme-ov-file#installation)
```sh
brew install pluralsh/plural/plural
```

### Issue a Command
```sh
plural cd login
```



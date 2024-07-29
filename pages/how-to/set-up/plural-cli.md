---
title: Installing the Plural CLI
description: Guides for installing the Plural CLI
---

### Install Prerequisites

[Mac Homebrew](https://brew.sh/)
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
```
 [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html), [Helm CLI](https://helm.sh/), [Terraform](https://developer.hashicorp.com/terraform/intro), [kubectl](https://kubernetes.io/docs/reference/kubectl/) 
```sh
brew install awscli helm terraform kubectl
```

### Install [Plural CLI](https://github.com/pluralsh/plural-cli/?tab=readme-ov-file#installation)
```sh
brew install pluralsh/plural/plural
```

### Validate Install
```sh
plural login
```



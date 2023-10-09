---
title: Add an Application
description: >-
  Is something missing from the Plural marketplace? Are you a vendor who wants
  to add your solution? We'd love for you to onboard your application! This
  guide outlines the process.
---

The two main functionalities that make the applications in Plural's marketplace work are dependency tracking between DevOps tools (Helm and Terraform) and templating.
When you install an app from the marketplace into your cluster a number of things happen along the way across different components of Plural's architecture.
A good unerstanding of an app's journey into your cluster will go a long way if you want to contribute your own application to the marketplace.

## Install and Configure an Application

In this section we will lay out how your user provided values tie in with the deployment process as it relates to the configuration and templating of the app.

When a user sets up a new Plural workspace in a git repository (we'll call that a *deployment repository* going forward) a `workspace.yaml` file is created that stores global values for that cluster such as the cloud account and region, the cluster and VPC name and what subdomain all the applications will be hosted under.
Next, the user can install an application bundle using the `plural bundle install <app_name> <bundle>` CLI command.
> Most applications come with more than bundle, one for each targeted cloud provider.
The CLI will then prompt the user for for inputs needed to setup that application, along with any dependencies of the application.
These inputs are saved in the `context.yaml` file.

For example, the `tree` of a deployment repository, where we installed Dagster with `plural bundle install dagster dagster-aws` (among others),  might look like this:

```console
$ pwd
~/Repos/deployment-repository
$ tree -L 1 .
.
├── bootstrap
├── cert-manager
├── console
├── dagster
├── postgres
├── terraform.tfstate
├── workspace.yaml
└── context.yaml
```

The `workspace.yaml` might look like this:
```yaml
apiVersion: plural.sh/v1alpha1
kind: ProjectManifest
metadata:
  name: pluraldev
spec:
  cluster: pluraldev
  bucket: pluraldevsh-tf-state
  project: "123456765432"
  provider: aws
  region: us-east-2
  owner:
    email: plural-dev@pluraldev.sh
  network:
    subdomain: dev.plural.sh
    pluraldns: false
  bucketPrefix: pluraldev
  context: {}
```

And the `context.yaml` like this. In the `spec.configuration` section you can see the user input parametrization of each artifact.
```yaml
apiVersion: plural.sh/v1alpha1
kind: Context
spec:
  bundles:
  - repository: dagster
    name: dagster-aws
  - repository: plural
    name: plural-aws
  - repository: console
    name: console-aws
  - repository: bootstrap
    name: aws-efs
  - repository: cert-manager
    name: cert-manager-aws
  - repository: ingress-nginx
    name: ingress-nginx-aws
  buckets:
  - pluraldev-pluraldev-dagster
  domains:
  - console.dev.plural.sh
  - dagster.dev.plural.sh
  configuration:
    bootstrap:
      vpc_name: pluraldev
    cert-manager: {}
    console:
      admin_name: admin
      console_dns: console.dev.plural.sh
      ...
      repo_url: git@github.com:pluralsh/deployment-repo.git
    dagster:
      dagsterBucket: pluraldev-pluraldev-dagster
      hostname: dagster.dev.plural.sh
    ingress-nginx: {}
    postgres:
      wal_bucket: pluraldev-pluraldev-postgres-wal
```


Next, the user would run `plural build` or `plural build --only <app name>` which will create a wrapper Helm chart and Terraform module for that app under a dedicated directory in their deployment repository.
The wrapper Helm chart and Terraform module depend on the application Helm chart(s) and Terraform module(s) it gets from the application's artifact repository via the Plural API.
During this step the CLI will generate the `default-values.yaml` for the wrapper helm chart and `main.tf` for the wrapper Terraform module using its templating engine.
More precisely, `default-values.yaml` will contain the interpolated templated values from its `values.yaml.tpl` (see below) that are derived by injecting the values saved in the `context.yaml` at `spec.configuration`.

For example, after the `plural build --only dagster` command, the `tree` of the built Dagster application in your deployment repository might look like this:

```console
$ pwd
~/Repos/deployment-repository/dagster
$ tree .
.
├── build.hcl
├── deploy.hcl
├── diff.hcl
├── helm
│   └── dagster
│       ├── Chart.lock
│       ├── Chart.yaml
│       ├── charts
│       │   └── dagster-0.1.44.tgz
│       ├── default-values.yaml
│       ├── templates
│       │   ├── NOTES.txt
│       │   ├── application.yaml
│       │   ├── license.yaml
│       │   └── secret.yaml
│       └── values.yaml
├── manifest.yaml
├── output.yaml
└── terraform
    ├── aws
    │   ├── deps.yaml
    │   ├── iam.tf
    │   ├── main.tf
    │   ├── outputs.tf
    │   ├── postgres.tf
    │   └── variables.tf
    ├── main.tf
    └── outputs.tf
```

Here you can see the wrapper Helm chart in `./helm/dagster` around the `./helm/dagster/charts/dagster-0.1.44.tgz`, i.e. the artifact's Helm chart that the Plural CLI downloads for you.
Similarly the wrapper Terraform module in `./terraform` will contain a local copy of the artifact's Terraform module inside `./terraform/aws`.

## Plural Application Artifact

As mentioned above, the Plural CLI creates a wrapper Helm chart and Terraform module for each installed application and inputs the user defined values for that installation.
Some extra configuration files are necessary in the applications artifact for Plural to be able to understand
- the Helm charts and Terraform modules dependencies to run them through its templating engine
- dependencies on other Plural artifacts
- platform specific components and infrastructure configurations
- as well as Plural's own package and version specs.

As an example Dagster's artifact `tree` would look like this:

```console
$ pwd
~/Repos/plural-artifacts/dagster
$ tree .
.
├── Pluralfile
├── helm
│   └── dagster
│       ├── Chart.lock
│       ├── Chart.yaml
│       ├── README.md
│       ├── charts
│       │   ├── config-overlays-0.1.1.tgz
│       │   ├── dagster-1.4.10.tgz
│       │   ├── postgres-0.1.16.tgz
│       │   └── test-base-0.1.10.tgz
│       ├── deps.yaml
│       ├── runbooks
│       │   └── scaling-manual.xml
│       ├── templates
│       │   ├── _helpers.tpl
│       │   ├── oidc.yaml
│       │   ├── runbooks.yaml
│       │   └── secret.yaml
│       ├── values.yaml
│       └── values.yaml.tpl
├── plural
│   ├── docs
│   │   ├── private-ingress.md
│   │   └── user-code.md
│   ├── icons
│   │   ├── dagster-primary-mark.png
│   │   └── dagster.png
│   ├── notes.tpl
│   ├── recipes
│   │   ├── dagster-aws.yaml
│   │   ├── dagster-azure.yaml
│   │   └── dagster-gcp.yaml
│   └── tags
│       ├── helm
│       │   └── dagster.yaml
│       └── terraform
│           ├── aws.yaml
│           ├── azure.yaml
│           └── gcp.yaml
├── repository.yaml
├── terraform
│   ├── aws
│   │   ├── deps.yaml
│   │   ├── iam.tf
│   │   ├── main.tf
│   │   ├── outputs.tf
│   │   ├── postgres.tf
│   │   ├── terraform.tfvars
│   │   └── variables.tf
│   ├── azure
│   │   ├── deps.yaml
│   │   ├── main.tf
│   │   ├── terraform.tfvars
│   │   └── variables.tf
│   └── gcp
│       ├── deps.yaml
│       ├── main.tf
│       ├── outputs.tf
│       ├── terraform.tfvars
│       └── variables.tf
└── vendor_images.yaml
```

Let's disect this artifact's structure.


### Helm

The `helm` directory contains the app's Helm chart as it will be available through the Plural API and used by the Plural CLI to configure and deploy the app's Kubernetes components into your cluster.
Many apps in Plural's marketplace define Helm charts in terms of their upstream open source versions (if they're actively maintained, allow for required customization and fit Plural's quality standards)
as well as other helper charts, e.g. from Plural's [module-library](https://github.com/pluralsh/module-library).
If any additional resources are necessary, they can be added and templated in the same manner as with any other Helm chart.
Any default chart parametrization goes into your standard `values.yaml` file, most prominently resource requirements or limits, labels, annotations, entrypoint customizations, and so on.

One thing that is unique about a Plural artifact's Helm chart is the ability to template in values from other parts of the infrastructure, that cannot be known ahead of deployment time, in the dedicated `values.yaml.tpl` file.
This enables us to parametrize values for resources that depend on application components that do not live in the cluster, but in your cloud account and that are deployed with terraform and not helm.
The ARN of an AWS role or bucket, or VPC subnet ids are common examples for this.
Another supported use case is to pass output from other Plural deployed applications that live in the same cluster,
or configuration that you can query from the Plural API, e.g. OIDC config if you're using Plural as an OIDC provider for your apps, too.
See [Templating](###Templating) for how powerful this additional templating layer can be.

Plural leverages dependency tracking of applications to achieve a high degree of resource efficiency and modularity.
Dependencies between artifacts are defined in the recipe files (see below).
At the level of the Helm charts and Terraform modules the cross-application dependencies are tracked in a dedicated `deps.yaml` at each chart's or module's top-level directory.
For example, for Dagster's Helm chart you would list required dependencies on:
- the `bootstrap` application's Helm chart 
- the `ingress-nginx` application's Helm chart
- the `postrges` operator application's Helm chart

as well as optional dependencies the Dagster application's own Terraform modules to convey the intent that those are installed before the Helm chart.

```yaml
apiVersion: plural.sh/v1alpha1
kind: Dependencies
metadata:
  application: true
  description: Deploys dagster crafted for the target cloud
spec:
  breaking: true
  dependencies:
  - type: helm
    name: bootstrap
    repo: bootstrap
    version: '>= 0.5.1'
  - type: helm
    name: ingress-nginx
    repo: ingress-nginx
    version: ">= 0.1.2"
  - type: helm
    name: postgres
    repo: postgres
    version: ">= 0.1.6"
  - type: terraform
    name: aws
    repo: dagster
    version: '>= 0.1.0'
    optional: true
  - type: terraform
    name: azure
    repo: dagster
    version: '>= 0.1.0'
    optional: true
  - type: terraform
    name: gcp
    repo: dagster
    version: '>= 0.1.0'
    optional: true
```

### Terraform

The `terraform` directory contains the app's provider-specific terraform modules that encapsulate all application components that do not (or cannot) live inside the cluster.
For each cloud provider that the artifact offers a bundle for there will be one under the related directory name.
Most commonly you'd find object storage alongside their IAM resources, but sometimes also Kubernetes resources like service accounts,
if their deployment cannot be achieved through the artifact's Helm chart in a convenient manner.
> One peculiarity about the terraform modules is that at the very least they need to contain the Kubernetes namespace for your application.
  This is because during a `plural deploy` with the Plural CLI the `terraform apply` will always run before the `helm install` step.

Just like the Helm chart, the Terraform modules also contain a `deps.yaml` file that inform the Plural API about dependencies on other modules.
```
apiVersion: plural.sh/v1alpha1
kind: Dependencies
metadata:
  description: dagster aws setup
  version: 0.1.2
spec:
  dependencies:
  - name: aws-bootstrap
    repo: bootstrap
    type: terraform
    version: '>= 0.1.1'
  providers:
  - aws
```


### Plural Files

The `plural` directory contains the artifact's packaging information (`plural/recipes`), metadata (`plural/tags` and `plural/icons`), and application specific instructions (`plural/docs` and `plural/notes.tpl`).
On the top-level directory of each artifact you'll also find a`repository.yaml`.

The `repository.yaml` and recipe YAMLs are an integral part of Plural's artifact packaging format.

`repository.yaml`:
```yaml
name: dagster
description: A data orchestration platform for the development, production, and observation of data assets.
category: DATA
private: false
docs: plural/docs
icon: plural/icons/dagster-primary-mark.png
notes: plural/notes.tpl
gitUrl: https://github.com/dagster-io/dagster
homepage: https://dagster.io/
oauthSettings:
  uriFormat: https://{domain}/oauth2/callback
  authMethod: POST
tags:
- tag: dag
- tag: data
- tag: data-pipelines
```

private recipe
private repository
sharing a private app between different plural accounts

The metadata in this file informs the Plural API about the application this artifact envelopes.
It will store its name, category and description, where it can find the icon and docs to display in the marketplace,
the notes template to prompt after installation, as well as links to any upstream git repository or homepage if applicable.

`oauthSettings` specifies the URI format for the OIDC callback address and informs the Plural API how to setup the OIDC endpoint for your application if you use it.
> Behind the scenes, every `plural bundle install` triggers the OIDC client creation when you answer with `yes` on the OIDC prompt.
  This happens, because every Client needs to be created before a `plural build` which then inputs the client info into the helm chart.

The `private` flag controls whether the artifact's bundles are published publicly or privately. (#TODO what does this mean for the end user exactly, how does one get access to public repositories)
Once the artifact makes it into the `main` branch of the [Plural artifact repository](https://github.com/pluralsh/plural-artifacts) on a successful PR the Github Actions workflow will publish it and its components.


`plural/receipes/dagster-aws.yaml`:
```yaml
name: dagster-aws
description: Installs dagster on an aws eks cluster
provider: AWS
primary: true
dependencies:
- repo: bootstrap
  name: aws-k8s
- repo: ingress-nginx
  name: ingress-nginx-aws
- repo: postgres
  name: aws-postgres
oidcSettings:
  uriFormat: https://{domain}/oauth2/callback
  authMethod: POST
  domainKey: hostname
sections:
- name: dagster
  configuration:
  - name: dagsterBucket
    type: BUCKET
    documentation: s3 bucket for storing dagster logs
    default: dagster
  - name: hostname
    type: DOMAIN
    documentation: fqdn on which to deploy your dagster instance
  items:
  - type: TERRAFORM
    name: aws
  - type: HELM
    name: dagster
```

The recipe file ties a bundle together, with one dedicated recipe per cloud provider.
It informs the Plural API about the bundle's parameter signature, metadata, dependencies and sequence order of installations and upgrades.
Let's step through this file.

- `provider` defines the targeted cloud provider of this recipe.
- For every artifact one of the recipes can be marked as `primary` which will make it possible to install with simply a `plural bundle install <app_name>` (leaving out the `<bundle>`).
- The apps listed in `dependencies` tell Plural on which other Plural bundles this bundle depends on.
  > Most bundles depend on the installation of other Plural applications. For example, every bundle will at least depend on the bootstrap application that packages the cluster itself.
- Similar to `oauthSettings` in the `repository.yaml`, `oidcSettings` in the recipe YAML should specify the same configuration at the bundle level.
- `sections[0].configuration` defines the user-provided values to prompt for during installation .
  This is basically the signature of the bundle, it contains all required user-provided parameters that can be used in templating expressions in the `values.yaml.tpl` or in the terraform module (e.g. in the `.tfvars` file).
  The Plural API has a built-in type checker that will validate any passed string's format against its type, e.g. to guarantee a valid domain name.
  For examples on available types check other Plural artifacts.
  The Plural CLI will store the passed values in the according section in the `context.yaml` as discussed above.
- `sections[0].items` lists the chart and module directories in the `helm` or `terraform` directories that are part of this bundle.
> A bundle can technically have multiple sections, but this feature's not yet used.

```yaml
apiVersion: plural.sh/v1alpha1
kind: Dependencies
metadata:
  description: dagster aws setup
  version: 0.1.2
spec:
  dependencies:
  - name: aws-bootstrap
    repo: bootstrap
    type: terraform
    version: '>= 0.1.1'
  providers:
  - aws
```


## Templating

The next example is a snippet of the `values.yaml.tpl` file for Grafana:

```yaml
grafana:
  admin:
    password:
      { { dedupe . "grafana.grafana.admin.password" (randAlphaNum 14) } }
    user: admin
  ingress:
    tls:
      - hosts:
          - { { .Values.hostname } }
        secretName: grafana-tls
    hosts:
      - { { .Values.hostname } }
```

In the above example, the hostname a for Grafana that is saved in the `context.yaml` will be set in the ingress for Grafana by `{{ .Values.hostname }}`. It also showcases `dedupe`, which is one of the templating functions available in the Plural CLI.

We are using the `dedupe` function so that a new random password for the Grafana admin is not generated if it has already been set. The reason `grafana.grafana.admin.password` is specified for the path, is because the CLI will create a wrapper Helm chart named `grafana` in a user's installation workspace. Please see [this section](https://helm.sh/docs/chart_template_guide/subcharts_and_globals/#overriding-values-from-a-parent-chart) of the Helm docs for an explanation on how to pass values to a subchart.

The next snippet shows a part of the `terraform.tfvars` for the AWS bootstrap terraform module:

```hcl
vpc_name = {{ .Values.vpc_name | quote }}
cluster_name = {{ .Cluster | quote }}
```

Except for the user's application inputs from the `context.yaml` and the aforementioned `dedupe` function, Plural includes a lot of other values and functions that make it possible to simplify otherwise complex application configurations.

### Templating reference

Along with the standard functions available in the Go templating language, the following Plural specific functions can be used.

##### Functions:

| Function        | Input (type)                                             | Returned value             | Description                                                                                                                              |
| --------------- | -------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| fileExists      | Path (string)                                            | Boolean                    | Checks if a file exists                                                                                                                  |
| pathJoin        | Parts (\[]string)                                        | String                     | Joins parts of a path                                                                                                                    |
| repoRoot        | X                                                        | String                     | Returns the path of the installation repository                                                                                          |
| repoName        | X                                                        | String                     | Returns the base path of repoRoot                                                                                                        |
| repoUrl         | X                                                        | String                     | Returns the `remote.origin.url` of the installation repository                                                                           |
| branchName      | X                                                        | String                     | Returns the name of the branch used for the installation repository                                                                      |
| dumpConfig      | X                                                        | String, Error              | Returns the Plural CLI config                                                                                                            |
| dumpAesKey      | X                                                        | String, Error              | Returns the AES keys used for the installation repository                                                                                |
| readFile        | Path (strong)                                            | String                     | Returns the contents of a file as a string                                                                                               |
| readLine        | Prompt (string)                                          | String, Error              | Prompts the user for input and returns the inputted string                                                                               |
| readPassword    | Prompt (string)                                          | String, Error              | Prompts the user for a password input and returns the inputted string                                                                    |
| readLineDefault | Prompt, Default (string)                                 | string, error              | Prompts the user for input and returns the inputted string or the default value if input is empty                                        |
| homeDir         | Parts (\[]string)                                        | string, error              | Returns the path of the user's home directory with the path parts appended to it                                                         |
| knownHosts      | X                                                        | string, error              | Returns the contents of the `.ssh/known_hosts` file in the user's home directory                                                         |
| probe           | Object (interface{}), Path (string)                      | interface{}, error         | Checks if the object exists at the input path                                                                                            |
| dedupe          | Object (interface{}), Path, Value (string)               | string                     | Returns Object if it exists at the input Path, otherwise returns Value as a string                                                       |
| dedupeObj       | Object (interface{}), Path (string), Value (interface{}) | interface{}                | Returns Object if it exists at the input Path, otherwise returns Value as an interface{}. Used for complex data types                    |
| namespace       | Name (string)                                            | string                     | Returns the namespace for an application                                                                                                 |
| secret          | Namespace, Name (string)                                 | map\[string]interface{}    | Returns the content of a Kubernetes secret                                                                                               |
| importValue     | Tool, Path (string)                                      | string                     | Returns the value from another tool at the given path. An example use case is to use a value from the Terraform output in the Helm chart |
| toYaml          | Value (interface{})                                      | string, error              | Formats the input value as YAML                                                                                                          |
| eabCredential   | Cluster, Provider (string)                               | `api.EabCredential`, error | Creates a new set of EAB credentials in the Plural API for when using cert-manager with the Plural DNS                                   |

##### Template values:

| Path                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .Values                       | The (recipe) values a user inputted for the given application                                                                                                                                                                                                                                                                                                                                                                         |
| .Configuration                | Allows for getting values from other applications stored in the `context.yaml` file. For example, to use the hostname configured for Grafana in another application `{{ .Configuration.grafana.hostname }}` can be used.                                                                                                                                                                                                              |
| .License                      | The License for this application installation                                                                                                                                                                                                                                                                                                                                                                                         |
| .Config                       | The Plural CLI configuration object. Please see below for a detailed explanation                                                                                                                                                                                                                                                                                                                                                      |
| .OIDC                         | The OIDC configuration object for an application. Please see below for a detailed explanation                                                                                                                                                                                                                                                                                                                                         |
| .Region                       | The cloud region configured for the workspace of the installation                                                                                                                                                                                                                                                                                                                                                                     |
| .Project                      | The cloud project configured for the workspace of the installation                                                                                                                                                                                                                                                                                                                                                                    |
| .Cluster                      | The name of the cluster configured for the workspace of the installation                                                                                                                                                                                                                                                                                                                                                              |
| .Provider                     | The name of the cloud provider configured for the workspace of the installation                                                                                                                                                                                                                                                                                                                                                       |
| .Context                      | The context map of the Plural cloud provider config for the workspace of the installation                                                                                                                                                                                                                                                                                                                                             |
| .SMTP                         | The SMTP configuration of the workspace. Please see below for a detailed explanation                                                                                                                                                                                                                                                                                                                                                  |
| .Applications.HelmValues      | Function that can be used to get the Helm values from another application. This differs from `.Configuration` as this can access all Helm values for an application, not only those stored in the `context.yaml`. For example, to use the generated Grafana admin password in another application you can do `{{ $grafanaValues := .Applications.HelmValues "grafana" }}` then `{{ $grafanaValues.grafana.grafana.admin.password }}`. |
| .Applications.TerraformValues | Function that can be used to get the Terraform outputs from another application. Usage is similar to `.Applications.HelmValues`. For example, to get the Terraform outputs of the bootstrap application you can use `{{ $bootstrapOutputs := .Applications.TerraformValues "bootstrap" }}`                                                                                                                                            |
| .Acme.KeyId                   | The ACME key ID for to the application when using Plural DNS                                                                                                                                                                                                                                                                                                                                                                          |
| .Acme.Secret                  | The ACME secret for to the application when using Plural DNS                                                                                                                                                                                                                                                                                                                                                                          |

##### `.Config` values:

| Path                    | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| .Config.Email           | The user email address of the current CLI user                  |
| .Config.Token           | The Plural token of the current CLI user                        |
| .Config.NamespacePrefix | The prefix to add to namespaces created for Plural applications |
| .Config.Endpoint        | The Plural endpoint the CLI will use                            |
| .Config.LockProfile     |                                                                 |
| .Config.ReportErrors    | If CLI errors should be reported back to Plural                 |
| .COnfig.metadata.Name   | Name of the CLI config that is currently being used             |

##### `.OIDC` values:

| Path                                      | Description                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| .OIDC.Id                                  | The ID of the OIDC provider for the application                                                        |
| .OIDC.ClientId                            | The Client ID for the OIDC provider of the application                                                 |
| .OIDC.ClientSecret                        | The Client Secret for the OIDC provider of the application                                             |
| .OIDC.RedirectUris                        | List of redirect URIs for the OIDC provider of the application                                         |
| .OIDC.Bindings                            | List of bindings for the OIDC provider of the application. Please see below for a detailed explanation |
| .OIDC.Configuration.Issuer                | The Issuer of the OIDC provider for the application                                                    |
| .OIDC.Configuration.AuthorizationEndpoint | The Authorization endpoint of the OIDC provider for the application                                    |
| .OIDC.Configuration.TokenEndpoint         | The Token endpoint of the OIDC provider for the application                                            |
| .OIDC.Configuration.JwksUri               | The JWKS URI of the OIDC provider for the application                                                  |
| .OIDC.Configuration.UserinfoEndpoint      | The endpoint exposing user info of the OIDC provider for the application                               |

##### `.OIDC.Bindings` values:

| Path                      | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| .OIDC.Bindings.User.Id    | The ID of the user that's bound to the application's OIDC provider    |
| .OIDC.Bindings.User.Email | The Email of the user that's bound to the application's OIDC provider |
| .OIDC.Bindings.User.Name  | The Name of the user that's bound to the application's OIDC provider  |
| .OIDC.Bindings.Group.Id   | The ID of the group that's bound to the application's OIDC provider   |
| .OIDC.Bindings.Group.Name | The Name of the group that's bound to the application's OIDC provider |

##### `.SMTP` values:

| Path           | Description                                   |
| -------------- | --------------------------------------------- |
| .SMTP.Service  |                                               |
| .SMTP.Server   | The SMTP server configured for the workspace  |
| .SMTP.Port     | The SMTP port configured for the workspace    |
| .SMTP.Sender   | The SMTP sender to use for the application    |
| .SMTP.User     | The username used to login to the SMTP server |
| .SMTP.Password | The password used to login to the SMTP server |

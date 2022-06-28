# Workspace Layout

Plural ensures the state of all installed applications are stored in a git repository, under a common format. A typical workspace should have a similar layout to the following example (Please click to expand):

<details>
<summary>📦installation-repository</br></summary>
<details>
<summary>┣ 📂app-one</br></summary>
<details>
<summary>┃ ┣ 📂.plural</br></summary>
     ┃ ┃ ┣ 📜NONCE</br>
     ┃ ┃ ┗ 📜ONCE</br>
</details>
<details>
<summary>┃ ┣ 📂crds</br></summary>
      ┃ ┃ ┣ 📜app-one-crds.yaml</br>
</details>
<details>
<summary>┃ ┣ 📂helm</br></summary>
<details>
<summary>┃ ┃ ┗ 📂app-one</br></summary>
<details>
<summary>┃ ┃ ┃ ┣ 📂charts</br></summary>
      ┃ ┃ ┃ ┃ ┣ 📜app-one-0.1.0.tgz</br>
</details>
<details>
<summary>┃ ┃ ┃ ┣ 📂templates</br></summary>
      ┃ ┃ ┃ ┃ ┣ 📜license.yaml</br>
      ┃ ┃ ┃ ┃ ┣ 📜NOTES.txt</br>
      ┃ ┃ ┃ ┃ ┣ 📜application.yaml</br>
      ┃ ┃ ┃ ┃ ┗ 📜secret.yaml</br>
</details>
      ┃ ┃ ┃ ┣ 📜Chart.yaml</br>
      ┃ ┃ ┃ ┗ 📜values.yaml</br>
</details>
</details>
<details>
<summary>┃ ┣ 📂terraform</br></summary>
<details>
<summary>┃ ┃ ┣ 📂app-one-tf-module</br></summary>
      ┃ ┃ ┃ ┣ 📜main.tf</br>
      ┃ ┃ ┃ ┣ 📜outputs.tf</br>
      ┃ ┃ ┃ ┣ 📜variables.tf</br>
</details>
      ┃ ┃ ┣ 📜main.tf</br>
      ┃ ┃ ┗ 📜outputs.tf</br>
</details>
     ┃ ┣ 📜.pluralignore</br>
     ┃ ┣ 📜build.hcl</br>
     ┃ ┣ 📜deploy.hcl</br>
     ┃ ┣ 📜diff.hcl</br>
     ┃ ┣ 📜manifest.yaml</br>
     ┃ ┗ 📜output.yaml</br>
</details>
<details>
<summary>┣ 📂app-two</br></summary>
<details>
<summary>┃ ┣ 📂.plural</br></summary>
     ┃ ┃ ┣ 📜NONCE</br>
     ┃ ┃ ┗ 📜ONCE</br>
</details>
<details>
<summary>┃ ┣ 📂crds</br></summary>
      ┃ ┃ ┣ 📜app-two-crds.yaml</br>
</details>
<details>
<summary>┃ ┣ 📂helm</br></summary>
<details>
<summary>┃ ┃ ┗ 📂app-two</br></summary>
<details>
<summary>┃ ┃ ┃ ┣ 📂charts</br></summary>
      ┃ ┃ ┃ ┃ ┣ 📜app-two-0.1.0.tgz</br>
</details>
<details>
<summary>┃ ┃ ┃ ┣ 📂templates</br></summary>
      ┃ ┃ ┃ ┃ ┣ 📜license.yaml</br>
      ┃ ┃ ┃ ┃ ┣ 📜NOTES.txt</br>
      ┃ ┃ ┃ ┃ ┣ 📜application.yaml</br>
      ┃ ┃ ┃ ┃ ┗ 📜secret.yaml</br>
</details>
      ┃ ┃ ┃ ┣ 📜Chart.yaml</br>
      ┃ ┃ ┃ ┗ 📜values.yaml</br>
</details>
</details>
<details>
<summary>┃ ┣ 📂terraform</br></summary>
<details>
<summary>┃ ┃ ┣ 📂app-two-tf-module</br></summary>
      ┃ ┃ ┃ ┣ 📜main.tf</br>
      ┃ ┃ ┃ ┣ 📜outputs.tf</br>
      ┃ ┃ ┃ ┣ 📜variables.tf</br>
</details>
      ┃ ┃ ┣ 📜main.tf</br>
      ┃ ┃ ┗ 📜outputs.tf</br>
</details>
     ┃ ┣ 📜.pluralignore</br>
     ┃ ┣ 📜build.hcl</br>
     ┃ ┣ 📜deploy.hcl</br>
     ┃ ┣ 📜diff.hcl</br>
     ┃ ┣ 📜manifest.yaml</br>
     ┃ ┗ 📜output.yaml</br>
</details>
      ┣ 📜.gitattributes</br>
      ┣ 📜.gitignore</br>
      ┣ 📜context.yaml</br>
      ┗ 📜workspace.yaml</br>
</details>

---

## Top level files

### context.yaml

This is where the results to all bundle installs are stored. It can also be manually extended if there's some customization that a user wants to apply beyond what the bundle provided.

### workspace.yaml

Stores base cloud provider setup for this repository. It uses a general format modeled after GCP, but the mapping to the resources in other clouds is pretty straightforward.

On each app installation, you have the option of inheriting this setup, or reconfiguring for the specific app.

### .gitattributes

The git attributes file specifies the filters that drive secret encryption. This file should not be tampered with, unless the user is confident they know what they're doing.

We'll also add additional `.gitattributes` as different modules add or create secrets that might be stored in the repo (eg ssh keys).

---

## Application folders

### **`helm/<application_name>`** folder

When installing an application with Plural, the Kubernetes resources are deployed using Helm.
The Plural CLI creates a wrapper Helm chart in the deployment workspace for each application
that wraps the chart(s) downloaded from the Plural API.

The **`values.yaml`** file contains all the configurations specific for this deployment.

The `values.yaml` file is created during the `plural build` command by the template engine
within the Plural CLI using (among other things) the user inputs from the
`plural bundle install <app> <bundle>` command.

### **`terraform/*`** folder

The cloud resources required for an application installed through Plural are created using Terraform.

The main entrypoint for the terraform configuration is the **`terraform/main.tf`**.
Similar to the `values.yaml` file for Helm, the `terraform/main.tf` is created during the
`plural build` command by the template engine within the Plural CLI.

### {build | deploy}.hcl

The build/deploy/diff files manage two things:

* the steps needed to build or apply a specific repository in plural
* change detection between runs

We'll automatically sha whatever subtree is needed to run any stage in the file, and if there's no detectable change, ignore the command. This is especially useful for avoiding slow, unneeded terraform commands

### .pluralignore

This file tells the Plural CLI to ignore certain paths during change detection,
is similar to a `.gitignore` file for Git.

### manifest.yaml

Metadata about the plural application.

### output.yaml

Outputs from various tools (Terraform, Helm, etc) that can be imported and used in other applications.

### `crds` folder

The `crds` directory contains all the CRDs for the Helm chart.
We manage these through the Plural CLI rather than Helm so we can do more advanced change detection.

### `.plural` folder

The `.plural` folder within each application folder container two files: `ONCE` and `NONCE`.
These files are used as targets for change detection by the Plural CLI.

The `NONCE` file is used for commands that should be executed a single time after a `plural build` command.
The `ONCE` file is used for commands that should only be executed the first time an application is deployed.

---
title: Setting Up an SCM Connection
description: Connecting Plural to a Source Control Management Provider
---

# Prerequisites
* **Plural Console `admin` Permissions**  
* **SCM Provider Personal Access Token**
  * [Github](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)  
  * [GitLab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token)  
  * [Bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/access-tokens/)
* **SCM Provider Organization `admin` Permissions**
  * This is only required when creating the webhook
  * The workload cluster can still be created without the SCM webhook

# Set Up
### Create a New SCM Connection
* **Navigate to `https://{your-console-domain}/pr/scm`**  
* **Click the _Create Connection_ Button at the Top Right**  
![Create SCM Connection Button](/images/how-to/console_create-scm-btn.png)

* **Fil in the Required Fields**
  * **Provider Type**: The SCM Provider Hosting Git Repositories  
  * **Name**: Reference Name for the Provider  
    * ℹ️ **NOTE**: The _cluster-creator_ PR Automation looks for `github` by default
  * **Token**: The Deploy Token to use  
     
![Create SCM Connection Modal](/images/how-to/console_create-scm-modal.png)  

### **Create an [`ScmConnection`](https://docs.plural.sh/deployments/operator/api#scmconnection) CRD Instance**  
Once the connection is created in the UI we can reference it with a CRD instance
  * ❕ Ensure the Name Provided in the UI matches the `spec.name` in the CRD Exactly
  * An [`ScmConnection`](https://docs.plural.sh/deployments/operator/api#scmconnection) yaml template for GitHub exists in `./app/services/pr-automation/scm.yaml`  
  * Use `kubectl` to apply it to the MGMT cluster 
```yaml
apiVersion: deployments.plural.sh/v1alpha1
kind: ScmConnection
metadata:
  name: github
spec:
  name: github
  type: GITHUB
```
### **Add an SCM Provider Webhook**
If you navigate to `https://{your-console-domain}/pr/queue`  
You'll see even though the SCM connection is complete  
and the PR is merged the status of the cluster creator PR is still _open_  

We need to add an SCM Webhook to fix this.  
* **Navigate to `https://{your-console-domain}/pr/scm-webhooks`**  
* **Click the `Create Webhook` Button**  
![](/images/how-to/create-scm-webhook-btn.png)
* **Fill the Required Fields**
  * **Provider Type**: The SCM Provider Hosting Git Repositories
      * This may be obvious, but you need to select the same provider as the console webhook
  * **Owner**: The Organization or Group Within the SCM Provider
  * **Secret**: The Webhook Secret to Share
![](/images/how-to/create-scm-webhook-modal-0.png)
* **Click `Create`**
    * Copy the Webhook URL and note the secret to use within the SCM Provider Webhook 
![](/images/how-to/create-scm-webhook-modal-1.png)


* **Create the Webhook with the SCM Provider**  
❕ You Must be an Owner or Have Admin Access to Create Webhooks
  * [GitHub Organization Webhooks](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks#creating-an-organization-webhook)
  * [GitLab Group Webhooks](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#group-webhooks)
  * [Bitbucket Webhooks](https://confluence.atlassian.com/bitbucketserver/manage-webhooks-938025878.html)

---
title: Setting Up a Workload Cluster
description: Using Plural CLI to Deploy a Workload Kubernetes Cluster
---

# Prerequisites
* **[Plural SCM Connection](/how-to/set-up/scm-connection)**
* **Plural Console `admin` permissions**  

# Set Up
### Enable the `Cluster creator` PR Automation
The Cluster Creator PR Automation CRD is created by default from `plural up`  
But the [Plural SCM Connection](/how-to/set-up/scm-connection) needs to be instantiated  

### **Create a Workload Cluster**  
To create a new workload cluster we can use the builtin Plural _cluster-creator_ PR Automation  
* **Navigate to `https://console.[YOUR DOMAIN].onplural.sh/pr/automations`**  
* **Click `Create a PR` in the `cluster-creator` Automation Object**  
![cluster-creator pr button](/images/how-to/cluster-creator-obj.png)
* **Fill in the Required Fields**  
  * **Name**: The Name of the Cluster
  * **Cloud**: Cloud Provider to Deploy the Cluster (Dropdown Menu)
  * **Fleet**: The Fleet to Associate the cluster
  * **Tier**: The Tier to Place the Cluster
![cluster-creator modal 0](/images/how-to/cluster-creator-modal-0.png)
* **Click `Next`**
* **Enter the Name of the Branch to Create the PR**
![cluster-creator modal 1](/images/how-to/cluster-creator-modal-1.png)
* **Click `Create`**
  * Optionally [View The PR](https://github.com/pluralsh/plrl-how-to/pull/1) that was created
![cluster-creator modal 2](/images/how-to/cluster-creator-modal-2.png)
* **Merge the PR**
* **Approve the Stack Run changes**
  * Navigate to `https://console.[YOUR DOMAIN].onplural.sh/staacks`
* **Click `Pending Approval` Button on the Newly Created Stack** 
![](/images/how-to/pending-approval-btn.png)
* **Once Approved the Stack Run will Execute**



# Troubleshooting
Adding A GH PR Webhook

#### Get Kubeconfig for the MGMT Cluster
```sh
plural wkspace kube-init
```

Use `kubectl` with the newly added kube context  
The key namespaces to check are:   
* plrl-console
* plrl-deploy-operator
* plrl-runtime

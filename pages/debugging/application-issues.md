---
title: Application Issues
description: Figuring out what is going wrong with your deployed applications.
---

Issues with applications are often due to issues with the underlying Pods. You can use `kubectl` commands to get, find logs for, and delete pods as necessary. Note that Plural automatically configures `kubectl` for use with your Plural cluster.

## With Plural CLI

To find Pods related to an application with the CLI, you can run:

```
kubectl get pods -n <application-name>
```

If you see failed Pods, you can get the logs for the Pods by running:

```
kubectl logs -n <application-name> <name-of-pod>
```

To delete problematic Pods, run:

```
kubectl delete pod <pod-name>
```

Then, run `plural bounce` to regenerate your deleted Pods.

## With Plural Console 

If you have the Plural Console installed, you can debug your Kubernetes Pods with the following steps:

1. Navigate to the `Components` tab and click on the failing component
   
2. Scroll to the `Pods` section at the bottom of the screen and hit the red trash can button located on the right of the screen to delete the failing Pod.

3. Head back to the `Builds` tab in the sidebar and click the `Bounce` button in the top right to redeploy your deleted Pods.
---
title: Add Users to an Application
description: How to give end users access to an application installed using Plural.
---

If you've enabled OIDC for a set of applications, you can easily give users or groups access to that application. To enable access to a particular application, you can add permissions via the Plural Marketplace or Plural Console. Any changes made in either the Marketplace or Console will be synced.

## Through Plural Marketplace

Admin users who have installed an application have the ability to add users to that application. To add users, navigate to the installed application in the Plural Marketplace. Click the application and select "OpenID Connect" in the sidebar on the left. This will open the form to add user or group bindings for this application. Add any new users or groups and click "Save" in the bottom right.

![](/assets/operations/marketplace-add-users.png)

## Through Plural Console

Any Plural Console user with permissions to manage users and groups can add users to any installed application. Navigate to the Plural Console and select your application from the Application Overview tab. Click the "User management" option from the menu on the left. This allows you to search for additional user or group bindings to add for access. Add any new users or groups and click "Update" in the bottom right.

![](/assets/operations/add-users-console.png)

For applications not using OIDC, permissions are managed through the individual applications.

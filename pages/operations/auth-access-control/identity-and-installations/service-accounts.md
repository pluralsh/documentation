---
title: Service Accounts
---

Service Accounts are assumable identities, specifically meant to facilitate group management of a set of installations. We recommend using them if you want a team to manage a group of plural applications instead of an individual user.

To create a service account, from [https://app.plural.sh/](https://app.plural.sh/accounts/edit/service-accounts), navigate to account, then service accounts.

From here, you can create a new service account, and attach users or groups.&#x20;

![](/assets/advanced-topics/service-accounts.gif)

Once created, you can impersonate the service account by clicking the impersonate button in the dashboard, or via the CLI:

```
plural login --service-account <service-account-email>
```

In all other respects, service accounts behave just like normal Plural users, and will be present in audit logs, can be used in support chats, and, of course, can install and deploy applications just like users.

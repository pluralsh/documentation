---
title: OpenID Connect
---

All Plural applications have the capability to create a custom OIDC provider for a user's installation. This allows Plural to become a unified identity management solution for your entire open source portfolio. We have even automated upgrades for OIDC configuration changes, so the setup process is entirely turnkey.&#x20;

For more information about adding users to applications using OpenID Connect, see the page on [Adding Users to Applications](/operations/managing-applications/add-users-to-application)

### Login Policies

The provider is mapped to a set of users+groups, just like a Plural role, and if that login policy does not pass, you cannot complete the OIDC login and consent flow. Plural ID tokens will include core user information along with the plural groups they belong to, allowing for seamless identity mapping onto the applications governed by Plural.

### Supported Applications

**Applications that currently support Plural OIDC are:**

- [Plural Console](https://www.plural.sh/applications/console) - includes group provisioning as well
- [Airflow](https://www.plural.sh/applications/airflow)
- [Airbyte](https://www.plural.sh/applications/airbyte)
- [Sentry](https://www.plural.sh/applications/sentry)
- [GitLab](https://www.plural.sh/applications/gitlab)
- [Grafana](https://www.plural.sh/applications/grafana)
- [Argo CD](https://www.plural.sh/applications/argo-cd)

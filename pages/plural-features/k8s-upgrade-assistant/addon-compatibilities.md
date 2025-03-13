---
title: Add-on compatibilities
description: Keep your add-ons compatible with next Kubernetes version
---

Ensuring add-on compatibility across different Kubernetes versions can be challenging as it requires careful planning,
thorough testing, and continuous maintenance to address the evolving nature of Kubernetes and its ecosystem.
Learn how Plural can assist you in that process.

# Compatibility scraping
Plural helps in ensuring that all known third-party add-ons are compatible with the next Kubernetes version
by systematically scraping multiple sources for compatibility information. This includes gathering data from
official documentations, GitHub repositories, and other relevant sources. By consolidating this information,
we create a comprehensive database of add-on compatibility details.

{% callout severity="info" %}
The list of known addons can be found [here](https://github.com/pluralsh/console/blob/master/static/compatibilities/manifest.yaml).
{% /callout %}

# Checking add-on compatibilities
Add-on compatibility data is then made accessible through the Plural Console, where you can easily check
the compatibility status of your add-ons with upcoming Kubernetes versions. This proactive approach helps
to avoid potential issues caused by API changes and other version-specific nuances, ensuring a smoother
transition to newer Kubernetes releases.

    ![addon-compatibilities](/assets/deployments/addon-compatibilities.png)

    ![addon-compatibilities-details.png](/assets/deployments/addon-compatibilities-details.png)

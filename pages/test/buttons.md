---
title: Buttons
---

{% comment %}
https://markdoc.dev/docs/syntax#tags
{% /comment %}

# Standalone buttons

```markdown {% showHeader=false %}
{% button type="floating" href="/" %}A string with **formatted** text and a _local_ link{% /button %}

{% button type="floating" href="http://google.com" %}
A string with **formatted** text and an _external_ link
{% /button %}
```

{% button type="floating" href="/" %}A string with **formatted** text and a _local_ link{% /button %}

{% button type="floating" href="http://google.com" %}
A string with **formatted** text and an _external_ link
{% /button %}

# Button groups


```markdown {% showHeader=false %}
{% buttonGroup %}
{% button href="#" %}Three{% /button %}
{% button href="#" %}buttons{% /button %}
{% button href="#" %}in a row{% /button %}
Non-button content will be ignored
{% /buttonGroup %}
```

{% buttonGroup %}
{% button href="#" %}Three{% /button %}
{% button href="#" %}buttons{% /button %}
{% button href="#" %}in a row{% /button %}
Non-button content will be ignored
{% /buttonGroup %}

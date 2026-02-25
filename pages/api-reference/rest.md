---
title: REST API
description: >-
  Documentation about how to interact with our REST api.
---

# REST API

Plural's primary underlying api is written in GraphQl, as discussed in [our GQL docs](/api-reference/graphql).  That said, REST is often a lot more convenient to use for programmatic access, and a subset of the full functionality for most targeted usecases you might need.

You can inspect our OpenAPI schema using [Redocly API Viewer](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/pluralsh/console/refs/heads/master/schema/openapi.json)

To authenticate to the REST api, just do the following:

1. Create an access token (simple way is `cmd + k -> access tokens`)
2. Add an `Authorization: Token {your-access-token}` header.

In addition, we offer a number of typed clients here: https://github.com/pluralsh/rest-clients

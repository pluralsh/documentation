---
title: MCP Server Authentication and Authorization
description: Understanding how Plural authenticates and authorizes requests to custom MCP servers.
---

# MCP Server Authentication and Authorization

When integrating Plural Flows with a custom MCP server, such as the example provided in the `/mcp` folder of the Plural repository, it's crucial to understand how authentication and authorization are handled to secure your operations. Plural leverages JSON Web Tokens (JWTs) for secure communication between the Plural platform and your MCP server.

## Authentication

The authentication mechanism relies on JWTs signed using a standard algorithm. The public key required to verify these tokens is fetched from a JSON Web Key Set (JWKS) endpoint provided by your Plural console instance.

1.  **Initialization**: Upon startup, the MCP server (as shown in `mcp/src/index.ts`) calls `initializeJWKS()` (from `mcp/src/auth.ts`).
2.  **JWKS Fetching**: The `initializeJWKS` function retrieves the public signing keys from the JWKS URI specified by the `JWKS_URI` environment variable (e.g., `https://your-console-url/.well-known/jwks.json`). It uses the `jwks-rsa` library to fetch and cache the public key. If no signing keys are found, the server fails to start.
3.  **Middleware**: The `authenticateJWT` function acts as Express middleware for the `/sse` and `/messages` endpoints.
4.  **JWT Verification**:
    *   It checks if JWT authentication is enabled via the `JWT_AUTH_ENABLED` environment variable. If not enabled, it skips authentication.
    *   It extracts the Bearer token from the `Authorization` header.
    *   It verifies the token's signature using the fetched public key (`jsonwebtoken` library).
    *   If the token is missing, malformed, invalid, or expired, it returns a `401 Unauthorized` response.

## Authorization

Once a token is successfully authenticated, the server performs authorization based on group membership claims within the JWT payload.

1.  **Group Claim**: The `authenticateJWT` middleware inspects the decoded JWT payload for a `groups` claim, which should be an array of strings representing the groups the authenticated user belongs to within Plural.
2.  **Required Groups**: The server checks the `REQUIRED_GROUPS` environment variable. This variable should contain a comma-separated list of Plural group names that are authorized to interact with this specific MCP server.
3.  **Membership Check**: The middleware verifies if the user's `groups` claim contains at least one of the groups listed in `REQUIRED_GROUPS`.
4.  **Access Control**: If the user belongs to at least one required group, the request is allowed to proceed (by calling `next()`). Otherwise, a `401 Unauthorized` response is returned, indicating the user lacks the necessary permissions.

## Configuration

To enable and configure authentication and authorization in your MCP server based on the `/mcp` example, you need to set the following environment variables:

*   `JWT_AUTH_ENABLED`: Set to `"true"` to enable JWT verification.
*   `JWKS_URI`: The full URL to your Plural console's JWKS endpoint (e.g., `https://your-console-url/.well-known/jwks.json`).
*   `REQUIRED_GROUPS`: A comma-separated string of Plural group names allowed to access the MCP server (e.g., `"sre,devops"`).

By implementing this JWT-based authentication and group-based authorization, you ensure that only authorized users and services within your Plural environment can interact with your custom MCP server, maintaining security for your automated operational tasks. 
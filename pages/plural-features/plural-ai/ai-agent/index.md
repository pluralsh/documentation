---
title: AI agent
description: High-level overview of Plural's background coding agents.
---

Plural's AI agent lets you run background coding tasks against repositories connected to your Plural Console. Agents can analyze or apply code changes, optionally run tests, and report results back into the Console.

## What it can do

Agent can be used in a variety of ways to improve your development workflow and ensure code quality and security.

### Security and maintenance

- Fix vulnerabilities across connected repositories.
- Update dependency versions and regenerate lockfiles.
- Propose remediation PRs for policy or compliance findings.

### Infrastructure changes

- Adjust Terraform to scale resources (for example, database size changes).
- Apply small, targeted changes across environments.
- Validate updates with preconfigured tests.

### Application changes

- Add features, update API contracts, and modify frontend flows.
- Modernize config and templates that support your deployment pipeline.
- Generate documentation or run automated checks after changes.

### Operational workflows

- Investigate issues and summarize root cause analysis.
- Produce draft patches or PR-ready diffs for human review.
- Run validation workflows, including containerized tests and headless browser E2E checks.
- Apply code changes and open a pull request with the updates.

## Next steps

- Run your first agent task by following this [guide](/plural-features/plural-ai/ai-agent/configure-agent).
- Configure browser-assisted testing in [remote browser setup](/plural-features/plural-ai/ai-agent/remote-browser).

import React, { ComponentProps } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const LinkList = styled<any>(props => <ul {...props} />)(_p => ({
  margin: 0,
  padding: 0,
  listStyle: 'none',
}))

const TocLink = styled(({ className, ...props }: ComponentProps<typeof Link>) => (
  <li className={className}>
    <Link {...props} />
  </li>
))(_p => ({
  display: 'block',
  margin: 0,
  padding: 0,
  listStyle: 'none',
}))

const TocSection = styled(({ title, children, ...props }) => (
  <li {...props}>
    <h2>{title}</h2>
    {children}
  </li>
))(_p => ({
  display: 'block',
  margin: 0,
  padding: 0,
  listStyle: 'none',
}))

export const SideNav = styled(props => (
  <nav {...props}>
    <TocSection title="Getting Started">
      <LinkList>
        <TocLink href="/">👋 Introduction</TocLink>
        <TocLink href="/getting-started/getting-started">
          🏁 Quickstart
        </TocLink>
        <TocLink href="/getting-started/video-cli-quickstart">
          📽 Video: CLI Quickstart
        </TocLink>
      </LinkList>
    </TocSection>
    <TocSection title="Basic Setup & Deployment">
      <LinkList>
        <TocLink href="/basic-setup-and-deployment/setting-up-gitops">
          Setting up GitOps
        </TocLink>
        <TocLink href="/basic-setup-and-deployment/admin-console">
          Installing Plural Console
        </TocLink>
        <TocLink href="/basic-setup-and-deployment/openid-connect">
          Using Plural OIDC
        </TocLink>
        <TocLink href="/basic-setup-and-deployment/cloud-shell-quickstart">
          Deploying with Cloud Shell
        </TocLink>
        <TocLink href="/basic-setup-and-deployment/uninstall">
          Destroying the Cluster Safely
        </TocLink>
      </LinkList>
    </TocSection>
    <TocSection title="Applications">
      <TocLink href="/repositories/">Application Catalog</TocLink>

      <LinkList>
        <TocLink href="/repositories/airbyte">Airbyte</TocLink>
        <TocLink href="/repositories/airflow">Airflow</TocLink>
        <TocLink href="/repositories/console">Console</TocLink>
      </LinkList>
      <TocLink href="/adding-new-application/">Add an Application</TocLink>
      <LinkList>
        <TocLink href="/adding-new-application/guide">Guide</TocLink>
        <TocLink href="/adding-new-application/plural-custom-resources">
          Plural Custom Resources
        </TocLink>
        <TocLink href="/adding-new-application/module-library">
          Module Library
        </TocLink>
        <TocLink href="/adding-new-application/getting-started-with-runbooks/">
          Getting Started With Runbooks
        </TocLink>
        <LinkList>
          <TocLink href="/adding-new-application/getting-started-with-runbooks/runbook-xml">
            Runbook XML
          </TocLink>
          <TocLink href="/adding-new-application/getting-started-with-runbooks/runbook-yaml">
            Runbook Yaml
          </TocLink>
        </LinkList>
      </LinkList>
    </TocSection>
    <TocSection title="Advanced Topics">
      <LinkList>
        <TocLink href="/advanced-topics/network-configuration">
          Network Configuration
        </TocLink>
        <TocLink href="/advanced-topics/dns-setup/">
          Setting up Third Party DNS
        </TocLink>
        <LinkList>
          <TocLink href="/advanced-topics/dns-setup/creating-dns-zone-in-your-cloud-provider-console">
            Creating a DNS Zone in Console
          </TocLink>
        </LinkList>
        <TocLink href="/advanced-topics/security/">Security Concepts</TocLink>
        <LinkList>
          <TocLink href="/advanced-topics/security/secret-management">
            Secret Management
          </TocLink>
        </LinkList>
        <TocLink href="/advanced-topics/identity-and-access-management/">
          Auth & Access Control
        </TocLink>
        <LinkList>
          <TocLink href="/advanced-topics/identity-and-access-management/introduction">
            Introduction
          </TocLink>
          <TocLink href="/advanced-topics/identity-and-access-management/openid-connect">
            OpenID Connect
          </TocLink>
          <TocLink href="/advanced-topics/identity-and-access-management/api-tokens">
            API Tokens
          </TocLink>
          <TocLink href="/advanced-topics/identity-and-access-management/identity-and-installations/">
            Identity and Installations
          </TocLink>
          <LinkList>
            <TocLink href="/advanced-topics/identity-and-access-management/identity-and-installations/audit-logging">
              Audit Logging
            </TocLink>
            <TocLink href="/advanced-topics/identity-and-access-management/identity-and-installations/service-accounts">
              Service Accounts
            </TocLink>
            <TocLink href="/advanced-topics/identity-and-access-management/identity-and-installations/sharing-existing-repos">
              Sharing Existing Repos
            </TocLink>
          </LinkList>
        </LinkList>
        <TocLink href="/advanced-topics/debugging/">Debugging</TocLink>
        <LinkList>
          <TocLink href="/advanced-topics/debugging/health-checks">
            Health Checks
          </TocLink>
          <TocLink href="/advanced-topics/debugging/proxies">Proxies</TocLink>
          <TocLink href="/advanced-topics/debugging/logs">Logs</TocLink>
        </LinkList>
      </LinkList>
    </TocSection>
    <TocSection title="Reference">
      <TocLink href="/reference/troubleshooting">🪛 Troubleshooting</TocLink>
      <TocLink href="/reference/operator-guides/">📚 Operator Guides</TocLink>
      <LinkList>
        <TocLink href="/reference/operator-guides/cloud-shell">
          Cloud Shell
        </TocLink>
        <TocLink href="/reference/operator-guides/adding-kubecost-for-cost-analysis">
          Adding Kubecost for Cost Analysis
        </TocLink>
      </LinkList>
      <TocLink href="/reference/architecture-1">🏗 Architecture</TocLink>
      <TocLink href="/reference/workspaces/">🖥 Workspaces</TocLink>
      <LinkList>
        <TocLink href="/reference/workspaces/workspace-structure">
          Workspace Structure
        </TocLink>
      </LinkList>
      <TocLink href="/reference/api/">🛠 Developer Tools / API</TocLink>
      <LinkList>
        <TocLink href="/reference/api/plural-api">Plural API</TocLink>
        <TocLink href="/reference/api/console-api">Console API</TocLink>
      </LinkList>
      <TocLink href="/reference/configuring-cloud-provider">
        ☁ Cloud Provider CLI Setup
      </TocLink>
    </TocSection>
  </nav>
))`
  position: sticky;
  top: var(--top-nav-height);
  height: calc(100vh - var(--top-nav-height));
  flex: 0 0 auto;
  overflow-y: auto;
  padding: 2.5rem 2rem 2rem;
  border-right: 1px solid var(--border-color);
  max-width: 300px;
`

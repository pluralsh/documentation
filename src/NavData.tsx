import {
  ApiIcon,
  ArchitectureIcon,
  BookIcon,
  CloudIcon,
  DocumentIcon,
  MagicWandIcon,
  ToolIcon,
  VideoIcon,
  WorkspaceIcon,
  // RunBookIcon,
} from 'pluralsh-design-system'
import { ReactElement } from 'react'
import deepFreeze from 'deep-freeze'

export type NavItem = {
  title?: string
  href?: string
  icon?: ReactElement
  sections?: NavItem[]
}

export type NavData = NavItem[]

const data: NavData = [
  {
    title: 'Getting Started',
    sections: [
      {
        title: 'Introduction',
        href: '/',
        icon: <DocumentIcon />,
      },
      {
        title: 'Quickstart',
        href: '/getting-started/getting-started',
        icon: <MagicWandIcon />,
      },
      {
        href: '/getting-started/video-cli-quickstart',
        title: 'Video: CLI Quickstart',
        icon: <VideoIcon />,
      },
    ],
  },
  {
    title: 'Basic Setup & Deployment',
    sections: [
      {
        href: '/basic-setup-and-deployment/setting-up-gitops',
        title: 'Setting up GitOps',
      },
      {
        href: '/basic-setup-and-deployment/admin-console',
        title: 'Installing Plural Console',
      },
      {
        href: '/basic-setup-and-deployment/openid-connect',
        title: 'Using Plural OIDC',
      },
      {
        href: '/basic-setup-and-deployment/cloud-shell-quickstart',
        title: 'Deploying with Cloud Shell',
      },
      {
        href: '/basic-setup-and-deployment/uninstall',
        title: 'Destroying the Cluster Safely',
      },
    ],
  },
  {
    title: 'Applications',
    sections: [
      {
        href: '/repositories',
        title: 'Application Catalog',
        sections: [
          { href: '/repositories/airbyte', title: 'Airbyte' },
          { href: '/repositories/airflow', title: 'Airflow' },
          { href: '/repositories/console', title: 'Console' },
        ],
      },
      {
        href: '/adding-new-application',
        title: 'Add an Application',
        sections: [
          { href: '/adding-new-application/guide', title: 'Guide' },
          {
            href: '/adding-new-application/plural-custom-resources',
            title: 'Plural Custom Resources',
          },
          {
            href: '/adding-new-application/module-library',
            title: 'Module Library',
          },
          {
            href: '/adding-new-application/getting-started-with-runbooks',
            title: 'Getting Started With Runbooks',
            // icon: <RunBookIcon />,
            sections: [
              {
                href: '/adding-new-application/getting-started-with-runbooks/runbook-xml',
                title: '  Runbook XML',
              },
              {
                href: '/adding-new-application/getting-started-with-runbooks/runbook-yaml',
                title: '  Runbook Yaml',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Advanced Topics',
    sections: [
      {
        href: '/advanced-topics/network-configuration',
        title: 'Network Configuration',
      },
      {
        href: '/advanced-topics/dns-setup',
        title: 'Setting up Third Party DNS',
        sections: [
          {
            href: '/advanced-topics/dns-setup/creating-dns-zone-in-your-cloud-provider-console',
            title: '  Creating a DNS Zone in Console',
          },
        ],
      },
      {
        href: '/advanced-topics/security',
        title: 'Security Concepts',
        sections: [
          {
            href: '/advanced-topics/security/secret-management',
            title: '  Secret Management',
          },
        ],
      },
      {
        href: '/advanced-topics/identity-and-access-management',
        title: 'Auth & Access Control',
        sections: [
          {
            href: '/advanced-topics/identity-and-access-management/introduction',
            title: 'Introduction',
          },
          {
            href: '/advanced-topics/identity-and-access-management/openid-connect',
            title: 'OpenID Connect',
          },
          {
            href: '/advanced-topics/identity-and-access-management/api-tokens',
            title: 'API Tokens',
          },
          {
            href: '/advanced-topics/identity-and-access-management/identity-and-installations',
            title: 'Identity and Installations',
            sections: [
              {
                href: '/advanced-topics/identity-and-access-management/identity-and-installations/audit-logging',
                title: 'Audit Logging',
              },
              {
                href: '/advanced-topics/identity-and-access-management/identity-and-installations/service-accounts',
                title: 'Service Accounts',
              },
              {
                href: '/advanced-topics/identity-and-access-management/identity-and-installations/sharing-existing-repos',
                title: 'Sharing Existing Repos',
              },
            ],
          },
        ],
      },
      {
        href: '/advanced-topics/debugging',
        title: 'Debugging',
        sections: [
          {
            href: '/advanced-topics/debugging/health-checks',
            title: '  Health Checks',
          },
          {
            href: '/advanced-topics/debugging/proxies',
            title: 'Proxies',
          },
          {
            href: '/advanced-topics/debugging/logs',
            title: 'Logs',
          },
        ],
      },
    ],
  },
  {
    title: 'Reference',
    sections: [
      {
        title: 'Troubleshooting',
        href: '/reference/troubleshooting',
        icon: <ToolIcon />,
      },
      {
        title: 'Operator Guides',
        href: '/reference/operator-guides',
        icon: <BookIcon />,
        sections: [
          {
            title: 'Cloud Shell',
            href: '/reference/operator-guides/cloud-shell',
          },
          {
            title: 'Adding Kubecost for Cost Analysis',
            href: '/reference/operator-guides/adding-kubecost-for-cost-analysis',
          },
        ],
      },
      {
        title: 'Architecture',
        href: '/reference/architecture-1',
        icon: <ArchitectureIcon />,
      },
      {
        title: 'Workspaces',
        href: '/reference/workspaces',
        icon: <WorkspaceIcon />,
        sections: [
          {
            title: 'Workspace Structure',
            href: '/reference/workspaces/workspace-structure',
          },
        ],
      },
      {
        title: 'Developer Tools / API',
        href: '/reference/api',
        icon: <ApiIcon />,
        sections: [
          {
            href: '/reference/api/plural-api',
            title: 'Plural API',
          },
          {
            title: 'Console API',
            href: '/reference/api/console-api',
          },
        ],
      },
      {
        title: 'Cloud Provider CLI Setup',
        href: '/reference/configuring-cloud-provider',
        icon: <CloudIcon />,
      },
    ],
  },
  // {
  //   title: 'Test Pages',
  //   sections: [{ title: 'Callouts', href: '/test/callouts' }],
  // },
]

export default deepFreeze(data)

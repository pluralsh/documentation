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
        href: '/getting-started/quickstart',
        icon: <MagicWandIcon />,
      },
      {
        href: '/getting-started/video-cli-quickstart',
        title: 'Video: CLI Quickstart',
        icon: <VideoIcon />,
      },
      {
        href: '/getting-started/cloud-shell-quickstart',
        title: 'Deploying with Cloud Shell',
      },
      {
        href: '/getting-started/setting-up-gitops',
        title: 'Setting up GitOps',
      },
      {
        href: '/getting-started/admin-console',
        title: 'Installing Plural Console',
      },
      {
        href: '/getting-started/openid-connect',
        title: 'Using Plural OIDC',
      },
    ],
  },
  {
    title: 'Applications',
    sections: [
      {
        href: '/applications',
        title: 'Application Catalog',
        sections: [
          { href: '/applications/airbyte', title: 'Airbyte' },
          { href: '/applications/airflow', title: 'Airflow' },
          { href: '/applications/console', title: 'Console' },
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
            sections: [
              {
                href: '/adding-new-application/getting-started-with-runbooks/runbook-xml',
                title: '  XML Runbooks',
              },
              {
                href: '/adding-new-application/getting-started-with-runbooks/runbook-yaml',
                title: '  YAML Runbooks',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Operations',
    sections: [
      {
        href: '/operations/network-configuration',
        title: 'Network Configuration',
      },
      {
        href: '/operations/dns-setup',
        title: 'Setting up Third Party DNS',
        sections: [
          {
            href: '/operations/dns-setup/creating-dns-zone-in-your-cloud-provider-console',
            title: '  Creating a DNS Zone in Console',
          },
        ],
      },
      {
        href: '/operations/security',
        title: 'Security',
        sections: [
          {
            href: '/operations/security/secret-management',
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
        title: 'Workspaces',
        href: '/reference/workspaces',
        icon: <WorkspaceIcon />,
      },
      {
        title: 'API / Developer Tools',
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
  //   sections: [{ title: 'Blockquotes', href: '/test/blockquotes' }],
  // },
]

export default deepFreeze(data)

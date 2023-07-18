import type { ReactElement } from 'react'

import deepFreeze from 'deep-freeze'

import { APP_CATALOG_BASE_URL } from './consts/routes'

import type { Repo } from './data/getRepos'

export type NavMenuId = 'docs' | 'appCatalog'
export type MenuId = NavMenuId | 'plural'
export type NavData = Record<NavMenuId, NavMenu>

export type NavItem = {
  title?: string
  href?: string
  toMenu?: MenuId
  icon?: ReactElement
  sections?: NavItem[]
}

export type NavMenu = NavItem[]

export function findNavItem(
  test: (arg: NavItem) => boolean,
  section: NavMenu
): NavItem | null {
  for (const item of section) {
    if (test(item)) {
      return item
    }

    const search = findNavItem(test, item.sections || [])

    if (search) {
      return search
    }
  }

  return null
}

const rootNavData: NavMenu = deepFreeze([
  {
    title: 'Overview',
    sections: [
      {
        title: 'Introduction',
        href: '/introduction',
      },
      {
        title: 'What makes Plural different?',
        href: '/getting-started/plural-difference',
      },
      {
        title: 'Concepts',
        href: '/getting-started/concepts',
      },
      {
        title: 'How much does it cost?',
        href: '/operations/pricing-calculator',
      },
    ],
  },
  {
    title: 'Getting Started',
    sections: [
      {
        title: 'Quickstart with our CLI',
        href: '/getting-started/quickstart',
      },
      {
        href: '/getting-started/cloud-shell-quickstart',
        title: 'Quickstart from your Browser',
      },
      {
        href: '/getting-started/admin-console',
        title: 'Installing Plural Console',
      },
    ],
  },
  {
    title: 'How To',
    sections: [
      {
        title: 'Configure my Cluster',
        href: '/operations/cluster-configuration',
      },
      {
        href: '/operations/managing-applications/add-application-to-cluster',
        title: 'Add an Application to a Cluster',
      },
      {
        href: '/operations/managing-applications/add-users-to-application',
        title: 'Add Users to an Application',
      },
      {
        href: '/operations/managing-applications/update-application',
        title: 'Update an Application',
      },
      {
        href: '/operations/managing-applications/delete-application',
        title: 'Delete an Application',
      },
      {
        href: '/operations/managing-applications/bounce-application',
        title: 'Bounce an Application',
      },
      {
        href: '/operations/managing-applications/connect-application-db',
        title: 'Connect to Application DB',
      },
      {
        href: '/operations/managing-applications/credentials-non-oidc',
        title: 'Find Credentials for non-OIDC applications',
      },
      {
        href: '/operations/managing-applications/customize-application',
        title: 'Customize an Application',
      },
      {
        href: '/operations/network-configuration',
        title: 'Configure your Network',
      },
      {
        title: 'Debug issues on your Plural Cluster',
        href: '/debugging/application-issues',
      },
      {
        href: '/operations/uninstall',
        title: 'Destroy the Cluster Safely',
      },
      {
        href: '/operations/dns-setup',
        title: 'Set up Third Party DNS',
        sections: [
          {
            href: '/operations/dns-setup/creating-dns-zone-in-your-cloud-provider-console',
            title: 'Creating a DNS Zone in Console',
          },
        ],
      },
      {
        href: '/operations/cost-management',
        title: 'Optimize Cluster Costs',
      },
      {
        href: '/adding-new-application/getting-started-with-runbooks',
        title: 'Create an Application Runbook',
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
      {
        href: '/operations/auth-access-control/api-tokens',
        title: 'Create Persistent API Tokens',
      },
      {
        title: 'Share your Plural Git Repository',
        href: '/getting-started/manage-git-repositories/sharing-git-repositories',
      },
      {
        title: 'Create Multiple Plural Clusters',
        href: '/operations/auth-access-control/identity-and-installations/service-accounts',
      },
      {
        href: '/adding-new-application',
        title: 'Contribute a New Application to the Plural Catalog',
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
        ],
      },
      {
        href: '/first-party/manage-your-microservices',
        title: 'Manage your Own Services with Plural',
      },
    ],
  },
  {
    title: 'FAQ',
    sections: [
      {
        href: '/operations/security',
        title: 'What does Plural have access to?',
      },
      {
        href: '/operations/auth-access-control/openid-connect',
        title: 'What is Plural OIDC?',
      },
      {
        href: '/operations/auth-access-control/identity-and-installations/audit-logging',
        title: 'What audit logging does Plural do?',
      },
      {
        href: '/operations/auth-access-control/identity-and-installations',
        title: 'How does auth and access control work for Plural?',
      },
      {
        href: '/debugging',
        title: 'What debugging tools are available for Plural?',
        sections: [
          {
            href: '/debugging/health-checks',
            title: '  Health Checks',
          },
          {
            href: '/debugging/proxies',
            title: 'Proxies',
          },
          {
            href: '/debugging/logs',
            title: 'Logs',
          },
        ],
      },
      {
        href: '/faq/certifications',
        title: 'What certifications does Plural have?',
      },
      {
        href: '/faq/plural-paid-tiers',
        title: 'How do the paid Plural tiers work?',
      },
      {
        href: '/faq/local-development',
        title: 'Can I develop locally?',
      },
    ],
  },
  {
    title: 'Application Catalog',
    sections: [
      {
        href: APP_CATALOG_BASE_URL,
        toMenu: 'appCatalog',
        title: 'Application Catalog',
      },
    ],
  },
  {
    title: 'Reference',
    sections: [
      {
        title: 'Cloud Provider CLI Setup',
        href: '/reference/configuring-cloud-provider',
      },
      {
        title: 'Common Errors',
        href: '/reference/troubleshooting',
      },
      {
        title: 'Handling Partial Deployments',
        href: '/reference/partial-installation',
      },
      {
        href: '/getting-started/manage-git-repositories',
        title: 'Manage Git Repositories',
        sections: [
          {
            href: '/getting-started/manage-git-repositories/setting-up-gitops',
            title: 'Setting Up GitOps',
          },
          {
            href: '/getting-started/manage-git-repositories/workspace-encryption',
            title: 'Workspace Encryption Guide',
          },
        ],
      },
      {
        href: '/getting-started/manage-git-repositories/your-plural-workspace',
        title: 'Plural Workspace Layout',
      },
      {
        title: 'API / Developer Tools',
        href: '/reference/api',
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
        title: 'CLI Command Reference',
        href: '/reference/cli-reference',
      },
      {
        href: '/adding-new-application/plural-custom-resources',
        title: 'Plural Custom Resources',
      },
      {
        href: '/adding-new-application/module-library',
        title: 'Module Library',
      },
    ],
  },
  {
    title: 'Changelog',
    sections: [
      {
        href: '/reference/release-notes',
        title: 'Release Notes',
      },
    ],
  },
])

export const getNavData = ({ repos }: { repos: Repo[] }): NavData => ({
  docs: rootNavData,
  appCatalog: [
    {
      title: 'Application Catalog',
      href: APP_CATALOG_BASE_URL,
      sections: [
        { title: 'Catalog Overview', href: APP_CATALOG_BASE_URL },
        ...repos.map((repo) => ({
          title: repo.displayName,
          href: `${APP_CATALOG_BASE_URL}/${repo.name}`,
        })),
      ],
    },
  ],
})

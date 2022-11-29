import type { ReactElement } from 'react'

import {
  CloudIcon,
  DocumentIcon,
  GitHubIcon,
  GraphIcon,
  MagicWandIcon,
  PadlockIcon,
  VideoIcon,
} from '@pluralsh/design-system'

import deepFreeze from 'deep-freeze'

import { APP_CATALOG_BASE_URL } from './consts/routes'
import { RepoFragment } from './data/queries/recipesQueries'
import { useFragment as asFragment } from './gql/fragment-masking'

import type { FragmentType } from './gql/fragment-masking'

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

export function findNavItem(test: (arg: NavItem) => boolean,
  section: NavMenu): NavItem | null {
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
        title: 'Deploy with Cloud Shell',
        icon: <CloudIcon />,
      },
      {
        href: '/getting-started/manage-git-repositories',
        title: 'Manage Git Repositories',
        icon: <GitHubIcon />,
        sections: [
          { href: '/getting-started/manage-git-repositories/setting-up-gitops', title: 'Setting Up GitOps' },
          { href: '/getting-started/manage-git-repositories/your-plural-workspace', title: 'Your Plural Workspace' },
          { href: '/getting-started/manage-git-repositories/sharing-git-repositories', title: 'Sharing Your Git Repositories' },
        ],
      },
      {
        href: '/getting-started/admin-console',
        title: 'Install Plural Console',
        icon: <GraphIcon />,
      },
      {
        href: '/getting-started/openid-connect',
        title: 'Plural OIDC',
        icon: <PadlockIcon />,
      },
    ],
  },
  {
    title: 'Applications',
    sections: [
      {
        href: APP_CATALOG_BASE_URL,
        toMenu: 'appCatalog',
        title: 'Application Catalog',
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
        href: '/operations/managing-applications',
        title: 'Managing Applications',
        sections: [
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
        ],
      },
      {
        href: '/operations/network-configuration',
        title: 'Network Configuration',
      },
      {
        href: '/operations/uninstall',
        title: 'Destroying the Cluster Safely',
      },
      {
        href: '/operations/dns-setup',
        title: 'Setting up Third Party DNS',
        sections: [
          {
            href: '/operations/dns-setup/creating-dns-zone-in-your-cloud-provider-console',
            title: 'Creating a DNS Zone in Console',
          },
        ],
      },
      {
        href: '/operations/security',
        title: 'Security',
      },
      {
        href: '/operations/auth-access-control',
        title: 'Auth & Access Control',
        sections: [
          {
            href: '/operations/auth-access-control/openid-connect',
            title: 'OpenID Connect',
          },
          {
            href: '/operations/auth-access-control/api-tokens',
            title: 'API Tokens',
          },
          {
            href: '/operations/auth-access-control/identity-and-installations',
            title: 'Identity and Installations',
            sections: [
              {
                href: '/operations/auth-access-control/identity-and-installations/audit-logging',
                title: 'Audit Logging',
              },
              {
                href: '/operations/auth-access-control/identity-and-installations/service-accounts',
                title: 'Service Accounts',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Debugging',
    sections: [
      {
        href: '/debugging',
        title: 'Debugging',
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
        title: 'Troubleshooting',
        href: '/reference/troubleshooting',
      },
    ],
  },
  {
    title: 'Reference',
    sections: [
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
        title: 'Cloud Provider CLI Setup',
        href: '/reference/configuring-cloud-provider',
      },
    ],
  },
  // {
  //   title: 'Test Pages',
  //   sections: [{ title: 'Callouts', href: '/test/callouts' }],
  //   sections: [{ title: 'Blockquotes', href: '/test/blockquotes' }],
  // },
])

export const getNavData = ({
  repos,
}: {
  repos: FragmentType<typeof RepoFragment>[]
}): NavData => ({
  docs: rootNavData,
  appCatalog: [
    {
      title: 'Application Catalog',
      sections: [
        { title: 'Repository Documentation', href: APP_CATALOG_BASE_URL },
        ...repos.map(r => {
          const repo = asFragment(RepoFragment, r)

          return {
            title: repo.name,
            href: `${APP_CATALOG_BASE_URL}/${repo.name}`,
          }
        }),
      ],
    },
  ],
})

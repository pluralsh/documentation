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
    title: 'Introduction',
    href: '/introduction',
  },
  {
    title: 'AI',
    sections: [
      {
        title: 'AI Architecture',
        href: '/ai/architecture',
      },
      {
        title: 'AI Cost',
        href: '/ai/cost',
      },
      {
        title: 'AI Overview',
        href: '/ai/overview',
      },
      {
        title: 'AI Setup',
        href: '/ai/setup',
      },
    ],
    href: '/ai',
  },
  {
    title: 'Deployments',
    sections: [
      {
        title: 'Advanced Configuration',
        href: '/deployments/advanced-configuration',
      },
      {
        title: 'Deployments Architecture',
        href: '/deployments/architecture',
      },
      {
        title: 'CLI Quickstart',
        href: '/deployments/cli-quickstart',
      },
      {
        title: 'Kubernetes Dashboard',
        href: '/deployments/dashboard',
      },
      {
        title: 'Deprecations',
        href: '/deployments/deprecations',
      },
      {
        title: 'Using Existing Cluster',
        href: '/deployments/existing-cluster',
      },
      {
        title: 'Projects and Multi Tenancy',
        href: '/deployments/multi-tenancy',
      },
      {
        title: 'Network Configuration',
        href: '/deployments/network-configuration',
      },
      {
        title: 'Notifications',
        href: '/deployments/notifications',
      },
      {
        title: 'Operator',
        sections: [
          {
            title: 'Operator API Reference',
            href: '/deployments/operator/api',
          },
          {
            title: 'Operator Architecture',
            href: '/deployments/operator/architecture',
          },
          {
            title: 'Git Service',
            href: '/deployments/operator/git-service',
          },
          {
            title: 'Global Service',
            href: '/deployments/operator/global-service',
          },
          {
            title: 'Helm Service',
            href: '/deployments/operator/helm-service',
          },
        ],
        href: '/deployments/operator',
      },
      {
        title: 'PR',
        sections: [
          {
            title: 'PR CRDs',
            href: '/deployments/pr/crds',
          },
          {
            title: 'PR Pipelines',
            href: '/deployments/pr/pipelines',
          },
          {
            title: 'PR Testing',
            href: '/deployments/pr/testing',
          },
        ],
        href: '/deployments/pr',
      },
      {
        title: 'PR Automation',
        href: '/deployments/pr-automation',
      },
      {
        title: 'Private CA',
        href: '/deployments/private-ca',
      },
      {
        title: 'Sandboxing',
        href: '/deployments/sandboxing',
      },
      {
        title: 'Stacks',
        href: '/deployments/stacks',
      },
      {
        title: 'Templating Filters',
        href: '/deployments/templating-filters',
      },
      {
        title: 'Service Templating',
        href: '/deployments/templating',
      },
      {
        title: 'Terraform Interoperability',
        href: '/deployments/terraform-interop',
      },
      {
        title: 'Using the Operator',
        href: '/deployments/using-operator',
      },
    ],
    href: '/deployments',
  },
  {
    title: 'Faq',
    sections: [
      {
        title: 'Security FAQ',
        href: '/faq/security',
      },
      {
        title: 'Plural OIDC FAQ',
        href: '/faq/plural-oidc',
      },
      {
        title: 'Certifications FAQ',
        href: '/faq/certifications',
      },
      {
        title: 'Paid Tiers FAQ',
        href: '/faq/paid-tiers',
      },
    ],
    href: '/faq',
  },
  {
    title: 'Getting Started',
    sections: [
      {
        title: 'Getting Started with Deployments',
        href: '/getting-started/deployments',
      },
    ],
    href: '/getting-started',
  },
  {
    title: 'How To Guides',
    sections: [
      {
        title: 'Deploy',
        sections: [
          {
            title: 'Deploy Microservice',
            href: '/how-to/deploy/microservice',
          },
          {
            title: 'Deploy Pipelines',
            href: '/how-to/deploy/pipelines',
          },
          {
            title: 'Deploy PR Automation',
            href: '/how-to/deploy/pr-automation',
          },
        ],
        href: '/how-to/deploy',
      },
      {
        title: 'Set Up',
        sections: [
          {
            title: 'Set Up Controllers',
            href: '/how-to/set-up/controllers',
          },
          {
            title: 'Set Up Management Cluster',
            href: '/how-to/set-up/mgmt-cluster',
          },
          {
            title: 'Set Up RBAC',
            href: '/how-to/set-up/rbac',
          },
          {
            title: 'Set Up SCM Connection',
            href: '/how-to/set-up/scm-connection',
          },
          {
            title: 'Set Up Workload Cluster',
            href: '/how-to/set-up/workload-cluster',
          },
        ],
        href: '/how-to/set-up',
      },
    ],
    href: '/how-to',
  },
  {
    title: 'Reference',
    sections: [
      {
        title: 'Release Notes',
        href: '/reference/release-notes',
      },
    ],
    href: '/reference',
  },
  {
    title: 'Service Catalog',
    sections: [
      {
        title: 'Contributing to Service Catalog',
        href: '/service-catalog/contributing',
      },
      {
        title: 'Create Service Catalog',
        href: '/service-catalog/creation',
      },
      {
        title: 'Service Catalog Overview',
        href: '/service-catalog/overview',
      },
    ],
    href: '/service-catalog',
  },
  {
    title: 'Stacks',
    sections: [
      {
        title: 'Auto-Cancellation',
        href: '/stacks/auto-cancellation',
      },
      {
        title: 'Custom Stacks',
        href: '/stacks/custom-stacks',
      },
      {
        title: 'Customize Stack Runners',
        href: '/stacks/customize-runners',
      },
      {
        title: 'Local Execution',
        href: '/stacks/local-execution',
      },
      {
        title: 'Manual Runs',
        href: '/stacks/manual-runs',
      },
      {
        title: 'PR Workflow',
        href: '/stacks/pr-workflow',
      },
    ],
    href: '/stacks',
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

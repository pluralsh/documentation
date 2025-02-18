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
    ],
  },
  {
    title: 'Plural Fleet Management',
    sections: [
      {
        href: '/getting-started/deployments',
        title: 'Getting Started',
        sections: [
          {
            title: 'Architecture',
            href: '/deployments/architecture',
          },
          {
            title: 'Quickstart with our CLI',
            href: '/deployments/cli-quickstart',
          },
          {
            href: '/deployments/existing-cluster',
            title: 'Set Up on your own Cluster',
          },
          {
            href: '/deployments/advanced-configuration',
            title: 'Advanced Configuration',
            sections: [
              {
                title: 'Sandboxing Your Cluster',
                href: '/deployments/sandboxing',
              },
              {
                title: 'Network Configuration',
                href: '/deployments/network-configuration',
              },
              {
                title: 'Private CAs',
                href: '/deployments/private-ca',
              },
            ],
          },
        ],
      },
      {
        href: '/how-to',
        title: 'How To Use Plural',
        sections: [
          {
            title: 'Setting Up Your Management Cluster',
            href: '/how-to/set-up/mgmt-cluster',
          },
          {
            title: 'Setting Up Your Kubernetes Dashboard with RBAC',
            href: '/how-to/set-up/rbac',
          },
          {
            title: 'Integrate with your Source Control Provider',
            href: '/how-to/set-up/scm-connection',
          },
          {
            title: 'Set Up Your First Workload Cluster',
            href: '/how-to/set-up/workload-cluster',
          },
          {
            title: 'Set Up a Network Stack and other K8s Add-Ons',
            href: '/how-to/set-up/controllers',
          },
          {
            title: 'Set Up a Basic Self-Service Worklfow with PR Automations',
            href: '/how-to/deploy/pr-automation',
          },
          {
            title: 'Deploy Your First Microservice to a Workload Cluster',
            href: '/how-to/deploy/microservice',
          },
          {
            title: 'Setup Your First Microservice Promotion Pipeline',
            href: '/how-to/deploy/pipelines',
          },
        ],
      },
      {
        title: 'API Reference',
        href: '/deployments/operator/api',
      },
      {
        href: '/deployments/using-operator',
        title: 'Deploying Using Plural Continuous Deployment',
        sections: [
          {
            title: 'Architecture',
            href: '/deployments/operator/architecture',
          },
          {
            title: 'Git Services',
            href: '/deployments/operator/git-service',
          },
          {
            title: 'Helm Services',
            href: '/deployments/operator/helm-service',
          },
          {
            title: 'Global Services',
            href: '/deployments/operator/global-service',
          },
        ],
      },
      {
        href: '/deployments/stacks/',
        title: 'IaC Management with Stacks',
        sections: [
          {
            title: 'Customizing Stack Runners',
            href: '/stacks/customize-runners',
          },
          {
            title: 'Pull Request Workflow',
            href: '/stacks/pr-workflow',
          },
          {
            title: 'Manual Runs',
            href: '/stacks/manual-runs',
          },
          {
            title: 'Executing IaC Locally',
            href: '/stacks/local-execution',
          },
          {
            title: 'Custom Stacks',
            href: '/stacks/custom-stacks',
          },
          {
            title: 'Auto-Cancellation',
            href: '/stacks/auto-cancellation',
          },
          {
            href: '/deployments/terraform-interop',
            title: 'Service Contexts',
          },
        ],
      },
      {
        href: '/deployments/pr-automation',
        title: 'Pull Request Automation',
        sections: [
          {
            title: 'On Demand Pull Requests',
            href: '/deployments/pr/crds',
          },
          {
            title: 'Testing PR Automations',
            href: '/deployments/pr/testing',
          },
          {
            title: 'Pull Request Pipelines',
            href: '/deployments/pr/pipelines',
          },
        ],
      },
      {
        href: '/deployments/multi-tenancy',
        title: 'Projects and Multi-Tenancy',
      },
      {
        href: '/deployments/dashboard',
        title: 'Kubernetes Dashboard',
      },
      {
        href: '/deployments/templating',
        title: 'Service Templating',
        sections: [
          {
            href: '/deployments/templating-filters',
            title: 'Supported Liquid Filters',
          },
        ],
      },
      {
        href: '/deployments/notifications',
        title: 'Notifications',
      },
      {
        title: 'Deprecations and upgrades',
        href: '/deployments/deprecations',
      },
    ],
  },
  {
    title: 'Plural AI',
    sections: [
      {
        href: '/ai/overview',
        title: 'What is Plural AI?',
      },
      {
        href: '/ai/setup',
        title: 'Setting Up Plural AI',
      },
      {
        href: '/ai/architecture',
        title: 'How Plural AI Works',
      },
      {
        href: '/ai/cost',
        title: 'How Much Will Plural AI Cost',
      },
    ],
  },
  {
    title: 'Service Catalog',
    sections: [
      {
        href: '/service-catalog/overview',
        title: 'Overview',
      },
      {
        href: '/service-catalog/creation',
        title: 'Creating Your Own Catalog',
      },
      {
        href: '/service-catalog/contributing',
        title: 'Contributing to the Mainline Plural Catalog',
      },
    ],
  },
  {
    title: 'FAQ',
    sections: [
      {
        href: '/faq/01-security',
        title: 'What does Plural have access to?',
      },
      {
        href: '/faq/02-plural-oidc',
        title: 'What is Plural OIDC?',
      },
      {
        href: '/faq/03-certifications',
        title: 'What certifications does Plural have?',
      },
      {
        href: '/faq/04-paid-tiers',
        title: 'How do the paid Plural tiers work?',
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

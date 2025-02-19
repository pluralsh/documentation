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
        href: '/overview/introduction',
      },
      {
        title: 'Architecture',
        href: '/overview/architecture',
      },
    ],
    href: '/overview',
  },
  {
    title: 'Getting Started',
    sections: [
      {
        title: 'First Steps',
        sections: [
          {
            title: 'CLI Quickstart',
            href: '/getting-started/first-steps/cli-quickstart',
          },
          {
            title: 'Existing Cluster',
            href: '/getting-started/first-steps/existing-cluster',
          },
        ],
        href: '/getting-started/first-steps',
      },
      {
        title: 'How To Use',
        sections: [
          {
            title: 'Management Cluster',
            href: '/getting-started/how-to-use/mgmt-cluster',
          },
          {
            title: 'RBAC',
            href: '/getting-started/how-to-use/rbac',
          },
          {
            title: 'SCM Connection',
            href: '/getting-started/how-to-use/scm-connection',
          },
          {
            title: 'Workload Cluster',
            href: '/getting-started/how-to-use/workload-cluster',
          },
          {
            title: 'Controllers',
            href: '/getting-started/how-to-use/controllers',
          },
          {
            title: 'PR Automation',
            href: '/getting-started/how-to-use/pr-automation',
          },
          {
            title: 'Microservice',
            href: '/getting-started/how-to-use/microservice',
          },
          {
            title: 'Pipelines',
            href: '/getting-started/how-to-use/pipelines',
          },
        ],
        href: '/getting-started/how-to-use',
      },
      {
        title: 'Advanced Config',
        sections: [
          {
            title: 'Sandboxing',
            href: '/getting-started/advanced-config/sandboxing',
          },
          {
            title: 'Network Configuration',
            href: '/getting-started/advanced-config/network-configuration',
          },
          {
            title: 'Private CA',
            href: '/getting-started/advanced-config/private-ca',
          },
        ],
        href: '/getting-started/advanced-config',
      },
    ],
    href: '/getting-started',
  },
  {
    title: 'Plural Features',
    sections: [
      {
        title: 'Continuous Deployment',
        sections: [
          {
            title: 'Deployment Architecture',
            href: '/plural-features/continuous-deployment/deployment-architecture',
          },
          {
            title: 'Git Service',
            href: '/plural-features/continuous-deployment/git-service',
          },
          {
            title: 'Helm Service',
            href: '/plural-features/continuous-deployment/helm-service',
          },
          {
            title: 'Global Service',
            href: '/plural-features/continuous-deployment/global-service',
          },
        ],
        href: '/plural-features/continuous-deployment',
      },
      {
        title: 'Stacks Iac Management',
        sections: [
          {
            title: 'Customize Runners',
            href: '/plural-features/stacks-iac-management/customize-runners',
          },
          {
            title: 'PR Workflow',
            href: '/plural-features/stacks-iac-management/pr-workflow',
          },
          {
            title: 'Manual Runs',
            href: '/plural-features/stacks-iac-management/manual-runs',
          },
          {
            title: 'Local Execution',
            href: '/plural-features/stacks-iac-management/local-execution',
          },
          {
            title: 'Custom Stacks',
            href: '/plural-features/stacks-iac-management/custom-stacks',
          },
          {
            title: 'Auto Cancellation',
            href: '/plural-features/stacks-iac-management/auto-cancellation',
          },
          {
            title: 'Service Contexts',
            href: '/plural-features/stacks-iac-management/service-contexts',
          },
        ],
        href: '/plural-features/stacks-iac-management',
      },
      {
        title: 'Service Catalog',
        sections: [
          {
            title: 'Overview',
            href: '/plural-features/service-catalog/overview',
          },
          {
            title: 'Creation',
            href: '/plural-features/service-catalog/creation',
          },
          {
            title: 'Contributing',
            href: '/plural-features/service-catalog/contributing',
          },
        ],
        href: '/plural-features/service-catalog',
      },
      {
        title: 'Plural AI',
        sections: [
          {
            title: 'Setup',
            href: '/plural-features/plural-ai/setup',
          },
          {
            title: 'Architecture',
            href: '/plural-features/plural-ai/architecture',
          },
          {
            title: 'Cost',
            href: '/plural-features/plural-ai/cost',
          },
        ],
        href: '/plural-features/plural-ai',
      },
      {
        title: 'PR Automation',
        sections: [
          {
            title: 'CRDs',
            href: '/plural-features/pr-automation/crds',
          },
          {
            title: 'Testing',
            href: '/plural-features/pr-automation/testing',
          },
          {
            title: 'Pipelines',
            href: '/plural-features/pr-automation/pipelines',
          },
        ],
        href: '/plural-features/pr-automation',
      },
      {
        title: 'Service Templating',
        sections: [
          {
            title: 'Templating Filters',
            href: '/plural-features/service-templating/templating-filters',
          },
        ],
        href: '/plural-features/service-templating',
      },
    ],
    href: '/plural-features',
  },
  {
    title: 'Faq',
    sections: [
      {
        title: 'Security',
        href: '/faq/security',
      },
      {
        title: 'Plural OIDC',
        href: '/faq/plural-oidc',
      },
      {
        title: 'Certifications',
        href: '/faq/certifications',
      },
      {
        title: 'Paid Tiers',
        href: '/faq/paid-tiers',
      },
    ],
    href: '/faq',
  },
  {
    title: 'Resources',
    sections: [
      {
        title: 'Release Notes',
        href: '/resources/release-notes',
      },
      {
        title: 'API',
        href: '/resources/api',
      },
    ],
    href: '/resources',
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

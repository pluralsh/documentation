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
    href: '/overview',
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
  },
  {
    title: 'Getting Started',
    href: '/getting-started',
    sections: [
      {
        title: 'First Steps',
        href: '/getting-started/first-steps',
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
      },
      {
        title: 'How To Use',
        href: '/getting-started/how-to-use',
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
      },
      {
        title: 'Advanced Config',
        href: '/getting-started/advanced-config',
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
      },
    ],
  },
  {
    title: 'Plural Features',
    href: '/plural-features',
    sections: [
      {
        title: 'Continuous Deployment',
        href: '/plural-features/continuous-deployment',
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
      },
      {
        title: 'K8s Upgrade Assistant',
        href: '/plural-features/k8s-upgrade-assistant',
      },
      {
        title: 'Stacks Iac Management',
        href: '/plural-features/stacks-iac-management',
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
      },
      {
        title: 'Service Catalog',
        href: '/plural-features/service-catalog',
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
      },
      {
        title: 'Kubernetes Dashboard',
        href: '/plural-features/kubernetes-dashboard',
      },
      {
        title: 'Plural AI',
        href: '/plural-features/plural-ai',
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
      },
      {
        title: 'PR Automation',
        href: '/plural-features/pr-automation',
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
      },
      {
        title: 'Service Templating',
        href: '/plural-features/service-templating',
        sections: [
          {
            title: 'Templating Filters',
            href: '/plural-features/service-templating/templating-filters',
          },
        ],
      },
      {
        title: 'Projects And Multi Tenancy',
        href: '/plural-features/projects-and-multi-tenancy',
      },
      {
        title: 'Notifications',
        href: '/plural-features/notifications',
      },
    ],
  },
  {
    title: 'Faq',
    href: '/faq',
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
  },
  {
    title: 'Resources',
    href: '/resources',
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

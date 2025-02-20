/**
 * @file This file is auto-generated. DO NOT EDIT DIRECTLY!
 */

import type { NavMenu } from './types'

export const docNavigation: NavMenu = [
  {
    title: 'Overview',
    href: '/overview',
    sections: [
      {
        title: 'Introduction',
        href: '/overview/introduction',
        sortPath: '/01-overview/01-introduction',
      },
      {
        title: 'Plural CD Architecture',
        href: '/overview/architecture',
        sortPath: '/01-overview/02-architecture',
      },
    ],
  },
  {
    title: 'Getting Started',
    href: '/getting-started',
    sections: [
      {
        title: 'Getting Started with Plural CD',
        href: '/getting-started/first-steps',
        sections: [
          {
            title: 'Plural CD CLI Quickstart',
            href: '/getting-started/first-steps/cli-quickstart',
            sortPath: '/02-getting-started/01-first-steps/01-cli-quickstart',
          },
          {
            title: 'Plural CD Bring-your-own-Kubernetes-cluster',
            href: '/getting-started/first-steps/existing-cluster',
            sortPath: '/02-getting-started/01-first-steps/02-existing-cluster',
          },
        ],
      },
      {
        title: 'How To',
        href: '/getting-started/how-to-use',
        sections: [
          {
            title: 'Setting Up a New Management (MGMT) Cluster',
            href: '/getting-started/how-to-use/mgmt-cluster',
            sortPath: '/02-getting-started/02-how-to-use/01-mgmt-cluster',
          },
          {
            title: 'Setting Up a RBAC in Your Kubernetes Dashboard',
            href: '/getting-started/how-to-use/rbac',
            sortPath: '/02-getting-started/02-how-to-use/02-rbac',
          },
          {
            title: 'Integrate with your Source Control Provider',
            href: '/getting-started/how-to-use/scm-connection',
            sortPath: '/02-getting-started/02-how-to-use/03-scm-connection',
          },
          {
            title: 'Setting Up Your First Workload Cluster',
            href: '/getting-started/how-to-use/workload-cluster',
            sortPath: '/02-getting-started/02-how-to-use/04-workload-cluster',
          },
          {
            title: 'Setting Up Ingress on a Cluster',
            href: '/getting-started/how-to-use/controllers',
            sortPath: '/02-getting-started/02-how-to-use/05-controllers',
          },
          {
            title: 'Use PR Automations for General Self-Service',
            href: '/getting-started/how-to-use/pr-automation',
            sortPath: '/02-getting-started/02-how-to-use/06-pr-automation',
          },
          {
            title: 'Setting Up an Example Microservice',
            href: '/getting-started/how-to-use/microservice',
            sortPath: '/02-getting-started/02-how-to-use/07-microservice',
          },
          {
            title: 'Setting Up a Dev->Prod Pipeline',
            href: '/getting-started/how-to-use/pipelines',
            sortPath: '/02-getting-started/02-how-to-use/08-pipelines',
          },
        ],
      },
      {
        title: 'Advanced Config',
        href: '/getting-started/advanced-config',
        sections: [
          {
            title: 'Sandboxing Your Cluster',
            href: '/getting-started/advanced-config/sandboxing',
            sortPath: '/02-getting-started/03-advanced-config/01-sandboxing',
          },
          {
            title: 'Network Configuration',
            href: '/getting-started/advanced-config/network-configuration',
            sortPath:
              '/02-getting-started/03-advanced-config/02-network-configuration',
          },
          {
            title: 'Handling Private CAs',
            href: '/getting-started/advanced-config/private-ca',
            sortPath: '/02-getting-started/03-advanced-config/03-private-ca',
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
        title: 'Cluster Management',
        href: '/plural-features/continuous-deployment',
        sections: [
          {
            title: 'Plural Deployment Operator',
            href: '/plural-features/continuous-deployment/deployment-architecture',
            sortPath:
              '/03-plural-features/01-continuous-deployment/01-deployment-architecture',
          },
          {
            title: 'Git Sourced Services',
            href: '/plural-features/continuous-deployment/git-service',
            sortPath:
              '/03-plural-features/01-continuous-deployment/02-git-service',
          },
          {
            title: 'Helm Sourced Services',
            href: '/plural-features/continuous-deployment/helm-service',
            sortPath:
              '/03-plural-features/01-continuous-deployment/03-helm-service',
          },
          {
            title: 'Global Services',
            href: '/plural-features/continuous-deployment/global-service',
            sortPath:
              '/03-plural-features/01-continuous-deployment/04-global-service',
          },
        ],
      },
      {
        title: 'Managing Deprecations and K8s upgrades',
        href: '/plural-features/k8s-upgrade-assistant',
        sortPath: '/03-plural-features/02-k8s-upgrade-assistant',
      },
      {
        title: 'Stacks',
        href: '/plural-features/stacks-iac-management',
        sections: [
          {
            title: 'Customize Stack Runners',
            href: '/plural-features/stacks-iac-management/customize-runners',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/01-customize-runners',
          },
          {
            title: 'Stack PR Workflow',
            href: '/plural-features/stacks-iac-management/pr-workflow',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/02-pr-workflow',
          },
          {
            title: 'Manual Runs',
            href: '/plural-features/stacks-iac-management/manual-runs',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/03-manual-runs',
          },
          {
            title: 'Local Execution',
            href: '/plural-features/stacks-iac-management/local-execution',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/04-local-execution',
          },
          {
            title: 'Custom Stacks',
            href: '/plural-features/stacks-iac-management/custom-stacks',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/05-custom-stacks',
          },
          {
            title: 'Auto Cancellation',
            href: '/plural-features/stacks-iac-management/auto-cancellation',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/06-auto-cancellation',
          },
          {
            title: 'Terraform Interop with Service Contexts',
            href: '/plural-features/stacks-iac-management/service-contexts',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/07-service-contexts',
          },
        ],
      },
      {
        title: 'Service Catalog',
        href: '/plural-features/service-catalog',
        sections: [
          {
            title: 'Service Catalog',
            href: '/plural-features/service-catalog/overview',
            sortPath: '/03-plural-features/04-service-catalog/01-overview',
          },
          {
            title: 'Creating Your Own Catalog',
            href: '/plural-features/service-catalog/creation',
            sortPath: '/03-plural-features/04-service-catalog/02-creation',
          },
          {
            title: 'Contribution Program',
            href: '/plural-features/service-catalog/contributing',
            sortPath: '/03-plural-features/04-service-catalog/03-contributing',
          },
        ],
      },
      {
        title: 'Kubernetes Dashboard',
        href: '/plural-features/kubernetes-dashboard',
        sortPath: '/03-plural-features/05-kubernetes-dashboard',
      },
      {
        title: 'Plural AI',
        href: '/plural-features/plural-ai',
        sections: [
          {
            title: 'Setup Plural AI',
            href: '/plural-features/plural-ai/setup',
            sortPath: '/03-plural-features/06-plural-ai/01-setup',
          },
          {
            title: 'Plural AI Architecture',
            href: '/plural-features/plural-ai/architecture',
            sortPath: '/03-plural-features/06-plural-ai/02-architecture',
          },
          {
            title: 'Plural AI Cost Analysis',
            href: '/plural-features/plural-ai/cost',
            sortPath: '/03-plural-features/06-plural-ai/03-cost',
          },
        ],
      },
      {
        title: 'Pull Request Automation',
        href: '/plural-features/pr-automation',
        sections: [
          {
            title: 'PR Automation Custom Resources',
            href: '/plural-features/pr-automation/crds',
            sortPath: '/03-plural-features/07-pr-automation/01-crds',
          },
          {
            title: 'PR Automation Testing',
            href: '/plural-features/pr-automation/testing',
            sortPath: '/03-plural-features/07-pr-automation/02-testing',
          },
          {
            title: 'PR Automation Pipelines',
            href: '/plural-features/pr-automation/pipelines',
            sortPath: '/03-plural-features/07-pr-automation/03-pipelines',
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
            sortPath:
              '/03-plural-features/08-service-templating/01-templating-filters',
          },
        ],
      },
      {
        title: 'Projects and Multi Tenancy',
        href: '/plural-features/projects-and-multi-tenancy',
        sortPath: '/03-plural-features/09-projects-and-multi-tenancy',
      },
      {
        title: 'Notification Configuration',
        href: '/plural-features/notifications',
        sortPath: '/03-plural-features/10-notifications',
      },
    ],
  },
  {
    title: 'Faq',
    href: '/faq',
    sections: [
      {
        title: 'Security Concepts',
        href: '/faq/security',
        sortPath: '/04-faq/01-security',
      },
      {
        title: 'OpenID Connect',
        href: '/faq/plural-oidc',
        sortPath: '/04-faq/02-plural-oidc',
      },
      {
        title: 'Certifications',
        href: '/faq/certifications',
        sortPath: '/04-faq/03-certifications',
      },
      {
        title: 'Plural Paid Tiers',
        href: '/faq/paid-tiers',
        sortPath: '/04-faq/04-paid-tiers',
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
        sortPath: '/05-resources/01-release-notes',
      },
      {
        title: 'API',
        href: '/resources/api',
        sortPath: '/05-resources/02-api',
      },
    ],
  },
]

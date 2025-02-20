/**
 * @file This file is auto-generated. DO NOT EDIT DIRECTLY!
 */

import type { NavMenu } from './types'

export const docNavigation: NavMenu = [
  {
    title: 'Overview',
    href: '/01-overview',
    sections: [
      {
        title: 'Introduction',
        href: '/01-overview/01-introduction',
      },
      {
        title: 'Plural CD Architecture',
        href: '/01-overview/02-architecture',
      },
    ],
  },
  {
    title: 'Getting Started',
    href: '/02-getting-started',
    sections: [
      {
        title: 'Getting Started with Plural CD',
        href: '/02-getting-started/01-first-steps',
        sections: [
          {
            title: 'Plural CD CLI Quickstart',
            href: '/02-getting-started/01-first-steps/01-cli-quickstart',
          },
          {
            title: 'Plural CD Bring-your-own-Kubernetes-cluster',
            href: '/02-getting-started/01-first-steps/02-existing-cluster',
          },
        ],
      },
      {
        title: 'How To',
        href: '/02-getting-started/02-how-to-use',
        sections: [
          {
            title: 'Setting Up a New Management (MGMT) Cluster',
            href: '/02-getting-started/02-how-to-use/01-mgmt-cluster',
          },
          {
            title: 'Setting Up a RBAC in Your Kubernetes Dashboard',
            href: '/02-getting-started/02-how-to-use/02-rbac',
          },
          {
            title: 'Integrate with your Source Control Provider',
            href: '/02-getting-started/02-how-to-use/03-scm-connection',
          },
          {
            title: 'Setting Up Your First Workload Cluster',
            href: '/02-getting-started/02-how-to-use/04-workload-cluster',
          },
          {
            title: 'Setting Up Ingress on a Cluster',
            href: '/02-getting-started/02-how-to-use/05-controllers',
          },
          {
            title: 'Use PR Automations for General Self-Service',
            href: '/02-getting-started/02-how-to-use/06-pr-automation',
          },
          {
            title: 'Setting Up an Example Microservice',
            href: '/02-getting-started/02-how-to-use/07-microservice',
          },
          {
            title: 'Setting Up a Dev->Prod Pipeline',
            href: '/02-getting-started/02-how-to-use/08-pipelines',
          },
        ],
      },
      {
        title: 'Advanced Config',
        href: '/02-getting-started/03-advanced-config',
        sections: [
          {
            title: 'Sandboxing Your Cluster',
            href: '/02-getting-started/03-advanced-config/01-sandboxing',
          },
          {
            title: 'Network Configuration',
            href: '/02-getting-started/03-advanced-config/02-network-configuration',
          },
          {
            title: 'Handling Private CAs',
            href: '/02-getting-started/03-advanced-config/03-private-ca',
          },
        ],
      },
    ],
  },
  {
    title: 'Plural Features',
    href: '/03-plural-features',
    sections: [
      {
        title: 'Cluster Management',
        href: '/03-plural-features/01-continuous-deployment',
        sections: [
          {
            title: 'Plural Deployment Operator',
            href: '/03-plural-features/01-continuous-deployment/01-deployment-architecture',
          },
          {
            title: 'Git Sourced Services',
            href: '/03-plural-features/01-continuous-deployment/02-git-service',
          },
          {
            title: 'Helm Sourced Services',
            href: '/03-plural-features/01-continuous-deployment/03-helm-service',
          },
          {
            title: 'Global Services',
            href: '/03-plural-features/01-continuous-deployment/04-global-service',
          },
        ],
      },
      {
        title: 'Managing Deprecations and K8s upgrades',
        href: '/03-plural-features/02-k8s-upgrade-assistant',
      },
      {
        title: 'Stacks',
        href: '/03-plural-features/03-stacks-iac-management',
        sections: [
          {
            title: 'Customize Stack Runners',
            href: '/03-plural-features/03-stacks-iac-management/01-customize-runners',
          },
          {
            title: 'Stack PR Workflow',
            href: '/03-plural-features/03-stacks-iac-management/02-pr-workflow',
          },
          {
            title: 'Manual Runs',
            href: '/03-plural-features/03-stacks-iac-management/03-manual-runs',
          },
          {
            title: 'Local Execution',
            href: '/03-plural-features/03-stacks-iac-management/04-local-execution',
          },
          {
            title: 'Custom Stacks',
            href: '/03-plural-features/03-stacks-iac-management/05-custom-stacks',
          },
          {
            title: 'Auto Cancellation',
            href: '/03-plural-features/03-stacks-iac-management/06-auto-cancellation',
          },
          {
            title: 'Terraform Interop with Service Contexts',
            href: '/03-plural-features/03-stacks-iac-management/07-service-contexts',
          },
        ],
      },
      {
        title: 'Service Catalog',
        href: '/03-plural-features/04-service-catalog',
        sections: [
          {
            title: 'Service Catalog',
            href: '/03-plural-features/04-service-catalog/01-overview',
          },
          {
            title: 'Creating Your Own Catalog',
            href: '/03-plural-features/04-service-catalog/02-creation',
          },
          {
            title: 'Contribution Program',
            href: '/03-plural-features/04-service-catalog/03-contributing',
          },
        ],
      },
      {
        title: 'Kubernetes Dashboard',
        href: '/03-plural-features/05-kubernetes-dashboard',
      },
      {
        title: 'Plural AI',
        href: '/03-plural-features/06-plural-ai',
        sections: [
          {
            title: 'Setup Plural AI',
            href: '/03-plural-features/06-plural-ai/01-setup',
          },
          {
            title: 'Plural AI Architecture',
            href: '/03-plural-features/06-plural-ai/02-architecture',
          },
          {
            title: 'Plural AI Cost Analysis',
            href: '/03-plural-features/06-plural-ai/03-cost',
          },
        ],
      },
      {
        title: 'Pull Request Automation',
        href: '/03-plural-features/07-pr-automation',
        sections: [
          {
            title: 'PR Automation Custom Resources',
            href: '/03-plural-features/07-pr-automation/01-crds',
          },
          {
            title: 'PR Automation Testing',
            href: '/03-plural-features/07-pr-automation/02-testing',
          },
          {
            title: 'PR Automation Pipelines',
            href: '/03-plural-features/07-pr-automation/03-pipelines',
          },
        ],
      },
      {
        title: 'Service Templating',
        href: '/03-plural-features/08-service-templating',
        sections: [
          {
            title: 'Templating Filters',
            href: '/03-plural-features/08-service-templating/01-templating-filters',
          },
        ],
      },
      {
        title: 'Projects and Multi Tenancy',
        href: '/03-plural-features/09-projects-and-multi-tenancy',
      },
      {
        title: 'Notification Configuration',
        href: '/03-plural-features/10-notifications',
      },
    ],
  },
  {
    title: 'Faq',
    href: '/04-faq',
    sections: [
      {
        title: 'Security Concepts',
        href: '/04-faq/01-security',
      },
      {
        title: 'OpenID Connect',
        href: '/04-faq/02-plural-oidc',
      },
      {
        title: 'Certifications',
        href: '/04-faq/03-certifications',
      },
      {
        title: 'Plural Paid Tiers',
        href: '/04-faq/04-paid-tiers',
      },
    ],
  },
  {
    title: 'Resources',
    href: '/05-resources',
    sections: [
      {
        title: 'Release Notes',
        href: '/05-resources/01-release-notes',
      },
      {
        title: 'API',
        href: '/05-resources/02-api',
      },
    ],
  },
]

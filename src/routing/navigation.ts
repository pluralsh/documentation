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
        title: 'Architecture',
        href: '/overview/architecture',
        sortPath: '/01-overview/02-architecture',
      },
      {
        title: 'API Reference',
        href: '/overview/api-reference',
        sortPath: '/01-overview/03-api-reference',
      },
    ],
  },
  {
    title: 'Getting Started',
    href: '/getting-started',
    sections: [
      {
        title: 'First steps',
        href: '/getting-started/first-steps',
        sections: [
          {
            title: 'Quickstart with the Plural CLI',
            href: '/getting-started/first-steps/cli-quickstart',
            sortPath: '/02-getting-started/01-first-steps/01-cli-quickstart',
          },
          {
            title: 'Bring your own K8s cluster',
            href: '/getting-started/first-steps/existing-cluster',
            sortPath: '/02-getting-started/01-first-steps/02-existing-cluster',
          },
        ],
      },
      {
        title: 'How to use Plural',
        href: '/getting-started/how-to-use',
        sections: [
          {
            title: 'Provision a management cluster',
            href: '/getting-started/how-to-use/mgmt-cluster',
            sortPath: '/02-getting-started/02-how-to-use/01-mgmt-cluster',
          },
          {
            title: 'Add RBAC to the K8s dashboard',
            href: '/getting-started/how-to-use/rbac',
            sortPath: '/02-getting-started/02-how-to-use/02-rbac',
          },
          {
            title: 'Connect a source control provider',
            href: '/getting-started/how-to-use/scm-connection',
            sortPath: '/02-getting-started/02-how-to-use/03-scm-connection',
          },
          {
            title: 'Provision a workload cluster',
            href: '/getting-started/how-to-use/workload-cluster',
            sortPath: '/02-getting-started/02-how-to-use/04-workload-cluster',
          },
          {
            title: 'Set up ingress on a cluster',
            href: '/getting-started/how-to-use/controllers',
            sortPath: '/02-getting-started/02-how-to-use/05-controllers',
          },
          {
            title: 'Use PR automations for self-service',
            href: '/getting-started/how-to-use/pr-automation',
            sortPath: '/02-getting-started/02-how-to-use/06-pr-automation',
          },
          {
            title: 'Deploy the first microservice',
            href: '/getting-started/how-to-use/microservice',
            sortPath: '/02-getting-started/02-how-to-use/07-microservice',
          },
          {
            title: 'Setup a dev -> prod pipeline',
            href: '/getting-started/how-to-use/pipelines',
            sortPath: '/02-getting-started/02-how-to-use/08-pipelines',
          },
        ],
      },
      {
        title: 'Advanced configuration',
        href: '/getting-started/advanced-config',
        sections: [
          {
            title: 'Sandboxing your cluster',
            href: '/getting-started/advanced-config/sandboxing',
            sortPath: '/02-getting-started/03-advanced-config/01-sandboxing',
          },
          {
            title: 'Network configuration',
            href: '/getting-started/advanced-config/network-configuration',
            sortPath:
              '/02-getting-started/03-advanced-config/02-network-configuration',
          },
          {
            title: 'Handling private CAs',
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
        title: 'Continuous deployment',
        href: '/plural-features/continuous-deployment',
        sections: [
          {
            title: 'The deployment operator',
            href: '/plural-features/continuous-deployment/deployment-operator',
            sortPath:
              '/03-plural-features/01-continuous-deployment/01-deployment-operator',
          },
          {
            title: 'Git-sourced services',
            href: '/plural-features/continuous-deployment/git-service',
            sortPath:
              '/03-plural-features/01-continuous-deployment/02-git-service',
          },
          {
            title: 'Helm-sourced services',
            href: '/plural-features/continuous-deployment/helm-service',
            sortPath:
              '/03-plural-features/01-continuous-deployment/03-helm-service',
          },
          {
            title: 'Global services',
            href: '/plural-features/continuous-deployment/global-service',
            sortPath:
              '/03-plural-features/01-continuous-deployment/04-global-service',
          },
        ],
      },
      {
        title: 'Plural upgrade assistant',
        href: '/plural-features/k8s-upgrade-assistant',
        sortPath: '/03-plural-features/02-k8s-upgrade-assistant',
      },
      {
        title: 'Stacks — IaC management',
        href: '/plural-features/stacks-iac-management',
        sections: [
          {
            title: 'Customize stack runners',
            href: '/plural-features/stacks-iac-management/customize-runners',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/01-customize-runners',
          },
          {
            title: 'Stack PR workflow',
            href: '/plural-features/stacks-iac-management/pr-workflow',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/02-pr-workflow',
          },
          {
            title: 'Manual runs',
            href: '/plural-features/stacks-iac-management/manual-runs',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/03-manual-runs',
          },
          {
            title: 'Local execution',
            href: '/plural-features/stacks-iac-management/local-execution',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/04-local-execution',
          },
          {
            title: 'Custom stacks',
            href: '/plural-features/stacks-iac-management/custom-stacks',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/05-custom-stacks',
          },
          {
            title: 'Auto cancellation',
            href: '/plural-features/stacks-iac-management/auto-cancellation',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/06-auto-cancellation',
          },
          {
            title: 'Terraform interop with service contexts',
            href: '/plural-features/stacks-iac-management/service-contexts',
            sortPath:
              '/03-plural-features/03-stacks-iac-management/07-service-contexts',
          },
        ],
      },
      {
        title: 'Service catalog',
        href: '/plural-features/service-catalog',
        sections: [
          {
            title: 'Creating your own catalog',
            href: '/plural-features/service-catalog/creation',
            sortPath: '/03-plural-features/04-service-catalog/01-creation',
          },
          {
            title: 'Contribution program',
            href: '/plural-features/service-catalog/contribution-program',
            sortPath:
              '/03-plural-features/04-service-catalog/02-contribution-program',
          },
        ],
      },
      {
        title: 'Kubernetes dashboard',
        href: '/plural-features/kubernetes-dashboard',
        sortPath: '/03-plural-features/05-kubernetes-dashboard',
      },
      {
        title: 'Plural AI helper',
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
            title: 'Plural AI cost analysis',
            href: '/plural-features/plural-ai/cost',
            sortPath: '/03-plural-features/06-plural-ai/03-cost',
          },
        ],
      },
      {
        title: 'Pull request automation',
        href: '/plural-features/pr-automation',
        sections: [
          {
            title: 'PR automation custom resources',
            href: '/plural-features/pr-automation/crds',
            sortPath: '/03-plural-features/07-pr-automation/01-crds',
          },
          {
            title: 'PR automation testing',
            href: '/plural-features/pr-automation/testing',
            sortPath: '/03-plural-features/07-pr-automation/02-testing',
          },
          {
            title: 'PR automation pipelines',
            href: '/plural-features/pr-automation/pipelines',
            sortPath: '/03-plural-features/07-pr-automation/03-pipelines',
          },
        ],
      },
      {
        title: 'Service templating',
        href: '/plural-features/service-templating',
        sections: [
          {
            title: 'Supporting liquid filters',
            href: '/plural-features/service-templating/templating-filters',
            sortPath:
              '/03-plural-features/08-service-templating/01-templating-filters',
          },
        ],
      },
      {
        title: 'Projects and multi-tenancy',
        href: '/plural-features/projects-and-multi-tenancy',
        sortPath: '/03-plural-features/09-projects-and-multi-tenancy',
      },
      {
        title: 'Notification configuration',
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
        title: 'Is Plural secure?',
        href: '/faq/security',
        sortPath: '/04-faq/01-security',
      },
      {
        title: 'Does Plural support OpenID Connect?',
        href: '/faq/plural-oidc',
        sortPath: '/04-faq/02-plural-oidc',
      },
      {
        title: 'What certifications does Plural have?',
        href: '/faq/certifications',
        sortPath: '/04-faq/03-certifications',
      },
      {
        title: 'How do Plural paid tiers work?',
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
    ],
  },
]

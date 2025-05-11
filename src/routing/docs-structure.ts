export type DocSection = {
  path: string
  title: string
  sections?: DocSection[]
}

/**
 * docs structure single source of truth
 * will search for md files with the paths described below, first for an index.md file at the root of each section, then for a PATH_NAME.md file if index isn't found
 * unspecified routes, or specified routes without a corresponding md file, will 404 unless referenced in the redirects object
 * UI sidebar order will match array order, using titles below
 *
 * */
export const docsStructure: DocSection[] = [
  {
    path: 'overview',
    title: 'Overview',
    sections: [
      { path: 'introduction', title: 'Introduction' },
      { path: 'architecture', title: 'Architecture' },
      { path: 'management-api-reference', title: 'Management API Reference' },
      { path: 'agent-api-reference', title: 'Agent API Reference' },
    ],
  },
  {
    path: 'getting-started',
    title: 'Getting Started',
    sections: [
      {
        path: 'first-steps',
        title: 'First steps',
        sections: [
          { path: 'cli-quickstart', title: 'Quickstart with the Plural CLI' },
          { path: 'existing-cluster', title: 'Bring your own K8s cluster' },
          {
            path: 'plural-cloud',
            title: 'Host Your Plural Console with Plural Cloud',
          },
        ],
      },
      {
        path: 'how-to-use',
        title: 'How to use Plural',
        sections: [
          { path: 'mgmt-cluster', title: 'Provision a management cluster' },
          { path: 'rbac', title: 'Add RBAC to the K8s dashboard' },
          {
            path: 'scm-connection',
            title: 'Connect a source control provider',
          },
          { path: 'workload-cluster', title: 'Provision a workload cluster' },
          { path: 'controllers', title: 'Set up ingress on a cluster' },
          { path: 'observability', title: 'Set up full stack observability' },
          { path: 'microservice', title: 'Deploy your first microservice' },
          {
            path: 'pr-automation',
            title: 'Use PR automations for self-service',
          },
          { path: 'pipelines', title: 'Setup a dev -> prod pipeline' },
        ],
      },
      {
        path: 'advanced-config',
        title: 'Advanced configuration',
        sections: [
          { path: 'sandboxing', title: 'Sandboxing your cluster' },
          { path: 'network-configuration', title: 'Network configuration' },
          { path: 'private-ca', title: 'Handling private CAs' },
        ],
      },
    ],
  },
  {
    path: 'plural-features',
    title: 'Plural Features',
    sections: [
      {
        path: 'continuous-deployment',
        title: 'Continuous deployment',
        sections: [
          { path: 'deployment-operator', title: 'The deployment operator' },
          { path: 'git-service', title: 'Git-sourced services' },
          { path: 'helm-service', title: 'Helm-sourced services' },
          { path: 'global-service', title: 'Global services' },
          {
            path: 'observer',
            title: 'Plural Observers in Continuous Deployment',
          },
        ],
      },
      {
        path: 'k8s-upgrade-assistant',
        title: 'Plural upgrade assistant',
        sections: [
          { path: 'upgrade-insights', title: 'Upgrade insights' },
          { path: 'addon-compatibilities', title: 'Add-on compatibilities' },
        ],
      },
      {
        path: 'stacks-iac-management',
        title: 'Stacks — IaC management',
        sections: [
          { path: 'customize-runners', title: 'Customize stack runners' },
          { path: 'pr-workflow', title: 'Stack PR workflow' },
          { path: 'manual-runs', title: 'Manual runs' },
          {
            path: 'sharing-outputs',
            title: 'Sharing Outputs with Continuous Deployment',
          },
          { path: 'custom-stacks', title: 'Custom stacks' },
          { path: 'auto-cancellation', title: 'Auto cancellation' },
          { path: 'local-execution', title: 'Local execution' },
          {
            path: 'service-contexts',
            title: 'Terraform interop with service contexts',
          },
        ],
      },
      {
        path: 'service-catalog',
        title: 'Service catalog',
        sections: [
          { path: 'creation', title: 'Creating your own catalog' },
          { path: 'contribution-program', title: 'Contribution program' },
        ],
      },
      { path: 'kubernetes-dashboard', title: 'Kubernetes dashboard' },
      {
        path: 'plural-ai',
        title: 'Plural AI',
        sections: [
          { path: 'setup', title: 'Setup Plural AI' },
          { path: 'architecture', title: 'Plural AI Architecture' },
          { path: 'cost', title: 'Plural AI cost analysis' },
        ],
      },
      {
        path: 'flows',
        title: 'Plural Flows',
        sections: [
          { path: 'create-a-flow', title: 'Create a flow' },
          { path: 'flow-ai', title: 'Plural AI and Flows' },
          { path: 'preview-environments', title: 'Preview Environments' },
          { path: 'mcp', title: 'Flow MCP Server Integration' },
        ],
      },
      {
        path: 'observability',
        title: 'Observability Integration',
        sections: [
          { path: 'prometheus', title: 'Prometheus' },
          { path: 'logging', title: 'Log Aggregation' },
          { path: 'cost', title: 'Cost Management' },
          {
            path: 'observability-webhooks',
            title: 'Observability Webhooks',
            sections: [
              { path: 'datadog', title: 'Datadog' },
              { path: 'grafana', title: 'Grafana' },
            ],
          },
        ],
      },
      {
        path: 'pr-automation',
        title: 'Pull request automation',
        sections: [
          { path: 'crds', title: 'PR automation custom resources' },
          { path: 'testing', title: 'PR automation testing' },
          { path: 'pipelines', title: 'PR automation pipelines' },
        ],
      },
      {
        path: 'service-templating',
        title: 'Service templating',
        sections: [
          {
            path: 'supporting-liquid-filters',
            title: 'Supporting Liquid Filters',
          },
        ],
      },
      {
        path: 'projects-and-multi-tenancy',
        title: 'Projects and multi-tenancy',
      },
      { path: 'notifications', title: 'Notification configuration' },
    ],
  },
  {
    path: 'examples',
    title: 'Examples',
    sections: [
      {
        path: 'continuous-deployment',
        title: 'Continuous deployment',
        sections: [
          {
            path: 'helm-basic-with-inline-values',
            title: 'Deploy a helm chart with inline values',
          },
          {
            path: 'helm-basic-with-values-file',
            title: 'Deploy a helm chart with git-sourced values file',
          },
          {
            path: 'kustomize-inflate-helm',
            title: 'Use kustomize to inflate a helm chart',
          },
          {
            path: 'kustomize-stack-with-liquid',
            title: 'Extend a helm chart with kustomize and liquid',
          },
        ],
      },
    ],
  },
  {
    path: 'faq',
    title: 'Faq',
    sections: [
      { path: 'security', title: 'Is Plural secure?' },
      { path: 'plural-oidc', title: 'Does Plural support OpenID Connect?' },
      {
        path: 'certifications',
        title: 'What certifications does Plural have?',
      },
      { path: 'paid-tiers', title: 'How do Plural paid tiers work?' },
    ],
  },
  {
    path: 'resources',
    title: 'Resources',
    sections: [
      { path: 'release-notes', title: 'Release Notes' },
      { path: 'product-updates', title: 'Product Updates' },
    ],
  },
]

/**
 * redirects
 *
 * */
export const redirects = [
  {
    source: '/getting-started/agent-api-reference',
    destination: '/overview/agent-api-reference',
    permanent: true,
  },
  {
    source: '/getting-started/readme',
    destination: '/getting-started',
    permanent: true,
  },
  {
    source: '/getting-started/quickstart',
    destination: '/getting-started/first-steps',
    permanent: true,
  },
  {
    source: '/deployments/architecture',
    destination: '/overview/architecture',
    permanent: true,
  },
  {
    source: '/reference/architecture',
    destination: '/',
    permanent: true,
  },
  {
    source: '/deployments/operator/api',
    destination: '/overview/api-reference',
    permanent: true,
  },
  {
    source: '/deployments/cli-quickstart',
    destination: '/getting-started/first-steps/cli-quickstart',
    permanent: true,
  },
  {
    source: '/deployments/existing-cluster',
    destination: '/getting-started/first-steps/existing-cluster',
    permanent: true,
  },
  {
    source: '/getting-started/deployments',
    destination: '/getting-started/first-steps/index',
    permanent: true,
  },
  {
    source: '/how-to/set-up/mgmt-cluster',
    destination: '/getting-started/how-to-use/mgmt-cluster',
    permanent: true,
  },
  {
    source: '/how-to/set-up/rbac',
    destination: '/getting-started/how-to-use/rbac',
    permanent: true,
  },
  {
    source: '/how-to/set-up/scm-connection',
    destination: '/getting-started/how-to-use/scm-connection',
    permanent: true,
  },
  {
    source: '/how-to/set-up/workload-cluster',
    destination: '/getting-started/how-to-use/workload-cluster',
    permanent: true,
  },
  {
    source: '/how-to/set-up/controllers',
    destination: '/getting-started/how-to-use/controllers',
    permanent: true,
  },
  {
    source: '/how-to/deploy/pr-automation',
    destination: '/getting-started/how-to-use/pr-automation',
    permanent: true,
  },
  {
    source: '/how-to/deploy/microservice',
    destination: '/getting-started/how-to-use/microservice',
    permanent: true,
  },
  {
    source: '/how-to/deploy/pipelines',
    destination: '/getting-started/how-to-use/pipelines',
    permanent: true,
  },
  {
    source: '/how-to/index',
    destination: '/getting-started/how-to-use/index',
    permanent: true,
  },
  {
    source: '/deployments/sandboxing',
    destination: '/getting-started/advanced-config/sandboxing',
    permanent: true,
  },
  {
    source: '/deployments/network-configuration',
    destination: '/getting-started/advanced-config/network-configuration',
    permanent: true,
  },
  {
    source: '/deployments/private-ca',
    destination: '/getting-started/advanced-config/private-ca',
    permanent: true,
  },
  {
    source: '/deployments/operator/architecture',
    destination: '/plural-features/continuous-deployment/deployment-operator',
    permanent: true,
  },
  {
    source: '/deployments/operator/git-service',
    destination: '/plural-features/continuous-deployment/git-service',
    permanent: true,
  },
  {
    source: '/deployments/operator/helm-service',
    destination: '/plural-features/continuous-deployment/helm-service',
    permanent: true,
  },
  {
    source: '/deployments/operator/global-service',
    destination: '/plural-features/continuous-deployment/global-service',
    permanent: true,
  },
  {
    source: '/deployments/using-operator',
    destination: '/plural-features/continuous-deployment/index',
    permanent: true,
  },
  {
    source: '/deployments/deprecations',
    destination: '/plural-features/k8s-upgrade-assistant/index',
    permanent: true,
  },
  {
    source: '/stacks/customize-runners',
    destination: '/plural-features/stacks-iac-management/customize-runners',
    permanent: true,
  },
  {
    source: '/stacks/pr-workflow',
    destination: '/plural-features/stacks-iac-management/pr-workflow',
    permanent: true,
  },
  {
    source: '/stacks/manual-runs',
    destination: '/plural-features/stacks-iac-management/manual-runs',
    permanent: true,
  },
  {
    source: '/stacks/local-execution',
    destination: '/plural-features/stacks-iac-management/local-execution',
    permanent: true,
  },
  {
    source: '/stacks/custom-stacks',
    destination: '/plural-features/stacks-iac-management/custom-stacks',
    permanent: true,
  },
  {
    source: '/stacks/auto-cancellation',
    destination: '/plural-features/stacks-iac-management/auto-cancellation',
    permanent: true,
  },
  {
    source: '/deployments/terraform-interop',
    destination: '/plural-features/stacks-iac-management/service-contexts',
    permanent: true,
  },
  {
    source: '/deployments/stacks',
    destination: '/plural-features/stacks-iac-management/index',
    permanent: true,
  },
  {
    source: '/service-catalog/creation',
    destination: '/plural-features/service-catalog/creation',
    permanent: true,
  },
  {
    source: '/service-catalog/contributing',
    destination: '/plural-features/service-catalog/contribution-program',
    permanent: true,
  },
  {
    source: '/service-catalog/overview',
    destination: '/plural-features/service-catalog/index',
    permanent: true,
  },
  {
    source: '/deployments/dashboard',
    destination: '/plural-features/kubernetes-dashboard/index',
    permanent: true,
  },
  {
    source: '/ai/setup',
    destination: '/plural-features/plural-ai/setup',
    permanent: true,
  },
  {
    source: '/ai/architecture',
    destination: '/plural-features/plural-ai/architecture',
    permanent: true,
  },
  {
    source: '/ai/cost',
    destination: '/plural-features/plural-ai/cost',
    permanent: true,
  },
  {
    source: '/ai/overview',
    destination: '/plural-features/plural-ai/index',
    permanent: true,
  },
  {
    source: '/deployments/pr/crds',
    destination: '/plural-features/pr-automation/crds',
    permanent: true,
  },
  {
    source: '/deployments/pr/testing',
    destination: '/plural-features/pr-automation/testing',
    permanent: true,
  },
  {
    source: '/deployments/pr/pipelines',
    destination: '/plural-features/pr-automation/pipelines',
    permanent: true,
  },
  {
    source: '/deployments/pr-automation',
    destination: '/plural-features/pr-automation/index',
    permanent: true,
  },
  {
    source: '/deployments/templating',
    destination: '/plural-features/service-templating/index',
    permanent: true,
  },
  {
    source: '/deployments/multi-tenancy',
    destination: '/plural-features/projects-and-multi-tenancy/index',
    permanent: true,
  },
  {
    source: '/deployments/notifications',
    destination: '/plural-features/notifications/index',
    permanent: true,
  },
  {
    source: '/faq/plural-paid-tiers',
    destination: '/faq/paid-tiers',
    permanent: true,
  },
  {
    source: '/reference/release-notes',
    destination: '/resources/release-notes',
    permanent: true,
  },
]

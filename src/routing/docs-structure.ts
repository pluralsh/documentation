export type DocSection = {
  path: string
  sections?: DocSection[]
}

/**
 * docs structure single source of truth
 * will search for md files with the paths described below, including an index.md file at the root of each section (which takes precedence over a PATH_NAME.md file)
 * unspecified routes, or specified routes without a corresponding md file, will 404 unless referenced in the redirects object
 * UI sidebar order will match array order
 *
 * */
export const docsStructure: DocSection[] = [
  {
    path: 'overview',
    sections: [
      { path: 'introduction' },
      { path: 'architecture' },
      { path: 'management-api-reference' },
      { path: 'agent-api-reference' },
    ],
  },
  {
    path: 'getting-started',
    sections: [
      {
        path: 'first-steps',
        sections: [
          { path: 'cli-quickstart' },
          { path: 'existing-cluster' },
          { path: 'plural-cloud' },
        ],
      },
      {
        path: 'how-to-use',
        sections: [
          { path: 'mgmt-cluster' },
          { path: 'rbac' },
          { path: 'scm-connection' },
          { path: 'workload-cluster' },
          { path: 'controllers' },
          { path: 'observability' },
          { path: 'microservice' },
          { path: 'pr-automation' },
          { path: 'pipelines' },
        ],
      },
      {
        path: 'advanced-config',
        sections: [
          { path: 'sandboxing' },
          { path: 'network-configuration' },
          { path: 'private-ca' },
        ],
      },
    ],
  },
  {
    path: 'plural-features',
    sections: [
      {
        path: 'continuous-deployment',
        sections: [
          { path: 'deployment-operator' },
          { path: 'git-service' },
          { path: 'helm-service' },
          { path: 'global-service' },
        ],
      },
      {
        path: 'k8s-upgrade-assistant',
        sections: [{ path: 'upgrade-insights' }],
      },
      {
        path: 'stacks-iac-management',
        sections: [
          { path: 'customize-runners' },
          { path: 'pr-workflow' },
          { path: 'manual-runs' },
          { path: 'sharing-outputs' },
          { path: 'custom-stacks' },
          { path: 'auto-cancellation' },
          { path: 'local-execution' },
          { path: 'service-contexts' },
        ],
      },
      {
        path: 'service-catalog',
        sections: [{ path: 'creation' }, { path: 'contribution-program' }],
      },
      { path: 'kubernetes-dashboard' },
      {
        path: 'plural-ai',
        sections: [
          { path: 'setup' },
          { path: 'architecture' },
          { path: 'cost' },
        ],
      },
      {
        path: 'pr-automation',
        sections: [
          { path: 'crds' },
          { path: 'testing' },
          { path: 'pipelines' },
        ],
      },
      {
        path: 'service-templating',
        sections: [{ path: 'supporting-liquid-filters' }],
      },
      { path: 'projects-and-multi-tenancy' },
      { path: 'notifications' },
    ],
  },
  {
    path: 'faq',
    sections: [
      { path: 'security' },
      { path: 'plural-oidc' },
      { path: 'certifications' },
      { path: 'paid-tiers' },
    ],
  },
  {
    path: 'resources',
    sections: [{ path: 'release-notes' }],
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
    destination: '/',
    permanent: true,
  },
  {
    source: '/getting-started/getting-started',
    destination: '/getting-started/first-steps/cli-quickstart',
    permanent: true,
  },
  {
    source: '/getting-started',
    destination: '/getting-started/first-steps/cli-quickstart',
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@pluralsh/design-system',
    'honorable',
    'honorable-theme-default',
    'honorable-recipe-mapper',
  ],
  reactStrictMode: false,
  compiler: {
    // https://nextjs.org/docs/advanced-features/compiler#styled-components
    styledComponents: true,
    emotion: true,
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    return config
  },
  async redirects() {
    return [
      {
        source: '/getting-started/readme',
        destination: '/',
        permanent: true,
      },
      {
        source: '/getting-started/getting-started',
        destination: '/getting-started/quickstart',
        permanent: true,
      },
      {
        source: '/getting-started',
        destination: '/getting-started/quickstart',
        permanent: true,
      },
      {
        source: '/reference/architecture-1',
        destination: '/reference/architecture',
        permanent: true,
      },
      {
        source: '/reference/workspaces/workspace-structure',
        destination: '/reference/workspaces',
        permanent: true,
      },
      {
        source: '/getting-started/getting-started-with-runbooks/runbook-yaml',
        destination:
          '/adding-new-application/getting-started-with-runbooks/runbook-yaml',
        permanent: true,
      },
      {
        source: '/basic-setup-and-deployment/setting-up-gitops',
        destination:
          '/getting-started/managing-git-repository/setting-up-gitops',
        permanent: true,
      },
      {
        source: '/basic-setup-and-deployment/openid-connect',
        destination: '/getting-started/openid-connect',
        permanent: true,
      },
      {
        source: '/basic-setup-and-deployment/admin-console',
        destination: '/getting-started/admin-console',
        permanent: true,
      },
      {
        source: '/basic-setup-and-deployment/cloud-shell-quickstart',
        destination: '/getting-started/cloud-shell-quickstart',
        permanent: true,
      },
      {
        source: '/basic-setup-and-deployment/uninstall',
        destination: '/operations/uninstall',
        permanent: true,
      },
      {
        source: '/reference/operator-guides',
        destination: '/repositories',
        permanent: true,
      },
      {
        source: '/reference/operator-guides/adding-kubecost-for-cost-analysis',
        destination: '/repositories/kubecost',
        permanent: true,
      },
      {
        source: '/reference/architecture',
        destination: '/',
        permanent: true,
      },
      {
        source: '/repositories',
        destination: '/applications',
        permanent: true,
      },
      {
        source: '/repositories/airbyte',
        destination: '/applications/airbyte',
        permanent: true,
      },
      {
        source: '/repositories/airflow',
        destination: '/applications/airflow',
        permanent: true,
      },
      {
        source: '/repositories/console',
        destination: '/applications/console',
        permanent: true,
      },
      {
        source: '/advanced-topics',
        destination: '/operations',
        permanent: true,
      },
      {
        source: '/advanced-topics/network-configuration',
        destination: '/operations/network-configuration',
        permanent: true,
      },
      {
        source: '/advanced-topics/dns-setup',
        destination: '/operations/dns-setup',
        permanent: true,
      },
      {
        source:
          '/advanced-topics/dns-setup/creating-dns-zone-in-your-cloud-provider-console',
        destination:
          '/operations/dns-setup/creating-dns-zone-in-your-cloud-provider-console',
        permanent: true,
      },
      {
        source: '/advanced-topics/security',
        destination: '/operations/security',
        permanent: true,
      },
      {
        source: '/advanced-topics/security/secret-management',
        destination:
          '/getting-started/manage-git-repositories/sharing-git-repositories',
        permanent: true,
      },
      {
        source: '/advanced-topics/debugging',
        destination: '/debugging',
        permanent: true,
      },
      {
        source: '/advanced-topics/debugging/health-checks',
        destination: '/debugging/health-checks',
        permanent: true,
      },
      {
        source: '/advanced-topics/debugging/logs',
        destination: '/debugging/logs',
        permanent: true,
      },
      {
        source: '/advanced-topics/debugging/proxies',
        destination: '/debugging/proxies',
        permanent: true,
      },
      {
        source: '/advanced-topics/identity-and-access-management',
        destination: '/operations/auth-access-control',
        permanent: true,
      },
      {
        source: '/advanced-topics/identity-and-access-management/introduction',
        destination: '/operations/auth-access-control',
        permanent: true,
      },
      {
        source:
          '/advanced-topics/identity-and-access-management/openid-connect',
        destination: '/operations/auth-access-control/openid-connect',
        permanent: true,
      },
      {
        source: '/advanced-topics/identity-and-access-management/api-tokens',
        destination: '/operations/auth-access-control/api-tokens',
        permanent: true,
      },
      {
        source:
          '/advanced-topics/identity-and-access-management/identity-and-installations',
        destination:
          '/operations/auth-access-control/identity-and-installations',
        permanent: true,
      },
      {
        source:
          '/advanced-topics/identity-and-access-management/identity-and-installations/audit-logging',
        destination:
          '/operations/auth-access-control/identity-and-installations/audit-logging',
        permanent: true,
      },
      {
        source:
          '/advanced-topics/identity-and-access-management/identity-and-installations/service-accounts',
        destination:
          '/operations/auth-access-control/identity-and-installations/service-accounts',
        permanent: true,
      },
      {
        source:
          '/advanced-topics/identity-and-access-management/identity-and-installations/sharing-existing-repos',
        destination:
          '/getting-started/manage-git-repositories/sharing-git-repository',
        permanent: true,
      },
      {
        source: '/reference/workspaces',
        destination:
          '/getting-started/manage-git-repositories/your-plural-workspace',
        permanent: true,
      },
      {
        source: '/introduction',
        destination: '/overview/introduction',
        permanent: true,
      },
      {
        source: '/deployments/architecture',
        destination: '/overview/architecture',
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
        destination:
          '/plural-features/continuous-deployment/deployment-operator',
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
        source: '/deployments/templating-filters',
        destination: '/plural-features/service-templating/templating-filters',
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
        source: '/faq/security',
        destination: '/faq/security',
        permanent: true,
      },
      {
        source: '/faq/certifications',
        destination: '/faq/certifications',
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
  },
}

module.exports = nextConfig

/**
 * @file This file is auto-generated. DO NOT EDIT DIRECTLY!
 */

import { type DocRoute, type DocRouteMap, routeSchema } from '../routing/types'

// Central route registry
export const docRoutes: DocRouteMap = {
  overview_introduction: {
    path: '/01-overview/01-introduction',
    title: 'Introduction',
    id: 'overview_introduction',
  },

  overview_architecture: {
    path: '/01-overview/02-architecture',
    title: 'Architecture',
    id: 'overview_architecture',
  },

  overview_api_reference: {
    path: '/01-overview/03-api-reference',
    title: 'API Reference',
    id: 'overview_api_reference',
  },

  getting_started_first_steps: {
    path: '/02-getting-started/01-first-steps',
    title: 'First steps',
    id: 'getting_started_first_steps',
  },

  getting_started_first_steps_cli_quickstart: {
    path: '/02-getting-started/01-first-steps/01-cli-quickstart',
    title: 'Quickstart with the Plural CLI',
    id: 'getting_started_first_steps_cli_quickstart',
  },

  getting_started_first_steps_existing_cluster: {
    path: '/02-getting-started/01-first-steps/02-existing-cluster',
    title: 'Bring your own K8s cluster',
    id: 'getting_started_first_steps_existing_cluster',
  },

  getting_started_how_to_use: {
    path: '/02-getting-started/02-how-to-use',
    title: 'How to use Plural',
    id: 'getting_started_how_to_use',
  },

  getting_started_how_to_use_mgmt_cluster: {
    path: '/02-getting-started/02-how-to-use/01-mgmt-cluster',
    title: 'Provision a management cluster',
    id: 'getting_started_how_to_use_mgmt_cluster',
  },

  getting_started_how_to_use_rbac: {
    path: '/02-getting-started/02-how-to-use/02-rbac',
    title: 'Add RBAC to the K8s dashboard',
    id: 'getting_started_how_to_use_rbac',
  },

  getting_started_how_to_use_scm_connection: {
    path: '/02-getting-started/02-how-to-use/03-scm-connection',
    title: 'Connect a source control provider',
    id: 'getting_started_how_to_use_scm_connection',
  },

  getting_started_how_to_use_workload_cluster: {
    path: '/02-getting-started/02-how-to-use/04-workload-cluster',
    title: 'Provision a workload cluster',
    id: 'getting_started_how_to_use_workload_cluster',
  },

  getting_started_how_to_use_controllers: {
    path: '/02-getting-started/02-how-to-use/05-controllers',
    title: 'Set up ingress on a cluster',
    id: 'getting_started_how_to_use_controllers',
  },

  getting_started_how_to_use_pr_automation: {
    path: '/02-getting-started/02-how-to-use/06-pr-automation',
    title: 'Use PR automations for self-service',
    id: 'getting_started_how_to_use_pr_automation',
  },

  getting_started_how_to_use_microservice: {
    path: '/02-getting-started/02-how-to-use/07-microservice',
    title: 'Deploy the first microservice',
    id: 'getting_started_how_to_use_microservice',
  },

  getting_started_how_to_use_pipelines: {
    path: '/02-getting-started/02-how-to-use/08-pipelines',
    title: 'Setup a dev -> prod pipeline',
    id: 'getting_started_how_to_use_pipelines',
  },

  getting_started_advanced_config: {
    path: '/02-getting-started/03-advanced-config',
    title: 'Advanced configuration',
    id: 'getting_started_advanced_config',
  },

  getting_started_advanced_config_sandboxing: {
    path: '/02-getting-started/03-advanced-config/01-sandboxing',
    title: 'Sandboxing your cluster',
    id: 'getting_started_advanced_config_sandboxing',
  },

  getting_started_advanced_config_network_configuration: {
    path: '/02-getting-started/03-advanced-config/02-network-configuration',
    title: 'Network configuration',
    id: 'getting_started_advanced_config_network_configuration',
  },

  getting_started_advanced_config_private_ca: {
    path: '/02-getting-started/03-advanced-config/03-private-ca',
    title: 'Handling private CAs',
    id: 'getting_started_advanced_config_private_ca',
  },

  plural_features_continuous_deployment: {
    path: '/03-plural-features/01-continuous-deployment',
    title: 'Continuous deployment',
    id: 'plural_features_continuous_deployment',
  },

  plural_features_continuous_deployment_deployment_operator: {
    path: '/03-plural-features/01-continuous-deployment/01-deployment-operator',
    title: 'The deployment operator',
    id: 'plural_features_continuous_deployment_deployment_operator',
  },

  plural_features_continuous_deployment_git_service: {
    path: '/03-plural-features/01-continuous-deployment/02-git-service',
    title: 'Git-sourced services',
    id: 'plural_features_continuous_deployment_git_service',
  },

  plural_features_continuous_deployment_helm_service: {
    path: '/03-plural-features/01-continuous-deployment/03-helm-service',
    title: 'Helm-sourced services',
    id: 'plural_features_continuous_deployment_helm_service',
  },

  plural_features_continuous_deployment_global_service: {
    path: '/03-plural-features/01-continuous-deployment/04-global-service',
    title: 'Global services',
    id: 'plural_features_continuous_deployment_global_service',
  },

  plural_features_k8s_upgrade_assistant: {
    path: '/03-plural-features/02-k8s-upgrade-assistant',
    title: 'Plural upgrade assistant',
    id: 'plural_features_k8s_upgrade_assistant',
  },

  plural_features_stacks_iac_management: {
    path: '/03-plural-features/03-stacks-iac-management',
    title: 'Stacks — IaC management',
    id: 'plural_features_stacks_iac_management',
  },

  plural_features_stacks_iac_management_customize_runners: {
    path: '/03-plural-features/03-stacks-iac-management/01-customize-runners',
    title: 'Customize stack runners',
    id: 'plural_features_stacks_iac_management_customize_runners',
  },

  plural_features_stacks_iac_management_pr_workflow: {
    path: '/03-plural-features/03-stacks-iac-management/02-pr-workflow',
    title: 'Stack PR workflow',
    id: 'plural_features_stacks_iac_management_pr_workflow',
  },

  plural_features_stacks_iac_management_manual_runs: {
    path: '/03-plural-features/03-stacks-iac-management/03-manual-runs',
    title: 'Manual runs',
    id: 'plural_features_stacks_iac_management_manual_runs',
  },

  plural_features_stacks_iac_management_local_execution: {
    path: '/03-plural-features/03-stacks-iac-management/04-local-execution',
    title: 'Local execution',
    id: 'plural_features_stacks_iac_management_local_execution',
  },

  plural_features_stacks_iac_management_custom_stacks: {
    path: '/03-plural-features/03-stacks-iac-management/05-custom-stacks',
    title: 'Custom stacks',
    id: 'plural_features_stacks_iac_management_custom_stacks',
  },

  plural_features_stacks_iac_management_auto_cancellation: {
    path: '/03-plural-features/03-stacks-iac-management/06-auto-cancellation',
    title: 'Auto cancellation',
    id: 'plural_features_stacks_iac_management_auto_cancellation',
  },

  plural_features_stacks_iac_management_service_contexts: {
    path: '/03-plural-features/03-stacks-iac-management/07-service-contexts',
    title: 'Terraform interop with service contexts',
    id: 'plural_features_stacks_iac_management_service_contexts',
  },

  plural_features_service_catalog: {
    path: '/03-plural-features/04-service-catalog',
    title: 'Service catalog',
    id: 'plural_features_service_catalog',
  },

  plural_features_service_catalog_creation: {
    path: '/03-plural-features/04-service-catalog/01-creation',
    title: 'Creating your own catalog',
    id: 'plural_features_service_catalog_creation',
  },

  plural_features_service_catalog_contribution_program: {
    path: '/03-plural-features/04-service-catalog/02-contribution-program',
    title: 'Contribution program',
    id: 'plural_features_service_catalog_contribution_program',
  },

  plural_features_kubernetes_dashboard: {
    path: '/03-plural-features/05-kubernetes-dashboard',
    title: 'Kubernetes dashboard',
    id: 'plural_features_kubernetes_dashboard',
  },

  plural_features_plural_ai: {
    path: '/03-plural-features/06-plural-ai',
    title: 'Plural AI helper',
    id: 'plural_features_plural_ai',
  },

  plural_features_plural_ai_setup: {
    path: '/03-plural-features/06-plural-ai/01-setup',
    title: 'Setup Plural AI',
    id: 'plural_features_plural_ai_setup',
  },

  plural_features_plural_ai_architecture: {
    path: '/03-plural-features/06-plural-ai/02-architecture',
    title: 'Plural AI Architecture',
    id: 'plural_features_plural_ai_architecture',
  },

  plural_features_plural_ai_cost: {
    path: '/03-plural-features/06-plural-ai/03-cost',
    title: 'Plural AI cost analysis',
    id: 'plural_features_plural_ai_cost',
  },

  plural_features_pr_automation: {
    path: '/03-plural-features/07-pr-automation',
    title: 'Pull request automation',
    id: 'plural_features_pr_automation',
  },

  plural_features_pr_automation_crds: {
    path: '/03-plural-features/07-pr-automation/01-crds',
    title: 'PR automation custom resources',
    id: 'plural_features_pr_automation_crds',
  },

  plural_features_pr_automation_testing: {
    path: '/03-plural-features/07-pr-automation/02-testing',
    title: 'PR automation testing',
    id: 'plural_features_pr_automation_testing',
  },

  plural_features_pr_automation_pipelines: {
    path: '/03-plural-features/07-pr-automation/03-pipelines',
    title: 'PR automation pipelines',
    id: 'plural_features_pr_automation_pipelines',
  },

  plural_features_service_templating: {
    path: '/03-plural-features/08-service-templating',
    title: 'Service templating',
    id: 'plural_features_service_templating',
  },

  plural_features_service_templating_templating_filters: {
    path: '/03-plural-features/08-service-templating/01-templating-filters',
    title: 'Supporting liquid filters',
    id: 'plural_features_service_templating_templating_filters',
  },

  plural_features_projects_and_multi_tenancy: {
    path: '/03-plural-features/09-projects-and-multi-tenancy',
    title: 'Projects and multi-tenancy',
    id: 'plural_features_projects_and_multi_tenancy',
  },

  plural_features_notifications: {
    path: '/03-plural-features/10-notifications',
    title: 'Notification configuration',
    id: 'plural_features_notifications',
  },

  faq_security: {
    path: '/04-faq/01-security',
    title: 'Is Plural secure?',
    id: 'faq_security',
  },

  faq_plural_oidc: {
    path: '/04-faq/02-plural-oidc',
    title: 'Does Plural support OpenID Connect?',
    id: 'faq_plural_oidc',
  },

  faq_certifications: {
    path: '/04-faq/03-certifications',
    title: 'What certifications does Plural have?',
    id: 'faq_certifications',
  },

  faq_paid_tiers: {
    path: '/04-faq/04-paid-tiers',
    title: 'How do Plural paid tiers work?',
    id: 'faq_paid_tiers',
  },

  resources_release_notes: {
    path: '/05-resources/01-release-notes',
    title: 'Release Notes',
    id: 'resources_release_notes',
  },
} as const

// Type-safe route getter
export function getRoute(id: keyof typeof docRoutes): DocRoute {
  return docRoutes[id]
}

// Get route by ID
export function getRouteById(id: string): DocRoute | undefined {
  return Object.values(docRoutes).find((route) => route.id === id)
}

// Get route by path (including redirects)
export function getRouteByPath(path: string): DocRoute | undefined {
  // First try direct path match
  const directMatch = Object.values(docRoutes).find(
    (route) => route.path === path
  )

  if (directMatch) return directMatch

  // Then check redirects
  return Object.values(docRoutes).find(
    (route) => route.redirectFrom?.includes(path)
  )
}

// Validate all routes at runtime
Object.entries(docRoutes).forEach(([key, route]) => {
  try {
    routeSchema.parse(route)
  } catch (error) {
    console.error(`Invalid route configuration for "${key}":`, error)
  }
})

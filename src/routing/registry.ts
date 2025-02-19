/**
 * @file This file is auto-generated. DO NOT EDIT DIRECTLY!
 */

import { z } from 'zod'
import { routeSchema, type DocRoute, type DocRouteMap } from './types'

// Central route registry
export const docRoutes: DocRouteMap = {
  overview_introduction: {
    path: '/01-overview/01-introduction',
    title: 'Introduction',
    id: 'overview_introduction',
    section: 'overview',
  },

  overview_architecture: {
    path: '/01-overview/02-architecture',
    title: 'Plural CD Architecture',
    id: 'overview_architecture',
    section: 'overview',
  },

  getting_started_first_steps: {
    path: '/02-getting-started/01-first-steps',
    title: 'Getting Started with Plural CD',
    id: 'getting_started_first_steps',
    section: 'getting-started',
  },

  getting_started_first_steps_cli_quickstart: {
    path: '/02-getting-started/01-first-steps/01-cli-quickstart',
    title: 'Plural CD CLI Quickstart',
    id: 'getting_started_first_steps_cli_quickstart',
    section: 'getting-started',
  },

  getting_started_first_steps_existing_cluster: {
    path: '/02-getting-started/01-first-steps/02-existing-cluster',
    title: 'Plural CD Bring-your-own-Kubernetes-cluster',
    id: 'getting_started_first_steps_existing_cluster',
    section: 'getting-started',
  },

  getting_started_how_to_use: {
    path: '/02-getting-started/02-how-to-use',
    title: 'How To',
    id: 'getting_started_how_to_use',
    section: 'getting-started',
  },

  getting_started_how_to_use_mgmt_cluster: {
    path: '/02-getting-started/02-how-to-use/01-mgmt-cluster',
    title: 'Setting Up a New Management (MGMT) Cluster',
    id: 'getting_started_how_to_use_mgmt_cluster',
    section: 'getting-started',
  },

  getting_started_how_to_use_rbac: {
    path: '/02-getting-started/02-how-to-use/02-rbac',
    title: 'Setting Up a RBAC in Your Kubernetes Dashboard',
    id: 'getting_started_how_to_use_rbac',
    section: 'getting-started',
  },

  getting_started_how_to_use_scm_connection: {
    path: '/02-getting-started/02-how-to-use/03-scm-connection',
    title: 'Integrate with your Source Control Provider',
    id: 'getting_started_how_to_use_scm_connection',
    section: 'getting-started',
  },

  getting_started_how_to_use_workload_cluster: {
    path: '/02-getting-started/02-how-to-use/04-workload-cluster',
    title: 'Setting Up Your First Workload Cluster',
    id: 'getting_started_how_to_use_workload_cluster',
    section: 'getting-started',
  },

  getting_started_how_to_use_controllers: {
    path: '/02-getting-started/02-how-to-use/05-controllers',
    title: 'Setting Up Ingress on a Cluster',
    id: 'getting_started_how_to_use_controllers',
    section: 'getting-started',
  },

  getting_started_how_to_use_pr_automation: {
    path: '/02-getting-started/02-how-to-use/06-pr-automation',
    title: 'Use PR Automations for General Self-Service',
    id: 'getting_started_how_to_use_pr_automation',
    section: 'getting-started',
  },

  getting_started_how_to_use_microservice: {
    path: '/02-getting-started/02-how-to-use/07-microservice',
    title: 'Setting Up an Example Microservice',
    id: 'getting_started_how_to_use_microservice',
    section: 'getting-started',
  },

  getting_started_how_to_use_pipelines: {
    path: '/02-getting-started/02-how-to-use/08-pipelines',
    title: 'Setting Up a Dev->Prod Pipeline',
    id: 'getting_started_how_to_use_pipelines',
    section: 'getting-started',
  },

  getting_started_advanced_config: {
    path: '/02-getting-started/03-advanced-config',
    title: 'Advanced Config',
    id: 'getting_started_advanced_config',
    section: 'getting-started',
  },

  getting_started_advanced_config_sandboxing: {
    path: '/02-getting-started/03-advanced-config/01-sandboxing',
    title: 'Sandboxing Your Cluster',
    id: 'getting_started_advanced_config_sandboxing',
    section: 'getting-started',
  },

  getting_started_advanced_config_network_configuration: {
    path: '/02-getting-started/03-advanced-config/02-network-configuration',
    title: 'Network Configuration',
    id: 'getting_started_advanced_config_network_configuration',
    section: 'getting-started',
  },

  getting_started_advanced_config_private_ca: {
    path: '/02-getting-started/03-advanced-config/03-private-ca',
    title: 'Handling Private CAs',
    id: 'getting_started_advanced_config_private_ca',
    section: 'getting-started',
  },

  plural_features_continuous_deployment: {
    path: '/03-plural-features/01-continuous-deployment',
    title: 'Cluster Management',
    id: 'plural_features_continuous_deployment',
    section: 'plural-features',
  },

  plural_features_continuous_deployment_deployment_architecture: {
    path: '/03-plural-features/01-continuous-deployment/01-deployment-architecture',
    title: 'Plural Deployment Operator',
    id: 'plural_features_continuous_deployment_deployment_architecture',
    section: 'plural-features',
  },

  plural_features_continuous_deployment_git_service: {
    path: '/03-plural-features/01-continuous-deployment/02-git-service',
    title: 'Git Sourced Services',
    id: 'plural_features_continuous_deployment_git_service',
    section: 'plural-features',
  },

  plural_features_continuous_deployment_helm_service: {
    path: '/03-plural-features/01-continuous-deployment/03-helm-service',
    title: 'Helm Sourced Services',
    id: 'plural_features_continuous_deployment_helm_service',
    section: 'plural-features',
  },

  plural_features_continuous_deployment_global_service: {
    path: '/03-plural-features/01-continuous-deployment/04-global-service',
    title: 'Global Services',
    id: 'plural_features_continuous_deployment_global_service',
    section: 'plural-features',
  },

  plural_features_k8s_upgrade_assistant: {
    path: '/03-plural-features/02-k8s-upgrade-assistant',
    title: 'Managing Deprecations and K8s upgrades',
    id: 'plural_features_k8s_upgrade_assistant',
    section: 'plural-features',
  },

  plural_features_stacks_iac_management: {
    path: '/03-plural-features/03-stacks-iac-management',
    title: 'Stacks',
    id: 'plural_features_stacks_iac_management',
    section: 'plural-features',
  },

  plural_features_stacks_iac_management_customize_runners: {
    path: '/03-plural-features/03-stacks-iac-management/01-customize-runners',
    title: 'Customize Stack Runners',
    id: 'plural_features_stacks_iac_management_customize_runners',
    section: 'plural-features',
  },

  plural_features_stacks_iac_management_pr_workflow: {
    path: '/03-plural-features/03-stacks-iac-management/02-pr-workflow',
    title: 'Stack PR Workflow',
    id: 'plural_features_stacks_iac_management_pr_workflow',
    section: 'plural-features',
  },

  plural_features_stacks_iac_management_manual_runs: {
    path: '/03-plural-features/03-stacks-iac-management/03-manual-runs',
    title: 'Manual Runs',
    id: 'plural_features_stacks_iac_management_manual_runs',
    section: 'plural-features',
  },

  plural_features_stacks_iac_management_local_execution: {
    path: '/03-plural-features/03-stacks-iac-management/04-local-execution',
    title: 'Local Execution',
    id: 'plural_features_stacks_iac_management_local_execution',
    section: 'plural-features',
  },

  plural_features_stacks_iac_management_custom_stacks: {
    path: '/03-plural-features/03-stacks-iac-management/05-custom-stacks',
    title: 'Custom Stacks',
    id: 'plural_features_stacks_iac_management_custom_stacks',
    section: 'plural-features',
  },

  plural_features_stacks_iac_management_auto_cancellation: {
    path: '/03-plural-features/03-stacks-iac-management/06-auto-cancellation',
    title: 'Auto Cancellation',
    id: 'plural_features_stacks_iac_management_auto_cancellation',
    section: 'plural-features',
  },

  plural_features_stacks_iac_management_service_contexts: {
    path: '/03-plural-features/03-stacks-iac-management/07-service-contexts',
    title: 'Terraform Interop with Service Contexts',
    id: 'plural_features_stacks_iac_management_service_contexts',
    section: 'plural-features',
  },

  plural_features_service_catalog: {
    path: '/03-plural-features/04-service-catalog',
    title: 'Service Catalog',
    id: 'plural_features_service_catalog',
    section: 'plural-features',
  },

  plural_features_service_catalog_overview: {
    path: '/03-plural-features/04-service-catalog/01-overview',
    title: 'Service Catalog',
    id: 'plural_features_service_catalog_overview',
    section: 'plural-features',
  },

  plural_features_service_catalog_creation: {
    path: '/03-plural-features/04-service-catalog/02-creation',
    title: 'Creating Your Own Catalog',
    id: 'plural_features_service_catalog_creation',
    section: 'plural-features',
  },

  plural_features_service_catalog_contributing: {
    path: '/03-plural-features/04-service-catalog/03-contributing',
    title: 'Contribution Program',
    id: 'plural_features_service_catalog_contributing',
    section: 'plural-features',
  },

  plural_features_kubernetes_dashboard: {
    path: '/03-plural-features/05-kubernetes-dashboard',
    title: 'Kubernetes Dashboard',
    id: 'plural_features_kubernetes_dashboard',
    section: 'plural-features',
  },

  plural_features_plural_ai: {
    path: '/03-plural-features/06-plural-ai',
    title: 'Plural AI',
    id: 'plural_features_plural_ai',
    section: 'plural-features',
  },

  plural_features_plural_ai_setup: {
    path: '/03-plural-features/06-plural-ai/01-setup',
    title: 'Setup Plural AI',
    id: 'plural_features_plural_ai_setup',
    section: 'plural-features',
  },

  plural_features_plural_ai_architecture: {
    path: '/03-plural-features/06-plural-ai/02-architecture',
    title: 'Plural AI Architecture',
    id: 'plural_features_plural_ai_architecture',
    section: 'plural-features',
  },

  plural_features_plural_ai_cost: {
    path: '/03-plural-features/06-plural-ai/03-cost',
    title: 'Plural AI Cost Analysis',
    id: 'plural_features_plural_ai_cost',
    section: 'plural-features',
  },

  plural_features_pr_automation: {
    path: '/03-plural-features/07-pr-automation',
    title: 'Pull Request Automation',
    id: 'plural_features_pr_automation',
    section: 'plural-features',
  },

  plural_features_pr_automation_crds: {
    path: '/03-plural-features/07-pr-automation/01-crds',
    title: 'PR Automation Custom Resources',
    id: 'plural_features_pr_automation_crds',
    section: 'plural-features',
  },

  plural_features_pr_automation_testing: {
    path: '/03-plural-features/07-pr-automation/02-testing',
    title: 'PR Automation Testing',
    id: 'plural_features_pr_automation_testing',
    section: 'plural-features',
  },

  plural_features_pr_automation_pipelines: {
    path: '/03-plural-features/07-pr-automation/03-pipelines',
    title: 'PR Automation Pipelines',
    id: 'plural_features_pr_automation_pipelines',
    section: 'plural-features',
  },

  plural_features_service_templating: {
    path: '/03-plural-features/08-service-templating',
    title: 'Service Templating',
    id: 'plural_features_service_templating',
    section: 'plural-features',
  },

  plural_features_service_templating_templating_filters: {
    path: '/03-plural-features/08-service-templating/01-templating-filters',
    title: 'Templating Filters',
    id: 'plural_features_service_templating_templating_filters',
    section: 'plural-features',
  },

  plural_features_projects_and_multi_tenancy: {
    path: '/03-plural-features/09-projects-and-multi-tenancy',
    title: 'Projects and Multi Tenancy',
    id: 'plural_features_projects_and_multi_tenancy',
    section: 'plural-features',
  },

  plural_features_notifications: {
    path: '/03-plural-features/10-notifications',
    title: 'Notification Configuration',
    id: 'plural_features_notifications',
    section: 'plural-features',
  },

  faq_security: {
    path: '/04-faq/01-security',
    title: 'Security Concepts',
    id: 'faq_security',
    section: 'faq',
  },

  faq_plural_oidc: {
    path: '/04-faq/02-plural-oidc',
    title: 'OpenID Connect',
    id: 'faq_plural_oidc',
    section: 'faq',
  },

  faq_certifications: {
    path: '/04-faq/03-certifications',
    title: 'Certifications',
    id: 'faq_certifications',
    section: 'faq',
  },

  faq_paid_tiers: {
    path: '/04-faq/04-paid-tiers',
    title: 'Plural Paid Tiers',
    id: 'faq_paid_tiers',
    section: 'faq',
  },

  resources_release_notes: {
    path: '/05-resources/01-release-notes',
    title: 'Release Notes',
    id: 'resources_release_notes',
    section: 'resources',
  },

  resources_api: {
    path: '/05-resources/02-api',
    title: 'API',
    id: 'resources_api',
    section: 'resources',
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

// Get all routes in a section
export function getRoutesBySection(section: string): DocRoute[] {
  return Object.values(docRoutes).filter((route) => route.section === section)
}

// Get route by path (including redirects)
export function getRouteByPath(path: string): DocRoute | undefined {
  // First try direct path match
  const directMatch = Object.values(docRoutes).find(
    (route) => route.path === path
  )
  if (directMatch) return directMatch

  // Then check redirects
  return Object.values(docRoutes).find((route) =>
    route.redirectFrom?.includes(path)
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

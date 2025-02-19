import { type ComponentProps } from 'react'
import { Link as DSLink } from '@pluralsh/design-system/dist/markdoc/components'
import { docRoutes } from './registry'
import { findRouteById } from './utils'
import { type DocRoute } from './types'

type DocLinkProps = Omit<ComponentProps<typeof DSLink>, 'href'> & {
  to: string
  fallbackText?: string
}

/**
 * Link component for internal documentation links
 * Accepts either a route key or route ID
 */
export function DocLink({
  to,
  fallbackText,
  children,
  ...props
}: DocLinkProps) {
  // Handle both direct route keys and route IDs
  let route: DocRoute | undefined

  // First try direct lookup
  if (to in docRoutes) {
    route = docRoutes[to as keyof typeof docRoutes]
  }

  // Then try by ID if not found
  if (!route) {
    route = findRouteById(Object.values(docRoutes), to)
  }

  // If still not found, try normalizing the path
  if (!route) {
    const normalizedTo = to.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    route = findRouteById(Object.values(docRoutes), normalizedTo)
  }

  if (!route) {
    console.warn(
      `No route found for: ${to}. Available routes:`,
      Object.keys(docRoutes)
    )
    return fallbackText || children
  }

  // Ensure path starts with /
  const href = route.path.startsWith('/') ? route.path : `/${route.path}`

  return (
    <DSLink
      href={href}
      {...props}
    >
      {children}
    </DSLink>
  )
}

import { type ComponentProps } from 'react'
import { Link as DSLink } from '@pluralsh/design-system/dist/markdoc/components'

import { type DocRoute, docRoutes, getRouteById } from '../routes/docs'

type DocLinkProps = Omit<ComponentProps<typeof DSLink>, 'href'> & {
  to: string
  fallbackText?: string
}

export function DocLink({
  to,
  fallbackText,
  children,
  className,
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
    route = getRouteById(to)
  }

  // If still not found, try normalizing the path
  if (!route) {
    const normalizedTo = to.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    route = getRouteById(normalizedTo)
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
      className={className}
      {...props}
    >
      {children}
    </DSLink>
  )
}

import { type ComponentProps } from 'react'

import { Link as DSLink } from '@pluralsh/design-system/dist/markdoc/components'

import {
  type DocRoute,
  docRoutes,
  getRouteById,
} from '../routes/docs.generated'

type DocLinkProps = Omit<ComponentProps<typeof DSLink>, 'href'> & {
  to: string
  fallbackText?: string
}

// Strip numbered prefixes like "01-", "02-" from path segments
function stripNumberedPrefixes(path: string): string {
  return path
    .split('/')
    .map((segment) => segment.replace(/^\d+-/, ''))
    .join('/')
}

export function DocLink({
  to,
  fallbackText,
  children,
  ...props
}: DocLinkProps) {
  // Handle both direct route keys and route IDs
  let route: DocRoute | undefined

  console.debug('DocLink: Attempting to resolve route for:', to)

  // First try direct lookup
  if (to in docRoutes) {
    console.debug('DocLink: Found route via direct lookup')
    route = docRoutes[to as keyof typeof docRoutes]
  }

  // Then try by ID if not found
  if (!route) {
    console.debug('DocLink: Attempting lookup by ID')
    route = getRouteById(to)
    if (route) {
      console.debug('DocLink: Found route via ID lookup:', route)
    }
  }

  // If still not found, try normalizing the path
  if (!route) {
    const normalizedTo = to.toLowerCase().replace(/[^a-z0-9-]/g, '-')

    console.debug(
      'DocLink: Attempting lookup with normalized path:',
      normalizedTo
    )
    route = getRouteById(normalizedTo)
    if (route) {
      console.debug('DocLink: Found route via normalized path:', route)
    }
  }

  if (!route) {
    console.warn(
      `No route found for: ${to}. Available routes:`,
      Object.keys(docRoutes)
    )

    return fallbackText || children
  }

  // Ensure path starts with / and strip numbered prefixes
  const cleanPath = stripNumberedPrefixes(route.path)
  const href = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`

  console.debug(
    'DocLink: Final resolved href:',
    href,
    'from original path:',
    route.path
  )

  // Ensure we're not stripping too much from the path
  if (!href.includes('/')) {
    console.error('DocLink: Invalid path resolution:', {
      originalPath: route.path,
      cleanPath,
      href,
      routeId: route.id,
    })

    return fallbackText || children
  }

  return (
    <DSLink
      href={href}
      {...props}
    >
      {children}
    </DSLink>
  )
}

DocLink.defaultProps = {
  fallbackText: undefined,
}

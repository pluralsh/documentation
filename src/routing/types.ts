import { z } from 'zod'

// Core route schema
export const routeSchema = z.object({
  path: z.string(),
  title: z.string(),
  id: z.string(),
  section: z.string(),
  description: z.string().optional(),
  deprecated: z.boolean().optional(),
  redirectFrom: z.array(z.string()).optional(),
})

export type DocRoute = z.infer<typeof routeSchema>
export type DocRouteMap = Record<string, DocRoute>

// Navigation types
export type NavItem = {
  title: string
  href: string
  toMenu?: 'docs' | 'appCatalog' | 'plural'
  icon?: any
  sections?: NavItem[]
}

export type NavMenu = NavItem[]
export type NavMenuId = 'docs' | 'appCatalog'
export type MenuId = NavMenuId | 'plural'
export type NavData = Record<NavMenuId, NavMenu>

// Type-safe route key type
export type RouteKey = keyof typeof import('./registry').docRoutes

import { z } from 'zod'

import type { docRoutes } from './registry'

// Core route schema
export const routeSchema = z.object({
  path: z.string(),
  title: z.string(),
  id: z.string(),
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
  toMenu?: 'docs' | 'plural'
  icon?: any
  sections?: NavItem[]
  sortPath?: string
}

export type NavMenu = NavItem[]
export type NavMenuId = 'docs'
export type MenuId = NavMenuId | 'plural'
export type NavData = Record<NavMenuId, NavMenu>

export type RouteKey = keyof typeof docRoutes

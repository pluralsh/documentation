import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

import { type DocRoute } from './types'

/**
 * Convert a file path to a route ID
 */
export function pathToId(filePath: string): string {
  return filePath
    .replace(/^pages\//, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
    .replace(/[/-]/g, '_')
    .toLowerCase()
}

/**
 * Convert a file path to a route path
 */
export function normalizeRoutePath(filePath: string): string {
  return `/${filePath
    .replace(/^pages\//, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')}`
}

/**
 * Extract section from file path
 */
export function getSection(filePath: string): string {
  const parts = filePath.replace(/^pages\//, '').split('/')

  return parts.length > 1 ? parts[0] : 'overview'
}

/**
 * Get title from frontmatter or filename
 */
export function getTitle(filePath: string, content: string): string {
  const { data } = matter(content)

  if (data.title) return data.title

  const basename = path.basename(filePath, '.md')

  return basename
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Validate a route configuration
 */
export function validateRoute(route: DocRoute): string[] {
  const errors: string[] = []

  if (!route.path) errors.push('Missing path')
  if (!route.title) errors.push('Missing title')
  if (!route.id) errors.push('Missing id')

  // Check if file exists
  const possiblePaths = [
    path.join(process.cwd(), 'pages', `${route.path}.md`),
    path.join(process.cwd(), 'pages', route.path, 'index.md'),
    path.join(process.cwd(), 'pages', route.path),
  ]

  if (!possiblePaths.some((p) => fs.existsSync(p))) {
    errors.push(`No file found for path: ${route.path}`)
  }

  return errors
}

/**
 * Get all routes in a section
 */
export function getRoutesBySection(
  routes: DocRoute[],
  section: string
): DocRoute[] {
  return routes.filter((route) => route.section === section)
}

/**
 * Find a route by its path (including redirects)
 */
export function findRouteByPath(
  routes: DocRoute[],
  path: string
): DocRoute | undefined {
  // First try direct path match
  const directMatch = routes.find((route) => route.path === path)

  if (directMatch) return directMatch

  // Then check redirects
  return routes.find((route) => route.redirectFrom?.includes(path))
}

/**
 * Find a route by its ID
 */
export function findRouteById(
  routes: DocRoute[],
  id: string
): DocRoute | undefined {
  return routes.find((route) => route.id === id)
}

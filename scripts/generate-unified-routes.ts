import fs from 'fs'
import path from 'path'
import { generateRoutingData } from '../src/routing/generator'

// Load existing routes if available
let existingRoutes = {}
try {
  const { docRoutes } = require('../src/routing/registry')
  existingRoutes = docRoutes
} catch (error) {
  // No existing routes file, start fresh
  console.log('No existing routes found, generating from scratch')
}

// Generate routes and navigation
const { routes, navigation, routeCode } = generateRoutingData(
  path.join(process.cwd(), 'pages'),
  existingRoutes
)

// Write routes to registry file
fs.writeFileSync(
  path.join(process.cwd(), 'src/routing/registry.ts'),
  routeCode
)

// Write navigation to file
const navCode = `/**
 * @file This file is auto-generated. DO NOT EDIT DIRECTLY!
 */

import type { NavMenu } from './types'

export const docNavigation: NavMenu = ${JSON.stringify(navigation, null, 2)}`

fs.writeFileSync(
  path.join(process.cwd(), 'src/routing/navigation.ts'),
  navCode
)

console.log('\n✅ Generated files:')
console.log('  - src/routing/registry.ts')
console.log('  - src/routing/navigation.ts')
console.log('\nPlease review the changes before committing.') 
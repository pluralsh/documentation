import fs from 'fs'
import path from 'path'

import { docRoutes as existingDocRoutes } from '../src/routes/docs.generated'
import { generateRoutingData } from '../src/routing/generator'

// Load existing routes if available
let existingRoutes = {}

try {
  existingRoutes = existingDocRoutes
} catch (error) {
  // No existing routes file, start fresh
  console.log('No existing routes found, generating from scratch')
}

console.log('Generating routes and navigation...')

// Generate routes and navigation
const { routes, navigation, routeCode } = generateRoutingData(
  path.join(process.cwd(), 'pages'),
  existingRoutes
)

console.log(`Found ${Object.keys(routes).length} routes`)

const docsGeneratedPath = path.join(
  process.cwd(),
  'src/routes/docs.generated.ts'
)
const navigationPath = path.join(process.cwd(), 'src/routing/navigation.ts')

// Write routes to registry file
console.log(`Writing routes to ${docsGeneratedPath}`)
fs.writeFileSync(docsGeneratedPath, routeCode)

// Write navigation to file
const navCode = `/**
 * @file This file is auto-generated. DO NOT EDIT DIRECTLY!
 */

import type { NavMenu } from './types'

export const docNavigation: NavMenu = ${JSON.stringify(navigation, null, 2)}`

console.log(`Writing navigation to ${navigationPath}`)
fs.writeFileSync(navigationPath, navCode)

console.log('\n✅ Generated files:')
console.log(`  - ${docsGeneratedPath}`)
console.log(`  - ${navigationPath}`)

// Verify files were written
console.log('\nVerifying files...')
if (fs.existsSync(docsGeneratedPath)) {
  console.log('✅ Routes file exists')
} else {
  console.log('❌ Routes file not found!')
}

if (fs.existsSync(navigationPath)) {
  console.log('✅ Navigation file exists')
  const content = fs.readFileSync(navigationPath, 'utf8')

  console.log(`Navigation file size: ${content.length} bytes`)
} else {
  console.log('❌ Navigation file not found!')
}

console.log('\nPlease review the changes before committing.')

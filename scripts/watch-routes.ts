import chokidar from 'chokidar'
import type { FSWatcher } from 'chokidar'
import fs from 'fs'
import path from 'path'
import { generateRoutingData } from '../src/routing/generator'

const WATCH_PATHS = ['pages/**/*.md']
const ROUTES_FILE = path.join(process.cwd(), 'src/routing/registry.ts')
const NAV_FILE = path.join(process.cwd(), 'src/routing/navigation.ts')

// Debounce function to prevent multiple rapid executions
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Function to update routes and navigation
async function updateRouting() {
  console.log('\n🔄 Updating routes and navigation...')
  
  try {
    // Load existing routes if available
    let existingRoutes = {}
    try {
      const { docRoutes } = require('../src/routing/registry')
      existingRoutes = docRoutes
    } catch (error) {
      // No existing routes file
    }

    // Generate new routes and navigation
    const { routes, navigation, routeCode } = generateRoutingData(
      path.join(process.cwd(), 'pages'),
      existingRoutes
    )

    // Write routes file
    fs.writeFileSync(ROUTES_FILE, routeCode)
    
    // Generate and write navigation file
    const navCode = `/**
 * @file This file is auto-generated. DO NOT EDIT DIRECTLY!
 */

import type { NavMenu } from './types'

export const docNavigation: NavMenu = ${JSON.stringify(navigation, null, 2)}`
    
    fs.writeFileSync(NAV_FILE, navCode)
    
    console.log('✅ Routes and navigation updated successfully')
  } catch (error) {
    console.error('❌ Error updating routes:', error)
  }
}

// Debounced version of updateRouting
const debouncedUpdate = debounce(updateRouting, 1000)

// Initialize watcher
console.log('👀 Watching for documentation changes...')
const watcher = chokidar.watch(WATCH_PATHS, {
  ignoreInitial: false,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: 100
  }
}) as FSWatcher

watcher.on('all', (event: string, filePath: string) => {
  if (event === 'add' || event === 'change' || event === 'unlink') {
    console.log(`📝 ${event}: ${filePath}`)
    debouncedUpdate()
  }
}) 
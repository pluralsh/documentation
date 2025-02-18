import chokidar from 'chokidar'
import fs from 'fs'
import path from 'path'
import { generateRoutes } from '../src/routing/generator'

const WATCH_PATHS = ['pages/**/*.md']
const ROUTES_FILE = path.join(process.cwd(), 'src/routing/registry.ts')

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

// Function to update routes
async function updateRoutes() {
  console.log('\n🔄 Updating routes...')
  
  try {
    const routes = generateRoutes()
    fs.writeFileSync(ROUTES_FILE, routes)
    console.log('✅ Routes updated successfully')
  } catch (error) {
    console.error('❌ Error updating routes:', error)
  }
}

// Debounced version of updateRoutes
const debouncedUpdate = debounce(updateRoutes, 1000)

// Initialize watcher
console.log('👀 Watching for documentation changes...')
console.log('   Paths:', WATCH_PATHS.join('\n         '))

const watcher = chokidar.watch(WATCH_PATHS, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
})

// Add event listeners
watcher
  .on('add', (filePath: string) => {
    console.log(`📝 File ${filePath} has been added`)
    debouncedUpdate()
  })
  .on('change', (filePath: string) => {
    console.log(`📝 File ${filePath} has been changed`)
    debouncedUpdate()
  })
  .on('unlink', (filePath: string) => {
    console.log(`🗑️  File ${filePath} has been removed`)
    debouncedUpdate()
  })
  .on('error', (error: Error) => console.error(`❌ Watcher error: ${error}`)) 
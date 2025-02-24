import { execSync } from 'child_process'
import fs from 'fs'

const CONFIG_FILE = 'next.config.js'
const BACKUP_FILE = 'next.config.js.bak'

// Strips numbered prefixes like "01-", "02-" from path segments
function stripNumberedPrefixes(path: string): string {
  return path
    .split('/')
    .map((segment) => segment.replace(/^\d+-/, ''))
    .join('/')
}

// Helper to normalize paths for comparison
function normalizeUrlPath(filePath: string): string {
  return stripNumberedPrefixes(
    filePath
      .replace(/^pages\//, '/')
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
      .toLowerCase() // Normalize case for comparison
  )
}

// Helper to find all redirects in config
function parseExistingRedirects(
  content: string
): Array<{ source: string; destination: string }> {
  const redirects: Array<{ source: string; destination: string }> = []
  const redirectRegex = /{\s*source:\s*'([^']+)',\s*destination:\s*'([^']+)'/g
  let match: RegExpExecArray | null

  while ((match = redirectRegex.exec(content)) !== null) {
    redirects.push({
      source: match[1],
      destination: match[2],
    })
  }

  return redirects
}

// Helper to detect circular redirects
function detectCircularRedirects(
  redirects: Array<{ source: string; destination: string }>,
  newSource: string,
  newDestination: string
): boolean {
  // Add the new redirect to the list
  const allRedirects = [
    ...redirects,
    { source: newSource, destination: newDestination },
  ]

  // Build a map of redirects for faster lookup
  const redirectMap = new Map(
    allRedirects.map(({ source, destination }) => [source, destination])
  )

  // Check each redirect for cycles
  for (const { source } of allRedirects) {
    let current = source
    const seen = new Set<string>()

    while (redirectMap.has(current)) {
      if (seen.has(current)) {
        return true // Circular redirect detected
      }
      seen.add(current)
      current = redirectMap.get(current)!
    }
  }

  return false
}

// Improved removeRedirectFromConfig function
function removeRedirectFromConfig(sourcePath: string): void {
  try {
    let content = fs.readFileSync(CONFIG_FILE, 'utf-8')

    // Create a regex that matches the entire redirect object
    const redirectRegex = new RegExp(
      `\\s*{\\s*source:\\s*'${sourcePath}',[^}]+},?\\n?`,
      'g'
    )

    content = content.replace(redirectRegex, '')

    // Clean up any empty lines or duplicate commas
    content = content
      .replace(/,\s*,/g, ',')
      .replace(/\[\s*,/, '[')
      .replace(/,\s*\]/, ']')

    // Create backup before writing
    fs.writeFileSync(BACKUP_FILE, fs.readFileSync(CONFIG_FILE))
    fs.writeFileSync(CONFIG_FILE, content)
    console.log(`Removed redirect for: ${sourcePath}`)
  } catch (error) {
    console.error('Error removing redirect:', error)
    throw error
  }
}

function addRedirectToConfig(oldPath: string, newPath: string): void {
  try {
    // Create backup before modifications
    fs.copyFileSync(CONFIG_FILE, BACKUP_FILE)

    // Read the current next.config.js
    let content = fs.readFileSync(CONFIG_FILE, 'utf-8')

    // Normalize paths for comparison
    const oldUrl = normalizeUrlPath(oldPath)
    const newUrl = normalizeUrlPath(newPath)

    // Validate paths
    if (!oldUrl || !newUrl) {
      throw new Error('Invalid path format')
    }

    // Don't add redirect if source and destination are the same
    if (oldUrl === newUrl) {
      console.log(
        `Skipping redirect where source equals destination: ${oldUrl}`
      )

      return
    }

    // Parse existing redirects
    const existingRedirects = parseExistingRedirects(content)

    // Check for circular redirects
    if (detectCircularRedirects(existingRedirects, oldUrl, newUrl)) {
      console.error(
        `Adding redirect from ${oldUrl} to ${newUrl} would create a circular reference. Skipping.`
      )

      return
    }

    // Check if this is a file returning to its original location
    const reverseRedirect = existingRedirects.find(
      (r) => r.source === newUrl && r.destination === oldUrl
    )

    if (reverseRedirect) {
      console.log(`File returning to original location: ${newUrl} -> ${oldUrl}`)
      removeRedirectFromConfig(newUrl)

      return
    }

    // Check if redirect already exists
    const existingRedirect = existingRedirects.find((r) => r.source === oldUrl)

    if (existingRedirect) {
      if (existingRedirect.destination === newUrl) {
        console.log(`Redirect already exists: ${oldUrl} -> ${newUrl}`)

        return
      }
      // Update existing redirect if destination has changed
      console.log(
        `Updating existing redirect: ${oldUrl} -> ${existingRedirect.destination} to ${oldUrl} -> ${newUrl}`
      )
      removeRedirectFromConfig(oldUrl)
    }

    // Find the redirects array
    const redirectsStart = content.indexOf('return [')

    if (redirectsStart === -1) {
      throw new Error('Could not find redirects array in next.config.js')
    }

    // Insert the new redirect at the start of the array
    const newRedirect = `      {
        source: '${oldUrl}',
        destination: '${newUrl}',
        permanent: true,
      },\n`

    content =
      content.slice(0, redirectsStart + 8) +
      newRedirect +
      content.slice(redirectsStart + 8)

    // Write back to the file
    fs.writeFileSync(CONFIG_FILE, content)
    console.log(`Added redirect: ${oldUrl} -> ${newUrl}`)
  } catch (error) {
    console.error('Error adding redirect:', error)
    // Restore backup if it exists
    if (fs.existsSync(BACKUP_FILE)) {
      fs.copyFileSync(BACKUP_FILE, CONFIG_FILE)
      console.log('Restored backup due to error')
    }
    throw error
  }
}

// Get all renamed/moved markdown files in the pages directory
function getMovedFiles(): Array<[string, string]> {
  try {
    // Get renamed files from Git status
    const gitStatus = execSync('git status -s', { encoding: 'utf8' })
    const movedFiles: Array<[string, string]> = []

    gitStatus.split('\n').forEach((line) => {
      // R = renamed/moved file
      if (line.startsWith('R ') || line.startsWith(' R')) {
        // Git status format for renames is: R  old-path -> new-path
        const [_, paths] = line.trim().split(/\s+(.+)/)
        const [oldPath, newPath] = paths.split(' -> ')

        if (
          oldPath.startsWith('pages/') &&
          newPath.startsWith('pages/') &&
          oldPath.endsWith('.md') &&
          newPath.endsWith('.md')
        ) {
          console.log('Found moved file:', oldPath, '->', newPath)
          movedFiles.push([oldPath, newPath])
        }
      }
    })

    return movedFiles
  } catch (error) {
    console.error('Error getting moved files:', error)

    return []
  }
}

// Process all moved files
function processMovedFiles(): void {
  const movedFiles = getMovedFiles()

  if (movedFiles.length === 0) {
    console.log('No moved markdown files detected in the pages directory')

    return
  }

  console.log('Processing moved files...')
  movedFiles.forEach(([oldPath, newPath]) => {
    try {
      console.log(`\nProcessing move: ${oldPath} -> ${newPath}`)
      addRedirectToConfig(oldPath, newPath)
    } catch (error) {
      console.error(`Error processing move ${oldPath} -> ${newPath}:`, error)
    }
  })
}

// If run directly, process all moved files
if (require.main === module) {
  processMovedFiles()
}

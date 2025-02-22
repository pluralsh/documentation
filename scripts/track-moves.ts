import { execSync } from 'child_process'
import fs from 'fs'

const CONFIG_FILE = 'next.config.js'

// Strips numbered prefixes like "01-", "02-" from path segments
function stripNumberedPrefixes(path: string): string {
  return path
    .split('/')
    .map((segment) => segment.replace(/^\d+-/, ''))
    .join('/')
}

function removeRedirectFromConfig(source: string) {
  let content = fs.readFileSync(CONFIG_FILE, 'utf-8')

  // Find the redirect entry
  const redirectRegex = new RegExp(
    `\\s*\\{\\s*source:\\s*'${source}',[^}]+\\},?\\n?`,
    'g'
  )

  // Remove the redirect
  content = content.replace(redirectRegex, '')

  // Clean up any double newlines created by the removal
  content = content.replace(/\n\n\n+/g, '\n\n')

  // Write back to the file
  fs.writeFileSync(CONFIG_FILE, content)
  console.log(`Removed redirect for: ${source}`)
}

function addRedirectToConfig(oldPath: string, newPath: string) {
  // Read the current next.config.js
  let content = fs.readFileSync(CONFIG_FILE, 'utf-8')

  // Convert file paths to URL paths and strip numbered prefixes
  const oldUrl = stripNumberedPrefixes(
    oldPath
      .replace(/^pages\//, '/')
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
  )

  const newUrl = stripNumberedPrefixes(
    newPath
      .replace(/^pages\//, '/')
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
  )

  // Check if this is a file returning to its original location
  // by looking for a redirect where this file's new location was the source
  const returningFileRegex = new RegExp(
    `source:\\s*'${newUrl}',[^}]+destination:\\s*'${oldUrl}'`
  )

  if (content.match(returningFileRegex)) {
    console.log(`File returning to original location: ${newUrl} -> ${oldUrl}`)
    removeRedirectFromConfig(newUrl)

    return
  }

  // Check if redirect already exists
  if (content.includes(`source: '${oldUrl}'`)) {
    console.log(`Redirect already exists for: ${oldUrl}`)

    return
  }

  // Find the redirects array
  const redirectsStart = content.indexOf('return [')

  if (redirectsStart === -1) {
    console.error('Could not find redirects array in next.config.js')

    return
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
function processMovedFiles() {
  const movedFiles = getMovedFiles()

  if (movedFiles.length === 0) {
    console.log('No moved markdown files detected in the pages directory')

    return
  }

  console.log('Processing moved files...')
  movedFiles.forEach(([oldPath, newPath]) => {
    console.log(`\nProcessing move: ${oldPath} -> ${newPath}`)
    addRedirectToConfig(oldPath, newPath)
  })
}

// If run directly, process all moved files
if (require.main === module) {
  processMovedFiles()
}

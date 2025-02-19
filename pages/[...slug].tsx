import fs from 'fs'
import path from 'path'
import { type ParsedUrlQuery } from 'querystring'

import { type GetStaticPaths, type GetStaticProps } from 'next'

import MarkdocComponent from '@src/components/MarkdocContent'
import { readMdFileCached } from '@src/markdoc/mdParser'
import { type MarkdocPage } from '@src/markdoc/mdSchema'

// Cache for markdown files list in development
let markdownFilesCache: string[] | null = null
let markdownFilesCacheTime: number = 0
const CACHE_TTL = 5000 // 5 seconds cache in development

interface Params extends ParsedUrlQuery {
  slug: string[]
}

export default function MarkdocContent({
  markdoc,
}: {
  markdoc: MarkdocPage | null
}) {
  return markdoc && <MarkdocComponent markdoc={markdoc} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesDirectory = path.join('pages')

  // Use cached files list if available and not expired
  const now = Date.now()
  if (
    process.env.NODE_ENV === 'development' &&
    markdownFilesCache &&
    now - markdownFilesCacheTime < CACHE_TTL
  ) {
    const paths = markdownFilesCache.map((file) => {
      const relativePath = path.relative(pagesDirectory, file)
      const parsedPath = path.parse(relativePath)
      const dirSegments = parsedPath.dir ? parsedPath.dir.split(path.sep) : []
      const cleanDirSegments = dirSegments.map((segment) =>
        segment.replace(/^\d+-/, '')
      )
      const cleanFileName = parsedPath.name.replace(/^\d+-/, '')
      let slug =
        cleanFileName === 'index'
          ? cleanDirSegments
          : [...cleanDirSegments, cleanFileName]
      slug = slug.filter(Boolean)
      return { params: { slug } }
    })
    return { paths, fallback: 'blocking' }
  }

  // recursively get all .md files in the 'pages/' directory
  function getAllMarkdownFiles(dir: string, files: string[] = []): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        getAllMarkdownFiles(fullPath, files)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }

    return files
  }

  const markdownFiles = getAllMarkdownFiles(pagesDirectory)

  // Update cache in development
  if (process.env.NODE_ENV === 'development') {
    markdownFilesCache = markdownFiles
    markdownFilesCacheTime = now
  }

  const paths = markdownFiles.map((file) => {
    const relativePath = path.relative(pagesDirectory, file)
    const parsedPath = path.parse(relativePath)
    const dirSegments = parsedPath.dir ? parsedPath.dir.split(path.sep) : []
    const cleanDirSegments = dirSegments.map((segment) =>
      segment.replace(/^\d+-/, '')
    )
    const cleanFileName = parsedPath.name.replace(/^\d+-/, '')
    let slug =
      cleanFileName === 'index'
        ? cleanDirSegments
        : [...cleanDirSegments, cleanFileName]
    slug = slug.filter(Boolean)
    return { params: { slug } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<
  { markdoc: MarkdocPage | null },
  Params
> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true }
  }

  const slugPath = params.slug.join('/')
  const pagesDir = 'pages'

  // Helper function to find the actual path with numeric prefixes
  const findActualPath = (targetPath: string): string | null => {
    const segments = targetPath.split('/')
    let currentPath = pagesDir
    const finalSegments: string[] = []

    // Cache directory entries at each level to avoid repeated reads
    const dirCache = new Map<string, fs.Dirent[]>()

    // Helper to get directory entries with caching
    const getDirEntries = (dir: string) => {
      if (!dirCache.has(dir)) {
        if (!fs.existsSync(dir)) return null
        dirCache.set(dir, fs.readdirSync(dir, { withFileTypes: true }))
      }
      return dirCache.get(dir)!
    }

    // Handle each path segment
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      const isLast = i === segments.length - 1

      const entries = getDirEntries(currentPath)
      if (!entries) return null

      if (isLast) {
        // For the last segment, try these in order:
        // 1. Look for index.md in a matching directory
        // 2. Look for a matching file with or without numeric prefix
        const matchingDir = entries.find(
          (entry) =>
            entry.isDirectory() && entry.name.replace(/^\d+-/, '') === segment
        )

        if (matchingDir) {
          finalSegments.push(matchingDir.name)
          const indexEntries = getDirEntries(
            path.join(currentPath, matchingDir.name)
          )
          if (indexEntries) {
            const indexFile = indexEntries.find((e) => e.name === 'index.md')
            if (indexFile) {
              return path.join(pagesDir, ...finalSegments, indexFile.name)
            }
          }
        }

        // Try to find a matching file
        const matchingFile = entries.find(
          (entry) =>
            entry.isFile() &&
            entry.name.endsWith('.md') &&
            entry.name.replace(/^\d+-/, '').replace(/\.md$/, '') === segment
        )

        if (matchingFile) {
          finalSegments.push(matchingFile.name)
          return path.join(pagesDir, ...finalSegments)
        }
      } else {
        // For directory segments, look for matching directory
        const matchingDir = entries.find(
          (entry) =>
            entry.isDirectory() && entry.name.replace(/^\d+-/, '') === segment
        )

        if (matchingDir) {
          finalSegments.push(matchingDir.name)
          currentPath = path.join(currentPath, matchingDir.name)
          continue
        }
      }

      return null
    }

    return null
  }

  // Try different possible paths
  const possiblePaths = [
    // Try finding the actual path with numeric prefixes first
    findActualPath(slugPath),
    // Then try exact matches
    path.join(pagesDir, `${slugPath}.md`),
    path.join(pagesDir, slugPath, 'index.md'),
  ].filter((p): p is string => Boolean(p))

  // Find first existing path
  const filePath =
    possiblePaths.find((p) => {
      try {
        return fs.existsSync(p) && fs.statSync(p).isFile()
      } catch {
        return false
      }
    }) || null

  if (!filePath) {
    return { notFound: true }
  }

  const markdoc = await readMdFileCached(filePath)

  return {
    props: {
      displayTitle: markdoc?.frontmatter?.title ?? '',
      displayDescription: markdoc?.frontmatter?.description ?? '',
      markdoc,
    },
  }
}

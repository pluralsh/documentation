import fs from 'fs'
import path from 'path'
import { type ParsedUrlQuery } from 'querystring'

import { type GetStaticPaths, type GetStaticProps } from 'next'

import MarkdocComponent from '@src/components/MarkdocContent'
import { readMdFileCached } from '@src/markdoc/mdParser'
import { type MarkdocPage } from '@src/markdoc/mdSchema'

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

  const paths = markdownFiles.map((file) => {
    const relativePath = path.relative(pagesDirectory, file)
    const parsedPath = path.parse(relativePath)

    // Split the directory path into segments
    const dirSegments = parsedPath.dir ? parsedPath.dir.split(path.sep) : []

    // Clean numeric prefixes from each directory segment and the filename
    const cleanDirSegments = dirSegments.map((segment) =>
      segment.replace(/^\d+-/, '')
    )
    const cleanFileName = parsedPath.name.replace(/^\d+-/, '')

    // Construct the final slug
    let slug: string[]

    if (cleanFileName === 'index') {
      slug = cleanDirSegments
    } else {
      slug = [...cleanDirSegments, cleanFileName]
    }

    // Filter out any empty segments
    slug = slug.filter(Boolean)

    return {
      params: {
        slug,
      },
    }
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

  // Helper function to find files with numeric prefixes in a directory
  const findMatchingFile = (dir: string, targetPath: string): string | null => {
    if (!fs.existsSync(dir)) return null

    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const cleanName = entry.name.replace(/^\d+-/, '').replace(/\.md$/, '')

        if (cleanName === targetPath) {
          return path.join(dir, entry.name)
        }
      }
    }

    return null
  }

  // Helper function to find the actual path with numeric prefixes
  const findActualPath = (targetPath: string): string | null => {
    const segments = targetPath.split('/')
    let currentPath = pagesDir
    const finalSegments: string[] = []

    // Handle each path segment
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      const isLast = i === segments.length - 1

      if (isLast) {
        // For the last segment, look for a matching file
        const matchingFile = findMatchingFile(currentPath, segment)

        if (matchingFile) {
          finalSegments.push(path.basename(matchingFile))

          return path.join(pagesDir, ...finalSegments)
        }
      } else {
        // For directory segments, look for matching directory with or without numeric prefix
        const entries = fs.readdirSync(currentPath, { withFileTypes: true })
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
    // Try exact match first
    path.join(pagesDir, `${slugPath}.md`),
    path.join(pagesDir, slugPath, 'index.md'),
    // Try finding the actual path with numeric prefixes
    findActualPath(slugPath),
  ].filter(Boolean) as string[]

  const filePath = possiblePaths.find((p) => fs.existsSync(p)) || null

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

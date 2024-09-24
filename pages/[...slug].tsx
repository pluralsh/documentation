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

    const dirSegments = parsedPath.dir ? parsedPath.dir.split(path.sep) : []

    let slug: string[]

    if (parsedPath.name === 'index') slug = dirSegments
    else slug = [...dirSegments, parsedPath.name]

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

  // looks for folder/name/index.md first, then folder/name.md
  const filePath =
    [
      path.join('pages', slugPath, 'index.md'),
      path.join('pages', `${slugPath}.md`),
    ].find(fs.existsSync) || null

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

import { DocumentIcon } from '@pluralsh/design-system'
import { Button } from 'honorable'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { useNavMenu } from '../contexts/NavDataContext'
import { removeTrailingSlashes } from '../utils/text'

import { ArticleList, Title } from './ArticlesInSection'

import type { NavItem } from '../NavData'

function findArticlesIn(routerPathname,
  sections: NavItem[] | undefined,
  depth = 0): NavItem[] | undefined {
  routerPathname = removeTrailingSlashes(routerPathname)
  for (const section of sections || []) {
    if (routerPathname === removeTrailingSlashes(section.href)) {
      return section.sections
    }
    const res = findArticlesIn(routerPathname, section.sections, depth + 1)

    if (res) {
      return res
    }
  }

  return undefined
}

function AppsList({
  className,
  hasContent: _,
  ...props
}: {
  className?: string
  hasContent: boolean
}) {
  const { pathname } = useRouter()
  const navData = useNavMenu()

  const articles = findArticlesIn(pathname, navData)

  if (!articles || articles.length <= 0) {
    return null
  }

  return (
    <nav
      className={className}
      {...props}
    >
      <Title>Articles in this section:</Title>
      <ArticleList>
        {articles
          && articles.map(article => (
            <li key={article.href}>
              <Button
                floating
                textTransform="none"
                startIcon={article.icon || <DocumentIcon />}
                as="a"
                href={article.href}
              >
                {article.title}
              </Button>
            </li>
          ))}
      </ArticleList>
    </nav>
  )
}

export default styled(AppsList)(({ theme, hasContent }) => ({
  marginTop: theme.spacing.large,
  paddingBottom: hasContent ? theme.spacing.xlarge : 0,
  borderBottom: hasContent ? theme.borders.default : 'none',
  'ol, li': {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
}))

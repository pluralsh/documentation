import styled from 'styled-components'
import { useRouter } from 'next/router'

import { Button } from 'honorable'

import { DocumentIcon } from '@pluralsh/design-system'
import { removeTrailingSlashes } from '../utils/text'

import navData, { NavItem } from '../NavData'

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

const ArticleList = styled.ul(({ theme }) => ({
  margin: 0,
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing.small,
  ...theme.partials.marketingText.label,
  marginBottom: theme.spacing.medium,
}))

const Title = styled.h2(({ theme }) => ({
  ...theme.partials.marketingText.label,
  marginBottom: theme.spacing.medium,
}))

function ArticlesInSection({
  className,
  hasContent: _,
  ...props
}: {
  className?: string
  hasContent: boolean
}) {
  const { pathname } = useRouter()

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

export default styled(ArticlesInSection)(({ theme, hasContent }) => ({
  marginTop: theme.spacing.large,
  paddingBottom: hasContent ? theme.spacing.xlarge : 0,
  borderBottom: hasContent ? theme.borders.default : 'none',
  'ol, li': {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
}))

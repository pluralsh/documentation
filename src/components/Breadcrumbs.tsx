import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { removeTrailingSlashes } from 'utils/text'

import { ReactNode } from 'react'

import navData, { NavItem } from '../NavData'

const LinkA = styled.a(({ theme }) => ({
  ...theme.partials.marketingText.componentLinkSmall,
  display: 'inline',
  textDecoration: 'none',
  cursor: 'pointer',

  '&:any-link': {
    color: theme.colors['text-xlight'],
  },
  '&[aria-current="page"]': {
    color: theme.colors.text,
  },
}))

const NonLink = styled.span(({ theme }) => ({
  ...theme.partials.marketingText.componentLinkSmall,
  display: 'inline',
  textDecoration: 'none',
  cursor: 'unset',
  '&:hover': {
    textDecoration: 'none',
  },
  color: theme.colors['text-xlight'],
}))

const Li = styled.li(({ theme }) => ({
  ...theme.partials.marketingText.componentLinkSmall,
  display: 'inline',
  textDecoration: 'none',
  cursor: 'unset',
  '&:hover': {
    textDecoration: 'none',
  },
  color: theme.colors['text-xlight'],

  '& + &::before': {
    display: 'inline-block',
    margin: `0 ${theme.spacing.xsmall}px`,
    content: '"/"',
  },
}))

function findCrumbs(path, sections: NavItem[] = navData) {
  path = removeTrailingSlashes(path)

  for (const section of sections) {
    if (removeTrailingSlashes(section.href) === path) {
      return [section]
    }
    const tailCrumbs = findCrumbs(path, section?.sections || [])

    if (tailCrumbs.length > 0) {
      return [section, ...tailCrumbs]
    }
  }

  return []
}

function Breadcrumbs({ className }: { className?: string }) {
  const { pathname } = useRouter()

  const crumbs = [{ title: 'Docs', href: '/' }, ...findCrumbs(pathname)]

  return (
    <nav
      className={className}
      aria-label="Breadcrumb"
    >
      <ol>
        {crumbs.map((crumb, idx) => {
          if (!crumb.title) {
            return undefined
          }
          let inner: ReactNode = crumb.title

          if (crumb.href) {
            inner = (
              <Link
                href={crumb.href}
                passHref
              >
                <LinkA
                  {...(idx === crumbs.length - 1
                    ? { 'aria-current': 'page' }
                    : {})}
                >
                  {crumb.title}
                </LinkA>
              </Link>
            )
          }
          else {
            inner = <NonLink>{crumb.title}</NonLink>
          }

          return (
            <Li key={`${crumb.title || ''}+${crumb.href || ''}`}>{inner}</Li>
          )
        })}
      </ol>
    </nav>
  )
}

export default styled(Breadcrumbs)(({ theme }) => ({
  '.current': {
    li: {
      color: theme.colors.text,
    },
  },
  'ol, li': {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
}))

import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cloneDeep from 'lodash/cloneDeep'

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
  '&[aria-current="page"]': {
    color: theme.colors.text,
  },
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

  for (const { title, href, sections: sects } of sections) {
    if (removeTrailingSlashes(href) === path) {
      return [{ title, href }]
    }
    const tailCrumbs = findCrumbs(path, sects || [])

    if (tailCrumbs.length > 0) {
      return [{ title, href }, ...tailCrumbs]
    }
  }

  return []
}

function Breadcrumbs({ className }: { className?: string }) {
  const { pathname } = useRouter()

  const crumbs = [{ title: 'Docs' }, ...findCrumbs(pathname)]

  console.log(crumbs[crumbs.length - 1].href)
  crumbs[crumbs.length - 1].href = undefined

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
            inner = (
              <NonLink
                {...(idx === crumbs.length - 1
                  ? { 'aria-current': 'page' }
                  : {})}
              >{crumb.title}
              </NonLink>
            )
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

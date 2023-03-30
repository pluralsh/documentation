import { useMemo } from 'react'
import type { ReactNode } from 'react'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { useNavMenu } from '../contexts/NavDataContext'
import { getBarePathFromPath, removeTrailingSlashes } from '../utils/text'

import type { NavItem } from '../NavData'

const StyledLink = styled(NextLink)(({ theme }) => ({
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

function findCrumbs(path, sections: NavItem[]) {
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
  const { asPath } = useRouter()

  const path = getBarePathFromPath(asPath)
  const navData = useNavMenu()

  const crumbs = useMemo(
    () => [{ title: 'Docs' }, ...findCrumbs(path, navData)],
    [navData, path]
  )

  if (crumbs.length <= 1) {
    return null
  }
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
              <StyledLink
                href={crumb.href}
                {...(idx === crumbs.length - 1
                  ? { 'aria-current': 'page' }
                  : {})}
              >
                {crumb.title}
              </StyledLink>
            )
          } else {
            inner = (
              <NonLink
                {...(idx === crumbs.length - 1
                  ? { 'aria-current': 'page' }
                  : {})}
              >
                {crumb.title}
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

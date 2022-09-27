import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Title = styled.h3(({ theme }) => ({
  ...theme.partials.marketingText.label,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.medium,
  '&::after': {
    // Use to align baseline with Hero 2 text
    ...theme.partials.marketingText.hero2,
    display: 'inline',
    verticalAlign: 'baseline',
    content: '"​"',
    width: '0',
    overflow: 'hidden',
    position: 'relative',
  },
}))

const List = styled.ul(({ theme }) => ({
  position: 'relative',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  marginBottom: theme.spacing.medium,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    // zIndex: -1,
    borderLeft: theme.borders.default,
  },
}))

const ListItem = styled.li(() => ({
  margin: 0,
  padding: 0,
  listStyle: 'none',
}))

const LinkA = styled.a<{ $active: boolean }>(({ theme, $active = false }) => ({
  position: 'relative',
  display: 'block',
  ...theme.partials.marketingText.componentLinkSmall,
  color: theme.colors['text-xlight'],
  textDecoration: 'none',
  margin: 0,
  paddingLeft: theme.spacing.medium,
  paddingTop: theme.spacing.xxsmall,
  paddingBottom: theme.spacing.xxsmall,
  paddingRight: theme.spacing.small,
  ...($active ? {
    color: theme.colors.text,
  } : {}),
  '&:hover': {
    textDecoration: 'underline',
    color: theme.colors.text,
  },
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  '&::before': {
    zIndex: 1,
    borderLeft: $active
      ? `3px solid ${theme.colors['border-primary']}`
      : 'none',
  },
  '&:focus-visible::after': {
    ...theme.partials.focus.insetAbsolute,
    zIndex: 1,
  },
}))

export const TableOfContents = styled(({ toc, ...props }) => {
  const items = toc.filter(item => item.id && (item.level === 2 || item.level === 3))

  if (items.length <= 1) {
    return null
  }

  return (
    <nav {...props}>
      <Title>On this page</Title>
      <List>
        {items.map(item => {
          const href = `#${item.id}`
          const active
            = typeof window !== 'undefined' && window.location.hash === href

          return (
            <ListItem key={item.title}>
              <Link
                href={href}
                passHref
              >
                <LinkA $active={active}>{item.title}</LinkA>
              </Link>
            </ListItem>
          )
        })}
      </List>
    </nav>
  )
})(() => ({}))

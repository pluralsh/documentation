import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

import { usePrevious } from '@pluralsh/design-system'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { exists } from '../utils/typescript'

import type { MarkdocHeading } from '../../pages/_app'

const Title = styled.h2(({ theme }) => ({
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
    borderLeft: theme.borders.default,
  },
}))

const ListItem = styled.li(() => ({
  margin: 0,
  padding: 0,
  listStyle: 'none',
}))

const StyledLink = styled(NextLink)<{ $active: boolean }>(
  ({ theme, $active }) => ({
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
    '&::before': {
      zIndex: 1,
      borderLeft: `3px solid ${theme.colors['border-primary']}`,
      transform: 'scaleX(0)',
      transformOrigin: 'center left',
      transition: 'transform 0.15s ease-in',
    },
    ...($active
      ? {
          color: theme.colors.text,
          '&::before ': {
            zIndex: 1,
            borderLeft: `3px solid ${theme.colors['border-primary']}`,
            transform: 'scaleX(1)',
            transition: 'transform 0.2s ease-out',
          },
        }
      : {}),
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
    '&:focus, &:focus-visible': {
      boxShadow: 'none',
    },
    '&:focus-visible::after': {
      ...theme.partials.focus.insetAbsolute,
      zIndex: 1,
    },
  })
)

export const ScrollContainer = styled.div(({ theme: _ }) => ({
  overflowY: 'auto',
  maxHeight: '-webkit-fill-available',
}))

const scrollThreshold = 48

function TableOfContentsBase({
  toc = [],
  ...props
}: {
  toc?: MarkdocHeading[]
}) {
  const items = useMemo(
    () =>
      toc.filter((item) => (item.id && item.level === 1) || item.level === 2),
    [toc]
  )
  const labelId = `nav-label-${useId()}`
  const firstRender = useRef(true)
  const hashIsInToC = useCallback(
    (hash: string) =>
      !!items.find((item) => `#${item.id}` === hash) || hash === '',
    [items]
  )

  const [headingElements, setHeadingElements] = useState<HTMLElement[]>([])
  const router = useRouter()

  const { hash } =
    (typeof window !== 'undefined' && window?.location) ||
    new URL(`http://plural.sh${router.asPath}`)
  const previousHash = usePrevious(hash)

  const ignoreNextScrollEvent = useRef(!!hash)

  const [highlightedHash, _setHighlightedHash] = useState(
    hashIsInToC(hash) ? hash : ''
  )
  const setHighlightedHash = useCallback(
    (hash) => {
      if (hashIsInToC(hash)) {
        _setHighlightedHash(hash)
      }
    },
    [hashIsInToC, _setHighlightedHash]
  )

  useEffect(() => {
    firstRender.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (hash !== previousHash && hashIsInToC(hash)) {
      setHighlightedHash(hash)
    }
  }, [hash, hashIsInToC, previousHash, setHighlightedHash])

  useEffect(() => {
    setHeadingElements(
      items
        .map((item) => (!item.id ? null : document.getElementById(item.id)))
        .filter(exists)
    )
  }, [items])

  const scrollListener = useCallback(() => {
    if (ignoreNextScrollEvent.current) {
      ignoreNextScrollEvent.current = false

      return
    }
    const topNavHeight = Number(
      getComputedStyle(document.documentElement)
        ?.getPropertyValue('--top-nav-height')
        ?.replace(/[^0-9]/g, '') || 0
    )

    let scrollToHash = ''

    headingElements.forEach((elt) => {
      const eltTop = elt.getBoundingClientRect()?.top || Infinity

      if (eltTop <= scrollThreshold + topNavHeight) {
        scrollToHash = `#${elt.id}`
      }
    })
    if (highlightedHash !== scrollToHash) {
      setHighlightedHash(scrollToHash)
    }
  }, [headingElements, highlightedHash, setHighlightedHash])

  useEffect(() => {
    window.addEventListener('scroll', scrollListener)

    return () => window.removeEventListener('scroll', scrollListener)
  }, [scrollListener])

  if (items.length <= 0) {
    return null
  }

  return (
    <nav
      aria-labelledby={labelId}
      {...props}
    >
      <Title id={labelId}>On this page</Title>
      <ScrollContainer>
        <List>
          {items.map((item, i) => {
            const href = `#${item.id}`

            const active =
              !firstRender.current &&
              (highlightedHash === href || (!highlightedHash && i === 0))

            return (
              <ListItem key={item.title}>
                <StyledLink
                  href={href}
                  $active={active}
                  onClick={() => {
                    ignoreNextScrollEvent.current = true
                    setHighlightedHash(href)
                  }}
                  scroll={false}
                >
                  {item.title}
                </StyledLink>
              </ListItem>
            )
          })}
        </List>
      </ScrollContainer>
    </nav>
  )
}

export const TableOfContents = styled(TableOfContentsBase)(({ theme: _ }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '100%',
}))

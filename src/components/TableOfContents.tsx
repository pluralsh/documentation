import React, {
  useEffect, useId, useMemo, useRef, useState,
} from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import classNames from 'classnames'

import { exists } from 'utils/typescript'

import { MarkdocHeading } from '../../pages/_app'

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

const LinkA = styled.a(({ theme }) => ({
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
  '&.active': {
    color: theme.colors.text,
    '&::before': {
      zIndex: 1,
      borderLeft: `3px solid ${theme.colors['border-primary']}`,
      transform: 'scaleX(1)',
      transition: 'transform 0.2s ease-out',
    },
  },
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
}))

export const ScrollContainer = styled.div(({ theme: _ }) => ({
  overflowY: 'auto',
  maxHeight: '-webkit-fill-available',
}))

const scrollThreshold = 48

const useForceRender = () => {
  const [toggle, setToggle] = useState(true)

  return () => setToggle(!toggle)
}

function setUrlHash(hash) {
  const url = hash || window.location.pathname + window.location.search

  window.history.pushState({}, '', url)
}

function TableOfContentsBase({ toc = [], ...props }: { toc?: MarkdocHeading[] }) {
  const items = useMemo(() => toc.filter(item => item.id && (item.level === 2 || item.level === 3)),
    [toc])
  const labelId = `nav-label-${useId()}`
  const forceRender = useForceRender()
  const firstRender = useRef(true)
  const ignoreScrollEvent = useRef(false)

  const [headingElements, setHeadingElements] = useState<HTMLElement[]>([])

  useEffect(() => {
    setHeadingElements(items
      .map(item => (!item.id ? null : document.getElementById(item.id)))
      .filter(exists))
  }, [items])

  const router = useRouter()

  const { hash }
    = (typeof window !== 'undefined' && window?.location)
    || new URL(`http://plural.sh${router.asPath}`)

  useEffect(() => {
    const listener = () => {
      if (ignoreScrollEvent.current) {
        ignoreScrollEvent.current = false

        return
      }
      const topNavHeight = Number(getComputedStyle(document.documentElement)
        ?.getPropertyValue('--top-nav-height')
        ?.replace(/[^0-9]/g, '') || 0)

      let scrollToHash

      headingElements.forEach(elt => {
        const eltTop = elt.getBoundingClientRect()?.top || Infinity

        if (eltTop <= scrollThreshold + topNavHeight) {
          scrollToHash = `#${elt.id}`
        }
      })
      if (scrollToHash) {
        if (scrollToHash !== hash) {
          setUrlHash(scrollToHash)
          forceRender()
        }
      }
      else {
        setUrlHash('')
        forceRender()
      }
    }

    window.addEventListener('scroll', listener)
    if (firstRender.current) {
      firstRender.current = false
      listener()
    }

    return () => window.removeEventListener('scroll', listener)
  }, [forceRender, hash, headingElements])

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
            const active = hash === href || (!hash && i === 0)

            return (
              <ListItem key={item.title}>
                <Link
                  href={href}
                  passHref
                >
                  <LinkA
                    className={classNames({ active })}
                    onClick={() => {
                      ignoreScrollEvent.current = true
                    }}
                  >
                    {item.title}
                  </LinkA>
                </Link>
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

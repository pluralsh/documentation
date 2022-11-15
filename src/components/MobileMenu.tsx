import { useState } from 'react'
import styled from 'styled-components'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import NavData from 'NavData'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  DiscordIcon,
} from 'pluralsh-design-system'

import useScrollLock from './hooks/useScrollLock'
import { SocialLink } from './PageHeaderButtons'
import GithubStars from './GithubStars'
import { SideNav, TopHeading } from './SideNav'
import { MainLink } from './PageHeader'

type MobileMenuProps = {
  isOpen: boolean
  className?: string
}

const SocialIcons = styled.div(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing.xlarge,
  gap: theme.spacing.medium,
}))

function PluralMenuContent({
  hide: _,
  ...props
}: {
  hide: boolean
  className?: string
}) {
  return (
    <div {...props}>
      <TopHeading>Plural Menu</TopHeading>
      <MainLink href="https://plural.sh/marketplace">Marketplace</MainLink>
      <MainLink href="https://plural.sh/community">Community</MainLink>
      <MainLink href="https://app.plural.sh/signup">Get started</MainLink>
      <MainLink href="https://app.plural.sh/login">Sign in</MainLink>
      <SocialIcons>
        <SocialLink
          href="https://discord.gg/pluralsh"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
        >
          <DiscordIcon size={16} />
        </SocialLink>
        <GithubStars
          account="pluralsh"
          repo="plural"
        />
      </SocialIcons>
    </div>
  )
}

const PluralMenu = styled(PluralMenuContent)(({ hide, theme }) => ({
  display: hide ? 'none' : 'block',
  paddingLeft: theme.spacing.xlarge,
  paddingRight: theme.spacing.xlarge,
  overflow: 'auto',
  paddingBottom: `calc(${theme.spacing.xlarge}px + var(--menu-extra-bpad))`,

  [TopHeading]: {
    paddingLeft: 0,
  },
  [MainLink]: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing.xsmall,
    paddingBottom: theme.spacing.xsmall,
    marginBottom: theme.spacing.xsmall,
    width: '100%',
  },
}))

const NavButtons = styled.div(({ theme }) => ({
  padding: theme.spacing.medium,
}))

const NavWrap = styled.div(_ => ({
  position: 'relative',
  flexGrow: 1,
}))

const Content = styled.div(({ theme }) => ({
  pointerEvents: 'all',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 'var(--top-nav-height)',
  bottom: 0,
  paddingRight: 0,
  background: theme.colors['fill-one'],
  display: 'flex',
  flexDirection: 'column',
}))

function MobileMenu({ isOpen, className }: MobileMenuProps) {
  const [curMenu, setCurMenu] = useState<'docs' | 'plural'>('docs')
  const [, setScrollLock] = useScrollLock(false)

  useIsomorphicLayoutEffect(() => {
    setScrollLock(isOpen)
  }, [isOpen, setScrollLock])

  return (
    <div className={className}>
      <Content>
        <NavButtons>
          {curMenu === 'docs' ? (
            <Button
              tertiary
              endIcon={<ArrowRightIcon />}
              onClick={() => setCurMenu('plural')}
            >
              Plural menu
            </Button>
          ) : (
            <Button
              tertiary
              startIcon={<ArrowLeftIcon />}
              onClick={() => setCurMenu('docs')}
            >
              Docs menu
            </Button>
          )}
        </NavButtons>
        <NavWrap>
          <SideNav
            hide={curMenu !== 'docs'}
            desktop={false}
            navData={NavData}
          />
          <PluralMenu hide={curMenu !== 'plural'} />
        </NavWrap>
      </Content>
    </div>
  )
}

export default styled(MobileMenu)(({ isOpen, theme }) => ({
  '--menu-extra-bpad': '90px',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100%',
  display: isOpen ? 'block' : 'none',
  zIndex: theme.zIndexes.modal,
  pointerEvents: 'none',
}))

import Link from 'next/link'
import styled, { useTheme } from 'styled-components'

import {
  Button,
  DiscordIcon,
} from 'pluralsh-design-system'

import { mqs, useBreakpoint } from './Breakpoints'
import GithubStars from './GithubStars'
import { HamburgerButton, SearchButton, SocialLink } from './PageHeaderButtons'

const Filler = styled.div(_ => ({
  flexGrow: 1,
}))

function PageHeaderUnstyled({ ...props }) {
  const theme = useTheme()
  const breakpoint = useBreakpoint()

  console.log('breakpoint', breakpoint)

  return (
    <header {...props}>
      <nav className="leftSection">
        <Link
          href="/"
          className="flex"
          passHref
        >
          <a>
            <img
              className="logo"
              alt="Plural docs"
              src="/images/plural-docs-logo.svg"
            />
          </a>
        </Link>
        <PageHeaderLinks />
      </nav>
      <Filler />
      <section className="rightSection">
        <div className="socialIcons">
          <SocialLink
            className="discordIcon"
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
        </div>
        <div className="buttons">
          <Button
            as="a"
            href="https://app.plural.sh/signup"
            primary
            fontFamily={theme.fontFamilies.sans}
          >
            Get started
          </Button>
          <Button
            as="a"
            href="https://app.plural.sh/login"
            secondary
            fontFamily={theme.fontFamilies.sans}
          >
            Sign in
          </Button>
        </div>
        <SearchButton />
        <HamburgerButton onClick={() => {}} />
      </section>
    </header>
  )
}

const PageHeader = styled(PageHeaderUnstyled)(({ theme }) => ({
  top: 0,
  position: 'sticky',
  height: 'var(--top-nav-height)',
  background: theme.colors['fill-zero'],
  width: '100%',
  zIndex: '100',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  paddingLeft: theme.spacing.large,
  paddingRight: theme.spacing.large,
  [mqs.fullHeader]: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  '.socialIcons': {
    display: 'none',
    [mqs.fullHeader]: {
      display: 'flex',
      flexDirection: 'row',
      gap: theme.spacing.medium,
    },
  },
  '.buttons': {
    display: 'none',
    gap: theme.spacing.medium,
    [mqs.fullHeader]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  '.logo': {
    width: 162,
    [mqs.fullHeader]: {
      // width: 216,
    },
  },
  '.rightSection, .leftSection': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.medium,
  },
}))

const MainLink = styled.a(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '&:any-link': {
    color: theme.colors['text-light'],
    textDecoration: 'none',
  },
  '&:hover': {
    textDecoration: 'underline',
    color: theme.colors.text,
  },
  padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
  [mqs.fullHeader]: {
    padding: `${theme.spacing.small}px ${theme.spacing.medium}px`,
  },
}))

const PageHeaderLinks = styled(({ ...props }) => (
  <div {...props}>
    <MainLink href="https://plural.sh/marketplace">Marketplace</MainLink>
    <MainLink href="https://plural.sh/community">Community</MainLink>
  </div>
))(({ theme }) => ({
  display: 'none',
  [mqs.fullHeader]: {
    display: 'flex',
    gap: theme.spacing.xsmall,
  },
}))

export { PageHeader }

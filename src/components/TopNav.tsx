import Link from 'next/link'
import styled, { useTheme } from 'styled-components'
import { DocSearch } from '@docsearch/react'

import {
  Button, DiscordIcon, TwitterIcon,
} from 'pluralsh-design-system'

import { useRouter } from 'next/router'

import GitHubButton from 'react-github-btn'

import { mqs } from './GlobalStyles'

const Filler = styled.div(_ => ({
  flexGrow: 1,
}))

const SocialLink = styled.a(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.borderRadiuses.medium,
  color: theme.colors.text,
  '&:hover': {
    background: theme.colors['fill-zero-hover'],
    cursor: 'pointer',
  },
  '&:focus, &:focus-visible': {
    outline: 'none',
    boxShadow: 'none',
  },
  '&:focus-visible': {
    ...theme.partials.focus.default,
  },
}))

export const TopNav = styled(({ ...props }) => {
  const router = useRouter()
  const theme = useTheme()

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
        <TopNavLinks />
      </nav>
      <Filler />
      <section className="rightSection">
        <DocSearch
          appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ''}
          apiKey={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID_KEY || ''}
          placeholder="Search Plural docs"
          navigator={{
            navigate: ({ itemUrl }) => {
              console.log('search itemUrl', itemUrl)
              router.push(itemUrl)
            },
          }}
          getMissingResultsUrl={({ query }) => `https://github.com/pluralsh/documentation/issues/new?title=${query}`}
        />
        <div className="socialIcons">
          <SocialLink
            href="https://discord.gg/pluralsh"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={0}
          >
            <DiscordIcon size={24} />
          </SocialLink>
          <SocialLink
            href="https://twitter.com/plural_sh"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={0}
          >
            <TwitterIcon size={24} />
          </SocialLink>
        </div>
        <div className="githubButton">
          <GitHubButton
            href="https://github.com/pluralsh/plural"
            data-color-scheme="no-preference: light; light: light; dark: light;"
            data-size="large"
            data-show-count="true"
            aria-label="Star pluralsh/plural on GitHub"
          >
            Star
          </GitHubButton>
        </div>
        <div className="buttons">
          <Button
            as="a"
            href="https://app.plural.sh"
            primary
            fontFamily={theme.fontFamilies.sans}
          >Get started
          </Button>
          <Button
            as="a"
            href="https://app.plural.sh/login"
            secondary
            fontFamily={theme.fontFamilies.sans}
          >Log in
          </Button>
        </div>

      </section>
    </header>
  )
})(({ theme }) => ({
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
  '.socialIcons, .githubButton, .buttons': {
    display: 'none',
    [mqs.fullHeader]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  '.logo': {
    width: '164px',
  },
  '.rightSection, .leftSection': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.medium,
    [mqs.fullHeaderLoose]: {
      gap: theme.spacing.large,
    },
  },
  '.socialIcons': {
    gap: theme.spacing.medium,
  },
  '.buttons': {
    gap: theme.spacing.medium,
  },
  '.githubButton': {
    height: 28,
    overflow: 'hidden',
    span: {
      display: 'block',
      height: 28,
      overflow: 'hidden',
    },
    '.widget': {
      display: 'block !important',
    },
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

const TopNavLinks = styled(({ ...props }) => (
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

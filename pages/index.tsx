import {
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  cloneElement,
} from 'react'

import {
  AppsIcon,
  DiscordIcon,
  GitPull,
  IconFrame,
  MagicWandIcon,
  PadlockLockedIcon,
  SourcererIcon,
  TerminalIcon,
  ToolsIcon,
} from '@pluralsh/design-system'
import Link, { type LinkProps } from 'next/link'

import styled, { useTheme } from 'styled-components'

import { mqs } from '@src/components/Breakpoints'

const Hero = styled.div(({ theme }) => ({
  background: 'url(/images/landing/hero-bg-sm.png)',
  backgroundSize: '100% 100%',
  borderRadius: theme.borderRadiuses.large,
  border: theme.borders['fill-one'],
  div: {},
  h1: {
    margin: 0,
    ...theme.partials.marketingText.title2,
  },
  '.contentWrap': {
    width: '100%',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  '.content': {
    padding: `${theme.spacing.xlarge}px ${theme.spacing.large}px `,
    gap: theme.spacing.xsmall,
    p: {
      ...theme.partials.marketingText.body1,
      color: theme.colors['text-light'],
      margin: 0,
    },
  },

  '.bgImgLg': { display: 'none' },

  [mqs.md]: {
    display: 'flex',
    '& > *': { flexShrink: 0 },
    h1: {
      ...theme.partials.marketingText.hero2,
    },
    '.content': {
      maxWidth: '48.2%',
      textWrap: 'balance',
    },
    background: 'none',
    '.bgImgLg': {
      display: 'block',
      width: '100%',
      transform: 'translateX(-100%)',
      zIndex: 0,
    },
  },
}))

function HomeCardUnstyled({
  heading,
  children,
  icon,
  ...props
}: PropsWithChildren<LinkProps & { icon: ReactElement; heading: ReactNode }>) {
  const theme = useTheme()
  const colorIcon = cloneElement(icon, { color: theme.colors['icon-info'] })

  return (
    <Link {...props}>
      <IconFrame
        type="floating"
        size="xlarge"
        icon={colorIcon}
      />
      <div className="content">
        <h3 className="heading">{heading}</h3>
        <p>{children}</p>
      </div>
    </Link>
  )
}

const HomeCard = styled(HomeCardUnstyled)(({ theme }) => ({
  display: 'flex',
  columnGap: theme.spacing.large,
  padding: theme.spacing.large,
  alignItems: 'center',
  backgroundColor: theme.colors['fill-two'],
  borderRadius: theme.borderRadiuses.large,
  '.heading': {
    margin: 0,
    ...theme.partials.marketingText.body2Bold,
    color: theme.colors.text,
  },
  p: {
    margin: 0,
    ...theme.partials.marketingText.componentText,
    textWrap: 'pretty',
    color: theme.colors['text-light'],
  },
}))

const HomeCardGrid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
  gap: theme.spacing.large,
  marginTop: theme.spacing.large,
}))

const H2 = styled.h2(({ theme }) => ({
  margin: 0,
  ...theme.partials.marketingText.title1,
}))

const Body2 = styled.p(({ theme }) => ({
  ...theme.partials.marketingText.body2,
  margin: 0,
}))

const Sections = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xlarge,
}))

const Section = styled.section((_) => ({
  height: 'auto',
}))

const SectionHeading = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xsmall,
  marginBottom: theme.spacing.large,
}))

export default function Index() {
  return (
    <Sections>
      <Hero>
        <div className="contentWrap">
          <div className="content">
            <h1>Documentation</h1>
            <p>
              Get started, master your operations, and troubleshoot your
              problems.
            </p>
          </div>
        </div>
        <img
          className="bgImgLg"
          aria-hidden="true"
          src="/images/landing/hero-bg-lg.png"
        />
      </Hero>
      <Section>
        <SectionHeading>
          <H2>Explore topics</H2>
          <Body2>Find what’s most relevant to you</Body2>
        </SectionHeading>
        <HomeCardGrid>
          <HomeCard
            heading="Quickstart"
            icon={<MagicWandIcon />}
            href="/getting-started/quickstart "
          >
            A guide to getting up and running.
          </HomeCard>
          <HomeCard
            heading="Security"
            icon={<PadlockLockedIcon />}
            href="/getting-started/quickstart "
          >
            What does Plural have access to?
          </HomeCard>
          <HomeCard
            heading="Cloud Shell"
            icon={<TerminalIcon />}
            href="/getting-started/cloud-shell-quickstart"
          >
            Setting up your first cluster in browser.
          </HomeCard>
          <HomeCard
            heading="Application catalog"
            icon={<AppsIcon />}
            href="xxx"
          >
            Applications you can install with Plural.
          </HomeCard>
          <HomeCard
            heading="Troubleshooting"
            icon={<ToolsIcon />}
            href="sss"
          >
            Common issues or errors.
          </HomeCard>
          <HomeCard
            heading="GitOps"
            icon={<GitPull />}
            href="xxx"
          >
            Share and manage your Git repositories.
          </HomeCard>
        </HomeCardGrid>
      </Section>
      <Section>
        <SectionHeading>
          <H2>Join the community</H2>
          <Body2>
            Join the group of Plural users and contributors that are helping
            shape the future of DevOps.
          </Body2>
        </SectionHeading>
        <HomeCardGrid>
          <HomeCard
            heading="Discord"
            icon={<DiscordIcon />}
            href="https://discord.gg/pluralsh"
          >
            Join the discussion and get help.
          </HomeCard>
          <HomeCard
            heading="Become an open-sourcerer"
            icon={<SourcererIcon />}
            href="https://github.com/pluralsh/plural"
          >
            Start your contribution journey.
          </HomeCard>
        </HomeCardGrid>
      </Section>
    </Sections>
  )
}

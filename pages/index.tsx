import {
  type ComponentProps,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  cloneElement,
} from 'react'

import {
  AppsIcon,
  DiscordIcon,
  GitPullIcon,
  IconFrame,
  MagicWandIcon,
  PadlockLockedIcon,
  SourcererHatIcon,
  TerminalIcon,
  ToolsIcon,
} from '@pluralsh/design-system'
import Link, { type LinkProps } from 'next/link'

import { Heading as MarkdocHeading } from '@pluralsh/design-system/dist/markdoc/components'
import styled, { useTheme } from 'styled-components'

import { mqs } from '@src/components/Breakpoints'

const Hero = styled.div(({ theme }) => ({
  background: 'url(/images/landing/hero-bg-sm.png)',
  backgroundSize: '100% 100%',
  borderRadius: theme.borderRadiuses.large,
  border: theme.borders['fill-one'],
  overflow: 'hidden',
  h1: {
    margin: 0,
    marginBottom: theme.spacing.xsmall,
  },
  '.contentWrap': {
    width: '100%',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  '.content': {
    padding: `${theme.spacing.xlarge}px ${theme.spacing.large}px `,
    p: {
      ...theme.partials.marketingText.body1,
      color: theme.colors['text-light'],
      margin: 0,
    },
  },
  picture: {
    display: 'contents',
  },
  '.bgImgLg': {
    display: 'none',
  },
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

function CardLinkUnstyled({
  heading,
  children,
  icon,
  ...props
}: PropsWithChildren<
  LinkProps &
    Omit<ComponentProps<'a'>, 'ref'> & {
      icon: ReactElement
      heading: ReactNode
    }
>) {
  const theme = useTheme()
  const colorIcon = cloneElement(icon, { color: theme.colors['icon-info'] })

  return (
    <Link {...props}>
      <IconFrame
        type="floating"
        size="xlarge"
        icon={colorIcon}
        className="icon"
      />
      <div className="content">
        <h3 className="heading">{heading}</h3>
        <p>{children}</p>
      </div>
    </Link>
  )
}

const CardLink = styled(CardLinkUnstyled)(({ theme }) => ({
  display: 'flex',
  columnGap: theme.spacing.large,
  padding: theme.spacing.large,
  alignItems: 'flex-start',
  backgroundColor: theme.colors['fill-one'],
  borderRadius: theme.borderRadiuses.large,
  '&:hover': {
    backgroundColor: theme.colors['fill-one-hover'],
  },
  '.icon': {
    flexShrink: 0,
  },
  '.content': {
    alignSelf: 'center',
  },
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

const CardLinkGrid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
  gap: theme.spacing.large,
  marginTop: theme.spacing.large,
}))

const Heading = styled(MarkdocHeading).attrs(() => ({
  level: 2,
}))((_) => ({
  marginBottom: 0,
}))

const Body2 = styled.p(({ theme }) => ({
  ...theme.partials.marketingText.body2,
  margin: 0,
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

function Index() {
  return (
    <>
      <Hero id={tableOfContents[0].id}>
        <div className="contentWrap">
          <div className="content">
            <MarkdocHeading level={1}>
              {tableOfContents[0].title}
            </MarkdocHeading>
            <p>
              Get started, master your operations, and troubleshoot your
              problems.
            </p>
          </div>
        </div>
        <picture>
          <source
            type="image/avif"
            srcSet="/images/landing/hero-bg-lg.avif"
          />
          <img
            className="bgImgLg"
            aria-hidden="true"
            src="/images/landing/hero-bg-lg.png"
          />
        </picture>
      </Hero>
      <Section>
        <SectionHeading>
          <Heading id={tableOfContents[1].id}>
            {tableOfContents[1].title}
          </Heading>
          <Body2>Find what’s most relevant to you</Body2>
        </SectionHeading>
        <CardLinkGrid>
          <CardLink
            heading="Quickstart"
            icon={<MagicWandIcon />}
            href="/getting-started/quickstart"
          >
            A guide to getting up and running.
          </CardLink>
          <CardLink
            heading="Security"
            icon={<PadlockLockedIcon />}
            href="/operations/security"
          >
            What does Plural have access to?
          </CardLink>
          <CardLink
            heading="Cloud Shell"
            icon={<TerminalIcon />}
            href="/getting-started/cloud-shell-quickstart"
          >
            Setting up your first cluster in browser.
          </CardLink>
          <CardLink
            heading="Application catalog"
            icon={<AppsIcon />}
            href="/applications"
          >
            Applications you can install with Plural.
          </CardLink>
          <CardLink
            heading="Troubleshooting"
            icon={<ToolsIcon />}
            href="/reference/troubleshooting"
          >
            Common issues or errors.
          </CardLink>
          <CardLink
            heading="GitOps"
            icon={<GitPullIcon />}
            href="/getting-started/manage-git-repositories/setting-up-gitops"
          >
            Share and manage your Git repositories.
          </CardLink>
        </CardLinkGrid>
      </Section>
      <Section>
        <SectionHeading>
          <Heading id={tableOfContents[2].id}>
            {tableOfContents[2].title}
          </Heading>
          <Body2>
            Join the group of Plural users and contributors that are helping
            shape the future of DevOps.
          </Body2>
        </SectionHeading>
        <CardLinkGrid>
          <CardLink
            heading="Discord"
            icon={<DiscordIcon />}
            href="https://discord.gg/pluralsh"
            target="_blank"
            rel="nofollow noreferrer"
          >
            Join the discussion and get help.
          </CardLink>
          <CardLink
            heading="Become an open-sourcerer"
            icon={<SourcererHatIcon />}
            href="https://github.com/pluralsh/plural"
            target="_blank"
            rel="nofollow noreferrer"
          >
            Start your contribution journey.
          </CardLink>
        </CardLinkGrid>
      </Section>
    </>
  )
}

const tableOfContents = [
  {
    level: 2,
    id: 'documentation',
    title: 'Documentation',
  },
  {
    level: 2,
    id: 'explore-topics',
    title: 'Explore Topics',
  },
  {
    level: 2,
    id: 'join-the-community',
    title: 'Join the community',
  },
]

export async function getStaticProps() {
  return {
    props: { tableOfContents },
  }
}

export default Index

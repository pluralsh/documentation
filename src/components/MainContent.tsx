import { GitHubLogoIcon } from '@pluralsh/design-system'
import { useContext } from 'react'
import styled from 'styled-components'

import ArticlesInSection from './ArticlesInSection'

import Breadcrumbs from './Breadcrumbs'
import { FooterLink } from './PageFooter'

import { PagePropsContext } from './PagePropsContext'

const ContentWrapper = styled.div(({ theme }) => ({
  marginTop: theme.spacing.xlarge,
}))

const BreadcrumbsWrapper = styled.div(({ theme }) => ({
  marginTop: theme.spacing.xlarge,
}))

const PageHeader = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.xxlarge,
}))

const Title = styled.h1(({ theme }) => ({
  ...theme.partials.marketingText.hero2,
  margin: 0,
  marginBottom: theme.spacing.small,
}))

const Description = styled.p(({ theme }) => ({
  ...theme.partials.marketingText.body1,
  color: theme.colors['text-light'],
  marginTop: 0,
  marginBottom: theme.spacing.small,
}))

const EditOnGithub = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.xxxlarge,
}))

const EditOnGithubLink = styled(FooterLink)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing.small,
}))

const PageDivider = styled.div(({ theme }) => ({
  marginTop: theme.spacing.xxxlarge,
  marginBottom: theme.spacing.xxxlarge,
  borderTop: theme.borders.default,
}))

export default function MainContent({ Component }) {
  const pageProps = useContext(PagePropsContext)
  const { markdoc } = pageProps

  const title = markdoc?.frontmatter?.title
  const description = markdoc?.frontmatter?.description

  return (
    <>
      <BreadcrumbsWrapper>
        <Breadcrumbs />
      </BreadcrumbsWrapper>
      <ContentWrapper>
        {(markdoc?.frontmatter?.title || markdoc?.frontmatter?.description) && (
          <PageHeader>
            {title && <Title>{title}</Title>}
            {description && <Description>{description}</Description>}
            <ArticlesInSection
              hasContent={(markdoc?.content as any)?.children?.length > 0}
            />
          </PageHeader>
        )}
        <Component {...pageProps} />
        <PageDivider />
        {markdoc?.file?.path && (
          <EditOnGithub>
            <EditOnGithubLink
              target="_blank"
              rel="noopener noreferrer"
              href={`https://github.com/pluralsh/documentation/blob/${process.env.NEXT_PUBLIC_GITHUB_BRANCH_NAME}/pages${markdoc.file.path}`}
            >
              <GitHubLogoIcon
                size={20}
                display="block"
              />
              <div>Edit on Github</div>
            </EditOnGithubLink>
          </EditOnGithub>
        )}
      </ContentWrapper>
    </>
  )
}

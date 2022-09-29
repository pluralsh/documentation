import { useContext } from 'react'
import styled from 'styled-components'

import Breadcrumbs from './Breadcrumbs'

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
  marginTop: 0,
  marginBottom: theme.spacing.small,
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
          </PageHeader>
        )}
        <Component {...pageProps} />
      </ContentWrapper>
    </>
  )
}
import type { ReactNode } from 'react'
import { useContext } from 'react'

import { GitHubLogoIcon } from '@pluralsh/design-system'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { APP_CATALOG_BASE_URL } from '../consts/routes'
import { getBarePathFromPath, isAppCatalogRoute } from '../utils/text'

import AppsList from './AppsList'
import ArticlesInSection from './ArticlesInSection'
import Breadcrumbs from './Breadcrumbs'
import { Heading } from './md/Heading'
import { FooterLink } from './PageFooter'
import { PagePropsContext } from './PagePropsContext'

const ContentWrapper = styled.div(({ theme }) => ({
  marginTop: theme.spacing.xlarge,
}))

const BreadcrumbsWrapper = styled.div(({ theme }) => ({
  marginTop: theme.spacing.xlarge,
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

function ContentHeaderUnstyled({
  title,
  description,
  className,
  pageHasContent = true,
}: {
  title?: ReactNode
  description?: ReactNode
  className?: string
  pageHasContent?: boolean
}) {
  const router = useRouter()

  const isAppCatalog = isAppCatalogRoute(router.asPath)

  return (
    <div className={className}>
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}
      {!isAppCatalog && (
        <ArticlesInSection
          title="Articles in this section"
          hasContent={pageHasContent}
        />
      )}
    </div>
  )
}

export const ContentHeader = styled(ContentHeaderUnstyled)(({ theme }) => ({
  marginBottom: theme.spacing.xxlarge,
}))

export default function MainContent({ Component, title, description }) {
  const pageProps = useContext(PagePropsContext)
  const { markdoc } = pageProps || {}
  const router = useRouter()

  const isAppCatalogIndex =
    isAppCatalogRoute(router.asPath) &&
    getBarePathFromPath(router.asPath).endsWith(APP_CATALOG_BASE_URL)

  return (
    <>
      <BreadcrumbsWrapper>
        <Breadcrumbs />
      </BreadcrumbsWrapper>
      <ContentWrapper>
        {(title || description) && (
          <ContentHeader
            title={title}
            description={description}
            pageHasContent={(markdoc?.content as any)?.children?.length > 0}
          />
        )}
        <Component {...pageProps} />
        {isAppCatalogIndex && (
          <>
            <Heading level={2}>Our Catalog</Heading>
            <AppsList />
          </>
        )}
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

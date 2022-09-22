import { useContext } from 'react'
import styled from 'styled-components'

import { DESCRIPTION, TITLE } from '../consts'
import { PagePropsContext } from '../pages/PagePropsContext'

const PageHeader = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.xlarge,
  borderBottom: theme.borders.default,
}))

const Title = styled.h1(({ theme }) => ({
  ...theme.partials.marketingText.hero2,
  marginBottom: theme.spacing.xlarge,
  borderBottom: theme.borders.default,
}))

export default function MainContent({ Component }) {
  const pageProps = useContext(PagePropsContext)
  const { markdoc } = pageProps
  //   const router = useRouter()

  const title = markdoc?.frontmatter?.title || TITLE
  const description = markdoc?.frontmatter?.description || DESCRIPTION

  return (
    <div>
      {(markdoc?.frontmatter?.title || markdoc?.frontmatter?.description) && (
        <PageHeader>
          {title && <Title>{title}</Title>}
          {description && <p>{description}</p>}
        </PageHeader>
      )}
      <Component {...pageProps} />
    </div>
  )
}

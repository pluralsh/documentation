import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ComponentProps } from 'react'
import styled from 'styled-components'
import { isRelativeUrl, removeTrailingSlashes } from 'utils/text'

const isExternalUrl = (url: string) => url.substr(0, 4) === 'http' || url.substr(0, 2) === '//'

const stripMdExtension = url => {
  if (!isExternalUrl(url)) {
    return url.replace(/.md$/, '')
  }

  return url
}

function Link({ href, children, ...props }: ComponentProps<typeof NextLink>) {
  const router = useRouter()

  href = stripMdExtension(href)
  if (isRelativeUrl(href)) {
    href = `${removeTrailingSlashes(router.pathname)}/${href}`
  }

  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}

export default styled(Link)(({ theme }) => ({
  ...theme.partials.marketingText.inlineLink,
}))

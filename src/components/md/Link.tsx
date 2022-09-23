import NextLink from 'next/link'
import { ComponentProps } from 'react'
import styled from 'styled-components'

const isExternalUrl = (url: string) => url.substr(0, 4) === 'http' || url.substr(0, 2) === '//'

const stripMdExtension = url => {
  if (!isExternalUrl(url)) {
    return url.replace(/.md$/, '')
  }

  return url
}

function Link({ href, children, ...props }: ComponentProps<typeof NextLink>) {
  return (
    <NextLink href={stripMdExtension(href)}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}

export default styled(Link)(({ theme }) => ({
  ...theme.partials.marketingText.inlineLink,
}))

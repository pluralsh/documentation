import type { ReactNode } from 'react'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import {
  isExternalUrl,
  isRelativeUrl,
  removeTrailingSlashes,
  stripMdExtension,
} from '../../utils/text'

function Link({
  href,
  children,
  ...props
}: {
  href: string
  children?: ReactNode
}) {
  const router = useRouter()

  href = stripMdExtension(href)
  if (isRelativeUrl(href)) {
    href = `${removeTrailingSlashes(router.pathname)}/${href}`
  }

  return (
    <NextLink
      href={href}
      {...props}
      {...(isExternalUrl(href)
        ? { target: '_blank', rel: 'nofollow noopener' }
        : {})}
    >
      {children}
    </NextLink>
  )
}

export default styled(Link)(({ theme }) => ({
  '&, a:any-link&': {
    ...theme.partials.marketingText.inlineLink,
  },
}))

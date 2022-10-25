import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import styled from 'styled-components'
import {
  isRelativeUrl,
  removeTrailingSlashes,
  stripMdExtension,
} from 'utils/text'
import { Button as PluralButton } from 'pluralsh-design-system'

import { ButtonProps } from 'pluralsh-design-system/dist/components/Button'

import { isExternalUrl } from '../../utils/text'

function Button({
  href,
  children,
  type = 'floating',
  className,
  ...props
}: {
  href: string
  children?: ReactNode
  className?: string
  type?: 'floating'
}) {
  const router = useRouter()

  href = stripMdExtension(href)
  if (isRelativeUrl(href)) {
    href = `${removeTrailingSlashes(router.pathname)}/${href}`
  }
  const buttonProps: ButtonProps = props

  if (type === 'floating') {
    buttonProps.floating = true
  }

  return (
    <NextLink href={href}>
      <a
        className={className}
        {...(isExternalUrl(href)
          ? { target: '_blank', rel: 'nofollow noopener' }
          : {})}
      >
        <PluralButton {...buttonProps}>{children}</PluralButton>
      </a>
    </NextLink>
  )
}

export default styled(Button)(({ theme }) => ({
  '&, a:any-link&': {
    display: 'block',
    textDecoration: 'none',
    margin: `${theme.spacing.large}px 0`,
  },
  [`${ButtonGroup} &`]: {
    margin: 0,
  },
}))

export const ButtonGroup = styled.div(({ theme }) => ({
  margin: `${theme.spacing.large}px 0`,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing.small,
}))

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
import * as icons from 'pluralsh-design-system/dist/icons'

import { isExternalUrl } from '../../utils/text'

function Button({
  href,
  children,
  type = 'floating',
  className,
  icon,
  ...props
}: {
  href: string
  children?: ReactNode
  className?: string
  type?: 'floating'
  icon?: 'string'
}) {
  const router = useRouter()

  href = stripMdExtension(href)
  if (isRelativeUrl(href)) {
    href = `${removeTrailingSlashes(router.pathname)}/${href}`
  }
  const buttonProps:any = props

  if (type === 'floating') {
    buttonProps.floating = true
  }

  let iconName = icon || ''

  if (iconName && !iconName?.match(/Icon$/gi)) {
    iconName = `${iconName}Icon`
  }
  const Icon = icons[iconName]

  return (
    <NextLink
      href={href}
      className={className}
      {...(isExternalUrl(href)
        ? { target: '_blank', rel: 'nofollow noopener' }
        : {})}
    >
      <PluralButton
        {...buttonProps}
        {...(Icon ? { startIcon: <Icon size={16} /> } : {})}
      >
        {children}
      </PluralButton>
    </NextLink>
  )
}

export const ButtonGroup = styled.div(({ theme }) => ({
  margin: `${theme.spacing.large}px 0`,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing.small,
}))

export default styled(Button)(({ theme }) => ({
  '&, a:any-link&': {
    display: 'block',
    textDecoration: 'none',
    margin: `${theme.spacing.large}px 0`,
    [`${ButtonGroup} &`]: {
      margin: 0,
    },
  },
}))

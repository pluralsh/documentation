import type { ReactNode } from 'react'

import { Button as PluralButton } from '@pluralsh/design-system'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import * as icons from '@pluralsh/design-system/dist/icons'
import styled from 'styled-components'

import {
  isExternalUrl,
  isRelativeUrl,
  removeTrailingSlashes,
  stripMdExtension,
} from '../../utils/text'

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
  const buttonProps: any = props

  if (type === 'floating') {
    buttonProps.floating = true
  }

  let iconName = icon || ''

  if (iconName && !iconName?.match(/Icon$/gi)) {
    iconName = `${iconName}Icon`
  }
  const Icon = icons[iconName]

  return (
    /* Needs to be <span> to prevent "<div> cannot appear as a descendant of <p>."
       hydration error */
    <span className={className}>
      <NextLink
        legacyBehavior
        passHref
        href={href}
        // className={className}
        {...(isExternalUrl(href)
          ? { target: '_blank', rel: 'nofollow noopener' }
          : {})}
      >
        <PluralButton
          {...buttonProps}
          {...(Icon ? { startIcon: <Icon size={16} /> } : {})}
          as="a"
        >
          {children}
        </PluralButton>
      </NextLink>
    </span>
  )
}

export const ButtonGroup = styled.div(({ theme }) => ({
  margin: `${theme.spacing.large}px 0`,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing.small,
}))

export default styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  margin: `${theme.spacing.large}px 0`,
  [`${ButtonGroup} &`]: {
    margin: 0,
  },
}))

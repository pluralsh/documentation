import { Callout } from '@pluralsh/design-system'
import type { CalloutProps } from '@pluralsh/design-system'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { isExternalUrl } from '../../utils/text'

import { ListItem } from './List'
import Paragraph from './Paragraph'

function MarkdocCallout({
  ctas,
  ...props
}: Omit<CalloutProps, 'buttonProps'> & { ctas: any[] }) {
  let buttonProps
  const router = useRouter()

  if (ctas[0]) {
    const { href, title, newTab = true } = ctas[0]

    buttonProps = {
      onClick: (e) => {
        e.preventDefault()
        if (href) {
          if (isExternalUrl(href)) {
            window?.open(href, newTab ? '_blank' : undefined)
          } else {
            router.push(href)
          }
        }
      },
      children: title,
    }
  }

  return (
    <Callout
      {...props}
      buttonProps={buttonProps}
    />
  )
}

const StyledCallout = styled(MarkdocCallout)`
  ${({ theme }) => ({
    marginTop: theme.spacing.xlarge,
    marginBottom: theme.spacing.xlarge,
    color: theme.colors['text-light'],
  })}

  ${Paragraph}, ${ListItem} {
    ${({ theme }) => ({
      ...theme.partials.text.body2,
      color: theme.colors['text-light'],
    })}
  }
`

export default StyledCallout

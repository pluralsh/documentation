import styled from 'styled-components'
import { Callout } from 'pluralsh-design-system'

import Paragraph from './Paragraph'
import { ListItem } from './List'

const StyledCallout = styled(Callout)`
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

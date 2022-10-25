import { useFillLevel } from 'pluralsh-design-system'
import styled from 'styled-components'

const Paragraph = styled.p(({ theme }) => {
  const fillLevel = useFillLevel()

  return {
    ...theme.partials.marketingText.body2,
    color:
      fillLevel > 0
        ? theme.colors['text-light']
        : theme.colors['text-long-form'],
    marginBottom: theme.spacing.small,
    'b, strong': {
      ...theme.partials.marketingText.bodyBold,
    },
    'i, em': {
      fontStyle: 'italic',
    },
  }
})

export default Paragraph

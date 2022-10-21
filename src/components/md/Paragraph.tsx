import { useFillLevel } from 'components/contexts'
import styled from 'styled-components'

export const commonCfg = { shouldForwardProp: () => true }

const Paragraph = styled.p.withConfig(commonCfg)(({ theme }) => {
  const fillLevel = useFillLevel()

  return ({
    ...theme.partials.marketingText.body2,
    ...(fillLevel > 0 ? { color: theme.colors['text-light'] } : {}),
    marginBottom: theme.spacing.small,
    'b, strong': {
      ...theme.partials.marketingText.bodyBold,
    },
    'i, em': {
      fontStyle: 'italic',
    },
  })
})

export default Paragraph

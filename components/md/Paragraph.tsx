import styled from 'styled-components'

export const commonCfg = { shouldForwardProp: () => true }

const Paragraph = styled.p.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.marketingText.body2,
  listStyle: 'none',
  marginBottom: theme.spacing.small,
  'b, strong': {
    ...theme.partials.marketingText.bodyBold,
  },
  'i, em': {
    fontStyle: 'italic',
  },
}))

export default Paragraph

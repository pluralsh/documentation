import styled from 'styled-components'

export const commonCfg = { shouldForwardProp: () => true }

export const Paragraph = styled.p.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body2,
  marginTop: theme.spacing.xxsmall,
  listStyle: 'none',
  marginBottom: theme.spacing.small,
  'b, strong': {
    ...theme.partials.marketingText.bodyBold,
  },
  'i, em': {
    fontStyle: 'italic',
  },

}))

export function List({ ordered, ...props }) {
  return (
    <StyledList
      as={ordered ? 'ol' : 'ul'}
      {...props}
    />
  )
}

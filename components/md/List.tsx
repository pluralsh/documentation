import styled from 'styled-components'

export const commonCfg = { shouldForwardProp: () => true }

const StyledList = styled.div.withConfig(commonCfg)(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginBottom: theme.spacing.medium,
}))

export const ListItem = styled.li.withConfig(commonCfg)(({ theme }) => {
  const offset = theme.spacing.large

  return {
    position: 'relative',
    ...theme.partials.marketingText.body2,
    marginTop: theme.spacing.xxsmall,
    marginLeft: offset,
    listStyle: 'none',
    '&:not(:last-of-type)': {
      marginBottom: theme.spacing.small,
    },
    '&::before': {
      content: "'•'",
      display: 'block',
      position: 'absolute',
      textAlign: 'center',
      left: -offset,
      width: offset,
    },
  }
})

export function List({ ordered, ...props }) {
  return (
    <StyledList
      as={ordered ? 'ol' : 'ul'}
      {...props}
    />
  )
}

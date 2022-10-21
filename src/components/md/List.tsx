import { useFillLevel } from 'components/contexts'
import styled from 'styled-components'

export const commonCfg = { shouldForwardProp: () => true }

const COUNTER_ID = 'list-item'

const StyledList = styled.div.withConfig(commonCfg)(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginBottom: theme.spacing.medium,
  counterReset: `${COUNTER_ID} 0`,
}))

export const ListItem = styled.li.withConfig(commonCfg)(({ theme, ...props }) => {
  const offset = theme.spacing.large
  const fillLevel = useFillLevel()

  return {
    position: 'relative',
    ...theme.partials.marketingText.body2,
    ...(fillLevel > 0 ? { color: theme.colors['text-light'] } : {}),
    margin: 0,
    marginLeft: offset,
    listStyle: 'none',
    counterIncrement: COUNTER_ID,
    '&:not(:last-of-type)': {
      marginBottom: theme.spacing.xxsmall,
    },
    '&::before': {
      display: 'block',
      position: 'absolute',
      textAlign: 'center',
      left: -offset,
      width: offset,
    },
    'ol > &::before': {
      content: `counter(${COUNTER_ID}) "."`,
    },
    'ul > &::before': {
      content: "'•'",
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

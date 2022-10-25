import { useFillLevel } from 'pluralsh-design-system'
import styled from 'styled-components'

export const commonCfg = { shouldForwardProp: () => true }

const COUNTER_ID = 'list-item'

const StyledList = styled.div.withConfig(commonCfg)(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginBottom: theme.spacing.medium,
  counterReset: `${COUNTER_ID} 0`,
}))

export const ListItem = styled.li.withConfig(commonCfg)(({ theme }) => {
  const offset = theme.spacing.large
  const fillLevel = useFillLevel()

  return {
    position: 'relative',
    ...theme.partials.marketingText.body2,
    color:
      fillLevel > 0
        ? theme.colors['text-light']
        : theme.colors['text-long-form'],
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

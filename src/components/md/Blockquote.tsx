import styled from 'styled-components'

const Blockquote = styled.blockquote(({ theme }) => ({
  position: 'relative',
  ...theme.partials.marketingText.body1,
  padding: `${theme.spacing.medium}px ${theme.spacing.xlarge}px`,
  background: theme.colors['fill-one'],
  margin: 0,
  marginTop: theme.spacing.xlarge,
  marginBottom: theme.spacing.xlarge,
  '&::before': {
    pointerEvents: 'none',
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderLeft: `2px solid ${theme.colors['text-light']}`,
  },
}))

export default Blockquote

import styled from 'styled-components'

function Code({ ...props }) {
  return <code {...props} />
}

export default styled(Code)(({ theme }) => ({
  fontFamily: theme.fontFamilies.mono,
  fontSize: 14,
  border: theme.borders.default,
  borderRadius: theme.borderRadiuses.large,
  paddingRight: theme.spacing.xxsmall,
  paddingLeft: theme.spacing.xxsmall,
  paddingTop: '1px',
  paddingBottom: '2px',
  backgroundColor: theme.colors['fill-one'],
  '* ~ &': {
    marginLeft: theme.spacing.xxsmall,
  },
}))

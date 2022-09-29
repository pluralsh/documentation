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
  color: theme.colors['text-light'],
  backgroundColor: theme.colors['fill-one'],
  '* ~ &': {
    marginLeft: theme.spacing.xxsmall,
  },
  'a:any-link &': {
    color: theme.colors['action-link-inline'],
  },
  'a:hover &': {
    color: theme.colors['action-link-inline-hover'],
  },
  'a:visited &, a:active &': {
    color: theme.colors['action-link-inline-visited'],
  },
}))

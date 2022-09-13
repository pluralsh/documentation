import * as React from 'react'
import styled from 'styled-components'

export const commonCfg = { shouldForwardProp: () => true }

const MdH1 = styled.h1.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.title2,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  ':first-of-type': { marginTop: 0 },
}))
const MdH2 = styled.h2.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.subtitle1,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  ':first-of-type': { marginTop: 0 },
}))
const MdH3 = styled.h3.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.subtitle2,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  ':first-of-type': { marginTop: 0 },
}))
const MdH4 = styled.h4.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body1Bold,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  ':first-of-type': { marginTop: 0 },
}))
const MdH5 = styled.h5.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body1Bold,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  ':first-of-type': { marginTop: 0 },
}))
const MdH6 = styled.h6.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body1Bold,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  ':first-of-type': { marginTop: 0 },
}))

export function Heading({
  id = '', level = 1, children, className,
}) {
  let component

  switch (level) {
  case 1:
    component = MdH1
    break
  case 2:
    component = MdH2
    break
  case 3:
    component = MdH3
    break
  case 4:
    component = MdH4
    break
  case 5:
    component = MdH5
    break
  case 6:
    component = MdH6
    break
  }

  return React.createElement(component,
    {
      id,
      className: ['heading', className].filter(Boolean).join(' '),
    },
    children)
}

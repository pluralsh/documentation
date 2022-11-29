import * as React from 'react'

import styled from 'styled-components'

type HTag = 'h1' | 'h2' | 'h3' | 'h5' | 'h6'

const StyledH = styled.h1.withConfig({ shouldForwardProp: () => true })<{
  $level: number
}>(({ theme, $level }) => {
  let style

  switch ($level) {
  case 1:
  case 2:
    style = {
      ...theme.partials.marketingText.title1,
    }
    break
  case 3:
    style = {
      ...theme.partials.marketingText.title2,
    }
    break
  case 4:
    style = {
      ...theme.partials.marketingText.subtitle1,
    }
    break
  case 5:
    style = {
      ...theme.partials.marketingText.subtitle2,
    }
    break
  case 6:
    style = {
      ...theme.partials.marketingText.body1Bold,
    }
    break
  }

  return {
    marginTop: theme.spacing.xxlarge,
    marginBottom: theme.spacing.small,
    ...style,
  }
})

export function Heading({ level = 1, ...props }) {
  return (
    <StyledH
      as={`h${level}` as HTag}
      $level={level}
      {...props}
    />
  )
}

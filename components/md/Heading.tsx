import * as React from 'react'
import styled from 'styled-components'

const StyledH = styled.h1.withConfig({ shouldForwardProp: () => true })<{
  $level: number
}>(({ theme, $level }) => {
  let style

  switch ($level) {
  case 1:
    style = {
      ...theme.partials.marketingText.hero2,
      marginTop: theme.spacing.xxlarge,
    }
    break
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
    marginTop: theme.spacing.xlarge,
    marginBottom: theme.spacing.small,
    ...style,
  }
})

export function Heading({ level = 1, ...props }) {
  return (
    <StyledH
      as={`h${level}` as 'h1' | 'h2' | 'h3' | 'h5' | 'h6'}
      $level={level}
      {...props}
    />
  )
}

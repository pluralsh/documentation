import styled from 'styled-components'

export const commonCfg = { shouldForwardProp: () => true }

const StyledWrap = styled.span.withConfig(commonCfg)(({ theme }) => ({
  display: 'block',
  width: '100%',
  paddingLeft: theme.spacing.large,
  paddingRight: theme.spacing.large,
  marginTop: theme.spacing.medium,
  marginBottom: theme.spacing.medium,
}))

const StyledImg = styled.img.withConfig(commonCfg)(({ theme }) => ({
  display: 'block',
  maxWidth: '100%',
  border: theme.borders.default,
  borderRadius: theme.borderRadiuses.large,
  overflow: 'hidden',
}))

function Image({ ...props }) {
  return (
    <StyledWrap>
      <StyledImg {...props} />
    </StyledWrap>
  )
}

export default Image

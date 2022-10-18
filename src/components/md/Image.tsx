import styled from 'styled-components'

export const commonCfg = { shouldForwardProp: () => true }

export const MediaWrap = styled.span.withConfig(commonCfg)(({ theme }) => ({
  display: 'block',
  width: '100%',
  padding: theme.spacing.large,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.large,
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
    <MediaWrap>
      <StyledImg {...props} />
    </MediaWrap>
  )
}

export default Image

import styled from 'styled-components'

export const commonCfg = { shouldForwardProp: () => true }

const ImageWrap = styled(({ className, ...props }) => (
  <div className={className}>
    <Image {...props} />
  </div>
)).withConfig(commonCfg)(({ theme }) => ({
  width: '100%',
  paddingLeft: theme.spacing.large,
  paddingRight: theme.spacing.large,
  marginTop: theme.spacing.medium,
  marginBottom: theme.spacing.medium,
}))

const Image = styled.img.withConfig(commonCfg)(({ theme }) => ({
  display: 'block',
  maxWidth: '100%',
  border: theme.borders.default,
  borderRadius: theme.borderRadiuses.large,
  overflow: 'hidden',
}))

export default ImageWrap

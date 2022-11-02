import { Code } from 'pluralsh-design-system'
import styled from 'styled-components'

const CodeStyled = styled(Code)(({ theme }) => ({
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.large,
}))

export default function Fence({
  children, language, showHeader, ...props
}) {
  if (
    showHeader === undefined
    && (language === 'sh' || language === 'shell' || language === 'bash')
  ) {
    showHeader = false
  }

  return (
    <CodeStyled
      showHeader={showHeader}
      language={language}
      {...props}
    >
      {children}
    </CodeStyled>
  )
}

import * as React from 'react'
import { Code } from 'pluralsh-design-system'

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
    <Code
      showHeader={showHeader}
      language={language}
      {...props}
    >
      {children}
    </Code>
  )
}

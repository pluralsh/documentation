import * as React from 'react'
import { Code } from 'pluralsh-design-system'

export const CodeBlock = ({ children, language }) => {
  const ref = React.useRef(null)

  return <Code language={language}>{children}</Code>
}

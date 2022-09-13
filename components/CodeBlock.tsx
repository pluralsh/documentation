import * as React from 'react'
import { Code } from 'pluralsh-design-system'

export function CodeBlock({ children, language }) {
  return <Code language={language}>{children}</Code>
}

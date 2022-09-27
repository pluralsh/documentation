import * as React from 'react'
import { Code } from 'pluralsh-design-system'

export default function Fence({ children, language }) {
  return <Code language={language}>{children}</Code>
}
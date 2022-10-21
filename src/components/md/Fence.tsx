import * as React from 'react'
import { Code } from 'pluralsh-design-system'

export default function Fence({ children, ...props }) {
  return <Code {...props}>{children}</Code>
}

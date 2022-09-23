import * as React from 'react'
import styled from 'styled-components'

export const Callout = styled(({ title, children, ...props }) => (
  <div {...props}>
    <strong>{title}</strong>
    {children}
  </div>
))`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background: #f6f9fc;
  border: 1px solid #dce6e9;
  border-radius: 4px;
  & :global(p) {
    margin: 0;
  }
`

import Prism from 'prismjs'

import * as React from 'react'
import styled from 'styled-components'

export const CodeBlock = styled(({ children, language }) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current, false)
  }, [children])

  return (
    <div
      className="code"
      aria-live="polite"
    >
      <pre
        ref={ref}
        className={`language-${language}`}
      >
        {children}
      </pre>
    </div>
  )
})`
  position: relative;

  /* Override Prism styles */
  & :global(pre[class*='language-']) {
    text-shadow: none;
    border-radius: 4px;
  }
`

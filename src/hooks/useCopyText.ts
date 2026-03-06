import { useCallback, useEffect, useState } from 'react'

/**
 * Hook for copy-to-clipboard with visual feedback.
 * Returns { copied, handleCopy }. copied resets to false after 1s.
 */
export function useCopyText(text: string) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(
    () =>
      window.navigator.clipboard.writeText(text).then(() => setCopied(true)),
    [text]
  )

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1000)

      return () => clearTimeout(timeout)
    }
  }, [copied])

  return { copied, handleCopy }
}

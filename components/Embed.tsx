import ReactEmbed from 'react-embed'
import * as loom from '@loomhq/loom-embed'
import { useCallback, useState } from 'react'

export default function Embed({ url, ...props }: { url: string }) {
  const [loomEmbed, setLoomEmbed] = useState()
  const loomDone = useCallback(result => {
    setLoomEmbed(result)
  }, [])

  if (loomEmbed) {
    return <div dangerouslySetInnerHTML={{ __html: loomEmbed }} />
  }
  if (url.match(/^https{0,1}:\/\/(www.){0,1}loom\.com/g)) {
    loom.textReplace(url).then(loomDone)

    return null
  }

  return (
    <ReactEmbed
      url={url}
      {...props}
    />
  )
}

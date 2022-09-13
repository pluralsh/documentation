import ReactEmbed from 'react-embed'
import * as loom from '@loomhq/loom-embed'
import { useCallback, useState } from 'react'
import styled from 'styled-components'

const AspectRatio = styled.div<{ $aspectRatio: string }>(({ $aspectRatio }) => ({
  ...($aspectRatio
    ? {
      position: 'relative',
      '.lo-emb-vid[style]': {
        position: 'static !important',
        padding: '0 !important',
        height: 'unset !important',
      } as any,
      '&::before': {
        content: '""',
        width: '1px',
        marginLeft: '-1px',
        float: 'left',
        height: 0,
        paddingTop: `calc(100% / (${$aspectRatio}))`,
      },
      '&::after': {
        content: '""',
        display: 'table',
        clear: 'both',
      },
      iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    }
    : {}),
}))

function Embed({ url, aspectRatio = '16 / 9', ...props }) {
  const [loomEmbed, setLoomEmbed] = useState()
  const loomDone = useCallback(result => {
    setLoomEmbed(result)
  }, [])

  if (loomEmbed) {
    return (
      <AspectRatio
        $aspectRatio={aspectRatio}
        {...props}
        dangerouslySetInnerHTML={{ __html: loomEmbed }}
      />
    )
  }
  if (url.match(/^https{0,1}:\/\/(www.){0,1}loom\.com/g)) {
    loom.textReplace(url).then(loomDone)

    return null
  }

  return (
    <AspectRatio
      $aspectRatio={aspectRatio}
      {...props}
    >
      <ReactEmbed
        url={url}
        {...props}
        isDark
      />
    </AspectRatio>
  )
}

export default Embed

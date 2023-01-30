import { useEffect } from 'react'

import { useRouter } from 'next/router'
import Script from 'next/script'

function HubSpot() {
  const router = useRouter()

  useEffect(() => {
    if (!router?.events?.on) {
      return
    }
    const handleRouteChangeComplete = url => {
      if (!(window as any)?.Cookiebot?.consent?.statistics) {
        return
      }
      const _hsq = ((window as any)._hsq = (window as any)._hsq || [])

      _hsq.push(['setPath', url])
      _hsq.push(['trackPageView'])
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])

  return (
    <Script
      data-cookieconsent="marketing"
      strategy="afterInteractive"
      type="text/javascript"
      id="hs-script-loader"
      async
      defer
      src="//js.hs-scripts.com/22363579.js"
    />
  )
}

export default function ExternalScripts() {
  return (
    <HubSpot />
  )
}

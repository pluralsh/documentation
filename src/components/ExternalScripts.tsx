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

  // Turn tracking on and off when cookie prefs change
  useEffect(() => {
    const onCookiePrefChange = () => {
      const _hsq = (window._hsq = window._hsq || [])

      _hsq.push([
        'doNotTrack',
        { track: window.Cookiebot?.consent?.statistics },
      ])
    }

    window.addEventListener('CookiebotOnAccept', onCookiePrefChange)
    window.addEventListener('CookiebotOnDecline', onCookiePrefChange)

    return () => {
      window.removeEventListener('CookiebotOnAccept', onCookiePrefChange)
      window.removeEventListener('CookiebotOnDecline', onCookiePrefChange)
    }
  }, [])

  return (
    <Script
      type="text/plain"
      data-cookieconsent="statistics"
      strategy="afterInteractive"
      id="hs-script-loader"
      async
      defer
      src="//js.hs-scripts.com/22363579.js"
    />
  )
}

function gtag(..._: any) {
  const dataLayer = (window.dataLayer = window.dataLayer || [])

  // Trying not to rewrite what google provides
  // eslint-disable-next-line prefer-rest-params
  dataLayer.push(arguments)
}

function Gtag() {
  // Cookiebot will automatically turn on/off gtag tracking when prefs change
  // https://support.cookiebot.com/hc/en-us/articles/360003979074-Using-Google-Gtag-with-Cookiebot

  return (
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      onLoad={() => {
        const consent = window.Cookiebot?.consent

        gtag('consent', 'default', {
          ad_storage: consent?.marketing ? 'granted' : 'denied',
          analytics_storage: consent?.statistics ? 'granted' : 'denied',
          personalization_storage: consent?.preferences ? 'granted' : 'denied',
        })
        gtag('set', 'ads_data_redaction', !consent?.marketing)
        gtag('set', 'url_passthrough', true)
        gtag('js', new Date())
        gtag('config', process.env.NEXT_PUBLIC_GA_ID)
      }}
    />
  )
}

export default function ExternalScripts() {
  return (
    <>
      <Gtag />
      <HubSpot />
    </>
  )
}

import { useCallback, useEffect } from 'react'

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
  console.log('gtag', _)
  const dataLayer = (window.dataLayer = window.dataLayer || [])

  // Trying not to rewrite what google provides
  // eslint-disable-next-line prefer-rest-params
  dataLayer.push(arguments)
}

function Gtag() {
  useEffect(() => {
    window[`ga-disable-${process.env.NEXT_PUBLIC_GA_ID}`] = true

    gtag('set', { allow_google_signals: false })
    gtag('set', { allow_ad_personalization_signals: false })
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
    })
    gtag('js', new Date())
    gtag('config', process.env.NEXT_PUBLIC_GA_ID)
  }, [])

  // Turn tracking on and off when cookie prefs change
  useEffect(() => {
    const onCookiePrefChange = () => {
      const allowStats = window.Cookiebot?.consent?.statistics
      const allowMarketing = window.Cookiebot?.consent?.marketing

      gtag('set', { allow_google_signals: allowMarketing })
      gtag('consent', 'update', {
        ad_storage: allowMarketing ? 'granted' : 'denied',
        analytics_storage: allowStats ? 'granted' : 'denied',
      })
      window[`ga-disable-${process.env.NEXT_PUBLIC_GA_ID}`] = !allowStats
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
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
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

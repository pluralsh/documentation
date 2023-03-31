import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { posthog } from 'posthog-js'

function setAllowTracking(on?: boolean) {
  // Checking for POSTHOG_API_KEY prevents posthog error when calling
  // opt_in_capturing() or opt_out_capturing() without having run
  // posthog.init() first. This generally only occurs when running locally.
  if (window && process.env.NEXT_PUBLIC_POSTHOG_API_KEY) {
    if (on) {
      posthog.opt_in_capturing()
    } else {
      posthog.opt_out_capturing()
    }
  }
}

export function usePosthog() {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_API_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_API_HOST ||
          'https://posthog.plural.sh',
        opt_out_capturing_by_default:
          window.Cookiebot?.consent?.statistics ?? false,
        loaded: () => {
          setAllowTracking(window.Cookiebot?.consent?.statistics)
        },
      })
    }
  }, [])

  // Turn tracking on and off when cookie prefs change
  useEffect(() => {
    const onCookiePrefChange = () => {
      setAllowTracking(window.Cookiebot?.consent?.statistics)
    }

    window.addEventListener('CookiebotOnAccept', onCookiePrefChange)
    window.addEventListener('CookiebotOnDecline', onCookiePrefChange)

    return () => {
      window.removeEventListener('CookiebotOnAccept', onCookiePrefChange)
      window.removeEventListener('CookiebotOnDecline', onCookiePrefChange)
    }
  }, [])

  // Track route change events
  useEffect(() => {
    const handleRouteChange = () => posthog.capture('$pageview')

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

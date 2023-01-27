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
      const { _hsq } = window as any

      if (_hsq) {
        _hsq.push(['setPath', url])
        _hsq.push(['trackPageView'])
      }
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

const posthogScript = `
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_r0v4jbKz8Rr27mfqgO15AN5BMuuvnU8hCFedd6zpSDy',{api_host:'https://posthog.plural.sh'})
`

function Posthog() {
  return (
    <>
      {/* <!-- Posthog Tracking Code for https://docs.plural.sh/ --> */}
      <Script
        data-cookieconsent="statistics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: posthogScript }}
      />
    </>
  )
}
export default function ExternalScripts() {
  return (
    <>
      <Posthog />
      <HubSpot />
    </>
  )
}

import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

const hotJarScript = `
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:3188593,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`

function HotJar() {
  return (
    <>
      {/* <!-- Hotjar Tracking Code for https://docs.plural.sh/ --> */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: hotJarScript }}
      />
    </>
  )
}

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
    <>
      <HotJar />
      <HubSpot />
    </>
  )
}

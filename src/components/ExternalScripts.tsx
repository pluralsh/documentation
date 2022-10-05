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
    // const handleRouteChangeStart = url => {
    //   console.log('route start', url)
    // }
    const handleRouteChangeComplete = url => {
      console.log('route complete', url)
      const { _hsq } = window as any

      if (_hsq) {
        console.log('_hsq', _hsq)

        _hsq.push(['setPath', '/about-us'])
        _hsq.push(['trackPageView'])
      }
    }
    // const handleRouteChangeError = (_err, url) => {
    //   console.log('route error', url)
    // }

    // router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    // router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      // router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      // router.events.off('routeChangeError', handleRouteChangeError)
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

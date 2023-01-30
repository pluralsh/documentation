;(function () {
  console.log('_hsq', window._hsq)
  let isInit = false
  function startPosthog() {
    /* prettier-ignore */
    function loadPosthog() { !function (t, e) { var o, n, p, r; e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) { function g(t, e) { var o = e.split("."); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } (p = t.createElement("script")).type = "text/javascript", p.async = !0, p.src = s.api_host + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r); var u = e; for (void 0 !== a ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function (t) { var e = "posthog"; return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e }, u.people.toString = function () { return u.toString(1) + ".people (stub)" }, o = "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "), n = 0; n < o.length; n++)g(u, o[n]); e._i.push([i, s, a]) }, e.__SV = 1) }(document, window.posthog || []);}
    /* prettier-ignore */
    function initPosthog() { window.posthog.init('phc_r0v4jbKz8Rr27mfqgO15AN5BMuuvnU8hCFedd6zpSDy', { api_host: 'https://posthog.plural.sh' }) }
    if (!window.posthog) {
      console.log('consent accepted, load')
      loadPosthog()
    }
    if (!isInit) {
      console.log('consent accepted, init')
      initPosthog()
      isInit = true
    }
    console.log('consent accepted, opt_in')
    posthog.opt_in_capturing()
  }
  function stopPosthog() {
    if (window.posthog) {
      console.log('consent rejected')
      console.log('consent rejected, opt_out')
      posthog.opt_out_capturing()
    }
  }
  function startHubspot() {
    console.log('startHubspot')
    const _hsq = (window._hsq = window._hsq || [])
    _hsq.push(['doNotTrack', { track: true }])
  }
  function stopHubspot() {
    console.log('stopHubspot')
    const _hsq = (window._hsq = window._hsq || [])
    _hsq.push(['doNotTrack'])
  }

  function onPrefChange(e) {
    console.log('onPrefChange', e)
    console.log('Cookiebot.consent.statistics', Cookiebot.consent.statistics)
    if (Cookiebot.consent.statistics) {
      startPosthog()
      startHubspot()
    } else {
      stopPosthog()
      stopHubspot()
    }
  }
  window.addEventListener('CookiebotOnAccept', onPrefChange)
  window.addEventListener('CookiebotOnDecline', onPrefChange)
  onPrefChange()
})()

interface Window {
  Cookiebot?: {
    consent?: {
      statistics: boolean
      marketing: boolean
    }
    show: () => void
  }
  // Hubspot
  _hsq?: any[]
  // Gtag
  dataLayer?: any[]
}

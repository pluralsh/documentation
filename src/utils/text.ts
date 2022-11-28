import { APP_CATALOG_BASE_URL } from '../consts/routes'
import type { Provider } from '../gql/graphql'

export function removeTrailingSlashes(str) {
  if (typeof str !== 'string') {
    return str
  }

  return str.replace(/\/+$/, '')
}

export function isRelativeUrl(str: string) {
  return !str.match(/^\/.*$|^[^:/]*?:\/\/.*?$/giu)
}

export function isExternalUrl(url: string) {
  return url.substr(0, 4) === 'http' || url.substr(0, 2) === '//'
}

export const stripMdExtension = (url: string) => {
  if (!isExternalUrl(url)) {
    return url.replace(/.md$/, '')
  }

  return url
}

export function getBarePathFromPath(url: string) {
  return url.split(/[?#]/)[0]
}

export function isSubrouteOf(route: string, compareRoute:string) {
  return route.startsWith(compareRoute)
}

export function isAppCatalogRoute(route: string) {
  return isSubrouteOf(route, APP_CATALOG_BASE_URL)
}

export const providerToProviderName:Record<Provider, string> = {
  GCP: 'GCP',
  AWS: 'AWS',
  AZURE: 'Azure',
  EQUINIX: 'Equinix',
  KIND: 'kind',
  CUSTOM: 'Custom',
  KUBERNETES: 'Kubernetes',
}

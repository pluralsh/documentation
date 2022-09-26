export function removeTrailingSlashes(str) {
  return str.replace(/\/+$/, '')
}

export function isRelativeUrl(str) {
  return !str.match(/^\/.*$|^[^:/]*?:\/\/.*?$/iug)
}

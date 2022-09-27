export function removeTrailingSlashes(str) {
  if (typeof str !== 'string') {
    return str
  }

  return str.replace(/\/+$/, '')
}

export function isRelativeUrl(str) {
  return !str.match(/^\/.*$|^[^:/]*?:\/\/.*?$/iug)
}

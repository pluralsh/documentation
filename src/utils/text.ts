export function removeTrailingSlashes(str) {
  return str.replace(/\/+$/, '')
}

export function isRelativePath(str) {
  return !str.match(/^\/.*$|^[^:/]*?:\/\/.*?$/iug)
}

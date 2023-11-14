export const ROOT_TITLE = 'Docs | Plural'
export const PAGE_TITLE_PREFIX = 'Docs | Plural | '
export const PAGE_TITLE_SUFFIX = ''
export const META_DESCRIPTION =
  'Everything you need to deploy open-source data infrastructure with Plural.'
export const getAppMetaDescription = (displayName?: string) => {
  if (!displayName) return undefined

  return `How to easily install and manage ${displayName} on Kubernetes using Plural.`
}
export const DISCORD_LINK = 'https://discord.com/invite/bEBAMXV64s'

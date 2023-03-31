import { ContentHeader } from '../src/components/MainContent'
import Link from '../src/components/md/Link'

export default function Docs404() {
  return (
    <ContentHeader
      title="Page not found"
      description={
        <>
          Sorry, this page doesn't appear to exist. Would you like to vist the{' '}
          <Link href="/">home page</Link>?{' '}
        </>
      }
    />
  )
}

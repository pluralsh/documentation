import { useMemo, useState } from 'react'

import {
  Input,
  MagnifyingGlassIcon,
  RepositoryChip,
} from '@pluralsh/design-system'
import Link from 'next/link'

import chroma from 'chroma-js'
import Fuse from 'fuse.js'
import styled from 'styled-components'

import { APP_CATALOG_BASE_URL } from '../consts/routes'
import { useRepos } from '../contexts/ReposContext'

function AppsList({ className, ...props }: { className?: string }) {
  const applications = useRepos()
  const [search, setSearch] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(applications, {
        threshold: 0.3,
        keys: ['name', 'displayName', 'tags.tag'],
      }),
    [applications]
  )

  const filteredApplications = search
    ? fuse.search(search).map((x) => x.item)
    : applications

  if (!applications || applications.length <= 0) {
    return null
  }

  return (
    <nav
      className={className}
      {...props}
    >
      <div className="inputWrap">
        <Input
          className="searchInput"
          autoFocus
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search an application"
          startIcon={<MagnifyingGlassIcon />}
          width="100%"
        />
      </div>
      <div className="appList">
        {filteredApplications &&
          filteredApplications.map((application) => (
            <RepositoryChip
              key={application.id}
              imageUrl={application.darkIcon || application.icon || undefined}
              label={`${application.displayName}`}
              checked={false}
              as={Link}
              href={`${APP_CATALOG_BASE_URL}/${application.name}`}
              cursor="pointer"
              textDecoration="none"
              color="inherit"
            />
          ))}
      </div>
    </nav>
  )
}

export default styled(AppsList)(({ theme }) => ({
  'ul, li': {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  '.appList': {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gridTemplateRows: 'repeat(auto-fill, 42px)',
    gridColumnGap: theme.spacing.medium,
    gridRowGap: '16px',
    paddingRight: 'xsmall',
    paddingBottom: 'medium',
    minHeight: 'calc(100vh - var(--top-nav-height) - 420px)',
  },
  '.inputWrap': {
    position: 'sticky',
    top: 'var(--top-nav-height)',
    marginBottom: theme.spacing.large,
    backgroundColor: theme.colors['fill-zero'],

    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      height: theme.spacing.large,
      background: `linear-gradient(0deg, ${chroma(
        theme.colors['fill-zero']
      ).alpha(0.0)} 0%, ${chroma(theme.colors['fill-zero']).alpha(1.0)} 100%)`,
    },
  },
  '.searchInput': {},
}))

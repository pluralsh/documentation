import styled from 'styled-components'
import { GitHubLogoIcon } from 'pluralsh-design-system'
import useSWR from 'swr'

import { ButtonFillTwo } from './PageHeaderButtons'

async function fetcher<JSON = any>(input: RequestInfo,
  init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init)

  return res.json()
}

type GithubRepoData = { stargazers_count: number }

function isGithubRepoData(obj: unknown): obj is GithubRepoData {
  return !!(obj && 'stargazers_count' in obj)
}

const GithubLink = styled(ButtonFillTwo)<{ $loading: boolean }>(({ theme, $loading }) => ({
  ...theme.partials.text.buttonSmall,
  fontWeight: '600',
  height: theme.spacing.xlarge,
  borderRadius: theme.borderRadiuses.medium,
  color: theme.colors.text,
  border: theme.borders['fill-two'],
  background: theme.colors['fill-two'],
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  textDecoration: 'none',
  '.left, .right': {
    height: theme.spacing.xlarge - (theme.borderWidths.default * 2),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: theme.spacing.small,
    paddingRight: theme.spacing.small,
    gap: theme.spacing.small,
  },
  ...(!$loading ? {
    '.left': {
      borderRight: theme.borders['fill-two'],
    },
  } : {}),
  '.right': {
    backgroundColor: theme.colors['fill-one'],
  },
  '&:hover .right': {
    backgroundColor: theme.colors['fill-one-hover'],
  },
  '&:hover .left': {
    backgroundColor: theme.colors['fill-two-hover'],
  },
}))

export default function GithubStars({ account, repo }) {
  const { data, error } = useSWR(`https://api.github.com/repos/${account}/${repo}`,
    fetcher)

  const loading = error || !isGithubRepoData(data)

  return (
    <GithubLink
      $loading={loading}
      target="_blank"
      rel="noreferrer noopener"
      href={`https://github.com/${account}/${repo}`}
    >
      <div
        className="left"
      >
        <GitHubLogoIcon size={16} />
        <div>Star</div>
      </div>
      {!loading && <div className="right">{data?.stargazers_count}</div>}
    </GithubLink>
  )

  return null
}

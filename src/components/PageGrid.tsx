import styled from 'styled-components'

import { mqs } from './GlobalStyles'

export const PageGrid = styled.div(_p => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: 1588,
  marginLeft: 'auto',
  marginRight: 'auto',
}))

export const SideNavContainer = styled.div(_p => ({
  display: 'none',
  [mqs.twoColumn]: {
    display: 'block',
    flex: '0 0 300px',
    marginRight: 'auto',
  },
}))

export const SideCarContainer = styled.div(({ theme }) => ({
  display: 'none',

  [mqs.threeColumn]: {
    position: 'sticky',
    marginRight: theme.spacing.large,
    top: 'var(--top-nav-height)',
    maxHeight: 'calc(100vh - var(--top-nav-height))',
    flex: '0 0 200px',
    overflow: 'auto',
    display: 'block',
  },
}))

export const ContentContainer = styled.main(({ theme }) => ({
  flex: '1 1',
  marginRight: theme.spacing.large,
  marginLeft: theme.spacing.large,
  [mqs.twoColumn]: {
    maxWidth: 896,
  },
  [mqs.threeColumnLoose]: {
    marginRight: theme.spacing.xlarge,
    marginLeft: theme.spacing.xlarge,
  },
}))

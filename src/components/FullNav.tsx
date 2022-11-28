import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  usePrevious,
} from '@pluralsh/design-system'
import styled from 'styled-components'

import { useNavData } from '../contexts/NavDataContext'
import { isSubrouteOf } from '../utils/text'
import { NavPositionWrapper, SideNav } from './SideNav'
import { PluralMenu } from './MobileMenu'

import type { MenuId } from '../NavData'
import type { ButtonProps } from 'honorable'

function NavButtonsUnstyled({ desktop: _desktop, children, ...props }) {
  return (
    <div {...props}>
      <div>{children}</div>
    </div>
  )
}

export const NavButtons = styled(NavButtonsUnstyled)<{ desktop: boolean }>(({ desktop, theme }) => ({
  padding: theme.spacing.medium,
  backgroundColor: theme.colors['fill-one'],

  ...(desktop
    ? {
      paddingLeft: 0,
      marginLeft: -1000,
    }
    : {}),

  '> div': {
    width: '100%',
    marginLeft: desktop ? 1000 : 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.medium,
    justifyContent: 'space-between',
  },
}))

export const NavWrap = styled.div(_ => ({
  position: 'relative',
  flexGrow: 1,
}))

function NavButton({
  navDirection = 'back',
  ...props
}: { navDirection: 'forward' | 'back' } & ButtonProps) {
  return (
    <Button
      tertiary
      startIcon={
        navDirection === 'back' ? <ArrowLeftIcon /> : <ArrowRightIcon />
      }
      {...props}
    />
  )
}
export function FullNav({ desktop = true }: { desktop: boolean }) {
  const [menuId, setMenuId] = useState<MenuId>('docs')
  const navData = useNavData()
  const router = useRouter()

  const isAppCatalogRoute = isSubrouteOf(router.asPath, '/repositories')
  const wasAppCatalogRoute = usePrevious(isAppCatalogRoute)

  useEffect(() => {
    if (isAppCatalogRoute && !wasAppCatalogRoute) {
      setMenuId('appCatalog')
    }
  }, [isAppCatalogRoute, wasAppCatalogRoute])

  const showNavButton = isAppCatalogRoute || !desktop
  let rightNavButton
  let leftNavButton

  if (!desktop) {
    if (menuId === 'plural') {
      rightNavButton = (
        <NavButton
          navDirection="forward"
          onClick={() => setMenuId('docs')}
        >
          Docs menu
        </NavButton>
      )
    }
    else if (menuId === 'docs') {
      leftNavButton = (
        <NavButton
          navDirection="back"
          onClick={() => setMenuId('plural')}
        >
          Plural menu
        </NavButton>
      )
    }
  }
  if (isAppCatalogRoute) {
    if (menuId === 'docs') {
      rightNavButton = (
        <NavButton
          navDirection="forward"
          onClick={() => setMenuId('appCatalog')}
        >
          App catalog
        </NavButton>
      )
    }
    else if (menuId === 'appCatalog') {
      leftNavButton = (
        <NavButton
          navDirection="back"
          onClick={() => setMenuId('docs')}
        >
          All docs
        </NavButton>
      )
    }
  }

  const content = (
    <>
      {showNavButton && (
        <NavButtons desktop={desktop}>
          {leftNavButton}
          {rightNavButton}
        </NavButtons>
      )}
      <NavWrap>
        {menuId === 'plural' ? (
          <PluralMenu />
        ) : (
          <SideNav
            navData={navData[menuId]}
            menuId={menuId}
            setMenuId={setMenuId}
            desktop={desktop}
            padTop={!showNavButton}
          />
        )}
      </NavWrap>
    </>
  )

  if (desktop) {
    return (
      <NavPositionWrapper
        role="navigation"
        aria-label="Main"
      >
        {content}
      </NavPositionWrapper>
    )
  }

  return content
}

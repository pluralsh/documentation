import styled from 'styled-components'
import ScrollLock from 'react-scrolllock'

import NavData from 'NavData'

import { useState } from 'react'

import { ArrowLeftIcon, ArrowRightIcon, Button } from 'pluralsh-design-system'

import { SideNav } from './SideNav'

type MobileMenuProps = {
  isOpen: boolean
  className?: string
}
function DocsMenu() {
  return <div>Docs Menu</div>
}

const NavButtons = styled.div(({ theme }) => ({
  padding: theme.spacing.medium,
}))

const NavWrap = styled.div(({ theme }) => ({
  position: 'relative',
  flexGrow: 1,
}))

const Content = styled.div(({ theme }) => ({
  pointerEvents: 'all',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 'var(--top-nav-height)',
  bottom: 0,
  paddingRight: 0,
  background: theme.colors['fill-one'],

  display: 'flex',
  flexDirection: 'column',
}))

function MobileMenu({ isOpen, className }: MobileMenuProps) {
  const [curMenu, setCurMenu] = useState<'docs' | 'plural'>('docs')

  return (
    <>
      {isOpen ? <ScrollLock /> : null}
      <div className={className}>
        <Content>
          <NavButtons>
            {curMenu === 'docs' ? (
              <Button
                tertiary
                endIcon={<ArrowRightIcon />}
                onClick={() => setCurMenu('plural')}
              >
                Plural menu
              </Button>
            ) : (
              <Button
                tertiary
                startIcon={<ArrowLeftIcon />}
                onClick={() => setCurMenu('docs')}
              >
                Docs menu
              </Button>
            )}
          </NavButtons>
          <NavWrap>
            <SideNav
              show={curMenu === 'docs'}
              desktop={false}
              navData={NavData}
            />
            <DocsMenu show={curMenu === 'plural'} />
          </NavWrap>
        </Content>
      </div>
    </>
  )
}

export default styled(MobileMenu)(({ isOpen, theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100%',
  display: isOpen ? 'block' : 'none',
  zIndex: theme.zIndexes.modal,
  pointerEvents: 'none',
}))

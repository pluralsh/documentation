import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

export const TopNav = styled(({ children, ...props }) => (
  <nav {...props}>
    <Link
      href="/"
      className="flex"
    >
      Home
    </Link>
    <section>{children}</section>
  </nav>
))(({ theme }) => ({
  top: 0,
  position: 'fixed',
  height: 'var(--top-nav-height)',
  width: '100%',
  zIndex: '100',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  padding: '1rem 2rem',
  borderBottom: `1px solid ${theme.colors.border}`,
  section: {
    display: 'flex',
    gap: '1rem',
    padding: '0',
  },
}))

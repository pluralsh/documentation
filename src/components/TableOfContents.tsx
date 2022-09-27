import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

export const TableOfContents = styled(({ toc, ...props }) => {
  const items = toc.filter(item => item.id && (item.level === 2 || item.level === 3))

  if (items.length <= 1) {
    return null
  }

  return (
    <nav {...props}>
      <ul className="flex column">
        {items.map(item => {
          const href = `#${item.id}`
          const active
            = typeof window !== 'undefined' && window.location.hash === href

          return (
            <li
              key={item.title}
              className={[
                active ? 'active' : undefined,
                item.level === 3 ? 'padded' : undefined,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <Link
                href={href}
                passHref
              >
                <a>{item.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
})`
  margin-bottom: 1rem;
  padding: 0.5rem 0 0;
  border-left: 1px solid var(--border-color);
  ul {
    margin: 0;
    padding: 0 1.5rem;
  }
  li {
    list-style-type: none;
    margin: 0 0 1rem;
  }
  li a {
    text-decoration: none;
  }
  li a:hover,
  li.active a {
    text-decoration: underline;
  }
  li.padded {
    padding-left: 1rem;
  }
`
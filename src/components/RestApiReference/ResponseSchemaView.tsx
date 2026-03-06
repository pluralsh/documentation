/**
 * Renders response schemas as a flat table matching the ParameterTable style.
 * Nested properties are indented; no collapsible sections.
 */

import { useState } from 'react'

import styled from 'styled-components'

import {
  StatusDot,
  StatusTab,
  StatusTabs,
  Table,
  Td,
  TdLight,
  Th,
  TypeTag,
  getStatusColor,
} from './shared'

import type { ResponseSchemaInfo, SchemaProperty } from '@src/lib/openapi-rest'

/* ─── Styled Components ──────────────────────────────────────────────────── */

const SchemaContainer = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.large,
}))

const FallbackText = styled.p(({ theme }) => ({
  color: theme.colors['text-light'],
}))

const SchemaHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.small,
  marginBottom: theme.spacing.medium,
  ...theme.partials.text.overline,
  color: theme.colors['text-xlight'],
}))

const ContentTypeBadge = styled.span(({ theme }) => ({
  ...theme.partials.text.caption,
  color: theme.colors['text-light'],
  background: theme.colors['fill-one'],
  padding: '2px 8px',
  borderRadius: theme.borderRadiuses.medium,
  fontFamily: 'Monument Semi-Mono, monospace',
}))

const EnumBadge = styled.span(({ theme }) => ({
  ...theme.partials.text.caption,
  fontFamily: 'Monument Semi-Mono, monospace',
  color: theme.colors['text-light'],
  background: theme.colors['fill-two'],
  padding: '1px 6px',
  borderRadius: theme.borderRadiuses.medium,
  border: `1px solid ${theme.colors.border}`,
}))

const EnumWrap = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.xxsmall,
  flexWrap: 'wrap' as const,
  marginTop: 4,
}))

const EnumLabel = styled.span(({ theme }) => ({
  ...theme.partials.text.caption,
  color: theme.colors['text-xlight'],
}))

const NameWrap = styled.span<{ $depth: number }>(({ $depth }) => ({
  paddingLeft: $depth * 16,
  display: 'inline-flex',
  alignItems: 'center',
}))

/* ─── Helpers ────────────────────────────────────────────────────────────── */

interface FlatRow {
  key: string
  name: string
  type: string
  description: string | null | undefined
  depth: number
  enum?: string[]
  format?: string
}

function flattenProperties(
  props: SchemaProperty[],
  depth: number,
  prefix: string
): FlatRow[] {
  const rows: FlatRow[] = []

  for (const prop of props) {
    const key = prefix ? `${prefix}.${prop.name}` : prop.name
    const isArray = prop.type === 'array'

    let { type } = prop

    if (isArray && prop.arrayItemType) {
      type = `Array<${prop.arrayItemType}>`
    } else if (isArray) {
      type = 'array'
    }
    if (prop.format) {
      type = `${type} <${prop.format}>`
    }

    rows.push({
      key,
      name: prop.name,
      type,
      description: prop.description,
      depth,
      enum: prop.enum,
      format: prop.format,
    })

    const children = prop.arrayItemProperties ?? prop.properties

    if (children && children.length > 0) {
      rows.push(...flattenProperties(children, depth + 1, key))
    }
  }

  return rows
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export function ResponseSchemaView({
  schemas,
}: {
  schemas: ResponseSchemaInfo[]
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (schemas.length === 0) {
    return (
      <SchemaContainer>
        <FallbackText>No response schema available.</FallbackText>
      </SchemaContainer>
    )
  }

  const selected = schemas[selectedIndex]

  if (!selected) return null

  const rows = flattenProperties(selected.properties, 0, '')

  return (
    <SchemaContainer>
      {schemas.length > 1 && (
        <StatusTabs>
          {schemas.map((s, i) => (
            <StatusTab
              key={s.status}
              $active={i === selectedIndex}
              onClick={() => setSelectedIndex(i)}
              type="button"
            >
              <StatusDot $color={getStatusColor(s.status)} />
              {s.status}
            </StatusTab>
          ))}
        </StatusTabs>
      )}

      <SchemaHeader>
        <span>Response schema:</span>
        <ContentTypeBadge>{selected.contentType}</ContentTypeBadge>
      </SchemaHeader>

      {rows.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <Td>
                  <NameWrap $depth={row.depth}>
                    <code>{row.name}</code>
                  </NameWrap>
                </Td>
                <Td>
                  <TypeTag>{row.type}</TypeTag>
                </Td>
                <TdLight>
                  {row.description ?? '—'}
                  {row.enum && row.enum.length > 0 && (
                    <EnumWrap>
                      <EnumLabel>Enum:</EnumLabel>
                      {row.enum.map((v) => (
                        <EnumBadge key={v}>{`"${v}"`}</EnumBadge>
                      ))}
                    </EnumWrap>
                  )}
                </TdLight>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <FallbackText>
          {selected.description ?? 'No schema details available.'}
        </FallbackText>
      )}
    </SchemaContainer>
  )
}

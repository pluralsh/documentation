/**
 * API parameter table. Displays name, type, required, description.
 */

import styled from 'styled-components'

import type { Parameter } from '@src/lib/openapi-rest'

import { Table, Th, Td, TdLight, TypeTag } from './shared'

const RequiredBadge = styled.span(() => ({
  fontSize: 10,
  fontWeight: 600,
  color: '#FF6369',
  marginLeft: 8,
}))

export function ParameterTable({ parameters }: { parameters: Parameter[] }) {
  if (parameters.length === 0) return null

  return (
    <Table>
      <thead>
        <tr>
          <Th>Parameter</Th>
          <Th>Type</Th>
          <Th>Description</Th>
        </tr>
      </thead>
      <tbody>
        {parameters.map((param) => (
          <tr key={param.name}>
            <Td>
              <code>{param.name}</code>
              {param.required && <RequiredBadge>required</RequiredBadge>}
            </Td>
            <Td>
              <TypeTag>{param.type}</TypeTag>
            </Td>
            <TdLight>{param.description ?? '—'}</TdLight>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

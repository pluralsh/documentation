/**
 * Response samples panel. Custom block matching design: no file icon,
 * green/amber/red status dot, Copy button without icon.
 */

import { useState } from 'react'
import {
  Card,
  Highlight,
  Button,
  CopyIcon,
  CheckIcon,
} from '@pluralsh/design-system'
import styled from 'styled-components'

import { useCopyText } from '@src/hooks/useCopyText'
import type { EndpointDetail, ResponseSample } from '@src/lib/openapi-rest'

import { getStatusColor, StatusTabs, StatusTab, StatusDot } from './shared'

const Panel = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.large,
}))

const ResponseHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing.medium,
  minHeight: theme.spacing.xlarge + theme.spacing.xsmall * 2,
  padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
  borderBottom: theme.borders['fill-two'],
  backgroundColor: theme.colors['fill-two'],
  borderTopLeftRadius: theme.borderRadiuses.medium + 2,
  borderTopRightRadius: theme.borderRadiuses.medium + 2,
  ...theme.partials.text.overline,
  color: theme.colors['text-light'],
}))

const StatusBadge = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.xsmall,
}))

const CodeWrapper = styled.div(() => ({
  position: 'relative' as const,
  '&:hover [data-copy-btn]': {
    opacity: 1,
    pointerEvents: 'auto' as const,
  },
}))

const CopyBtnWrap = styled.div(({ theme }) => ({
  position: 'absolute' as const,
  zIndex: 1,
  right: theme.spacing.medium,
  top: theme.spacing.medium,
  opacity: 0,
  pointerEvents: 'none' as const,
  transition: 'opacity 0.2s ease',
}))

const CodeContent = styled.div(({ theme }) => ({
  overflow: 'auto',
  padding: `${theme.spacing.medium}px`,
}))

export function ResponsePanel({ detail }: { detail: EndpointDetail }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const responses = detail.responses ?? []

  if (responses.length === 0) return null

  const selected = responses[selectedIndex] as ResponseSample | undefined
  if (!selected) return null

  return (
    <Panel>
      {responses.length > 1 && (
        <StatusTabs>
          {responses.map((r, i) => (
            <StatusTab
              key={r.status}
              $active={i === selectedIndex}
              onClick={() => setSelectedIndex(i)}
              type="button"
            >
              <StatusDot $color={getStatusColor(r.status)} />
              {r.status}
            </StatusTab>
          ))}
        </StatusTabs>
      )}
      <Card
        key={`${detail.id}-${selected.status}`}
        fillLevel={1}
        borderColor="border-fill-two"
      >
        <ResponseHeader>
          <span>Response samples</span>
          <StatusBadge>
            <StatusDot $color={getStatusColor(selected.status)} />
            {selected.status}
          </StatusBadge>
        </ResponseHeader>
        <ResponseCodeBlock content={selected.body} />
      </Card>
    </Panel>
  )
}

function ResponseCodeBlock({ content }: { content: string }) {
  const { copied, handleCopy } = useCopyText(content)

  return (
    <CodeWrapper>
      <CopyBtnWrap data-copy-btn>
        <Button
          small
          floating
          startIcon={copied ? <CheckIcon /> : <CopyIcon />}
          onClick={handleCopy}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </CopyBtnWrap>
      <CodeContent>
        <Highlight language="json">{content}</Highlight>
      </CodeContent>
    </CodeWrapper>
  )
}

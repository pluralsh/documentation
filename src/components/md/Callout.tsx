import classNames from 'classnames'
import { FillLevelContext } from 'components/contexts'
import { ErrorIcon, InfoIcon, StatusOkIcon } from 'pluralsh-design-system'
import { ReactNode } from 'react'
import styled, { DefaultTheme, useTheme } from 'styled-components'

type Style = 'warning' | 'info' | 'danger' | 'success'
type Size = 'compact' | 'full'

function styleToColor(theme: DefaultTheme): Record<Style, string> {
  return {
    danger: theme.colors['text-error-light'],
    warning: theme.colors['text-warning-light'],
    success: theme.colors['text-success-light'],
    info: theme.colors['text-primary-accent'],
  }
}

const styleToText: Record<Style, string> = {
  danger: 'Danger',
  warning: 'Warning',
  success: 'Success',
  info: 'Info',
}

const styleToIcon: Record<Style, any> = {
  info: InfoIcon,
  warning: ErrorIcon,
  danger: ErrorIcon,
  success: StatusOkIcon,
}

const sizeToIconSize: Record<Size, number> = {
  compact: 16,
  full: 20,
}

function Callout({
  title,
  style = 'info',
  size = 'full',
  children,
}: {
  title: string
  style: Style
  size: Size
  children: ReactNode
}) {
  const theme = useTheme()
  const text = styleToText[style]
  const color = styleToColor(theme)[style]
  const Icon = styleToIcon[style]

  return (
    <FillLevelContext.Provider value={1}>
      <CalloutWrap
        color={color}
        size={size}
      >
        <div className="icon">
          <Icon
            marginTop={size === 'full' ? 2 : 5}
            size={sizeToIconSize[size]}
            color={color}
          />
        </div>
        <div>
          <h6 className={classNames({ visuallyHidden: !title })}>
            <span className="visuallyHidden">{`${text}: `}</span>
            {title}
          </h6>
          <div className="children">{children}</div>
        </div>
      </CalloutWrap>
    </FillLevelContext.Provider>
  )
}

const CalloutWrap = styled.div<{ color: string; size: Size }>(({ theme, color, size }) => ({
  position: 'relative',
  display: 'flex',
  gap: theme.spacing.small,
  padding:
      size === 'compact'
        ? `${theme.spacing.xsmall}px ${theme.spacing.medium}px`
        : `${theme.spacing.medium}px`,
  margin: 0,
  marginTop: theme.spacing.xlarge,
  marginBottom: theme.spacing.xlarge,

  borderRadius: theme.borderRadiuses.medium,
  backgroundColor: theme.colors['fill-one'],
  h6: {
    ...theme.partials.marketingText.body1Bold,
    color: theme.colors.text,
    margin: 0,
    padding: 0,
    marginBottom: theme.spacing.xxsmall,
  },
  '.children *:first-child': {
    marginTop: '0',
  },
  '.children *:last-child': {
    marginBottom: '0',
  },
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
  },
  '&::before': {
    borderTopLeftRadius: theme.borderRadiuses.medium,
    borderBottomLeftRadius: theme.borderRadiuses.medium,
    right: 'unset',
    width: 3,
    background: color,
    zIndex: 2,
  },
  '&::after': {
    borderRadius: theme.borderRadiuses.medium,
    border: theme.borders['fill-one'],
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
  },
  '.visuallyHidden': {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  },
}))

export default Callout

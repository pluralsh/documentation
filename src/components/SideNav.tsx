import React, {
  ComponentProps,
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { removeTrailingSlashes } from 'utils/text'
import { CaretRightIcon } from 'pluralsh-design-system'
import classNames from 'classnames'

export type NavItem = {
  title: string
  href?: string
  icon?: ReactElement
  sections?: NavItem[]
}

export type NavData = {
  title: string
  sections: NavItem[]
}[]

export type SideNavProps = {
  navData: NavData
}

const SubSectionContext = createContext({ setActiveLink: () => {} })

const LinkList = styled.ul<{ $indentLevel: number }>(({ theme, $indentLevel }) => ({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  ...($indentLevel
    ? {
      paddingLeft:
            $indentLevel >= 2 ? theme.spacing.xsmall : theme.spacing.medium,
    }
    : {}),
}))

const LinkA = styled.a<{ $isSelected?: boolean }>(({ $isSelected = false, theme }) => ({
  display: 'block',
  cursor: 'pointer',
  flexGrow: 1,
  margin: 0,
  padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
}))

type LinkBaseProps = Partial<ComponentProps<typeof Link>> & {
  isSelected?: boolean
}

function LinkBase({
  className,
  isSelected = false,
  children,
  href,
}: // ...props
LinkBaseProps) {
  const content = (
    <LinkA
      className={className}
      $isSelected={isSelected}
    >
      {children}
    </LinkA>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

const CaretButton = styled(({ isOpen: _isOpen = false, className }) => (
  <button
    type="button"
    className={className}
  >
    <CaretRightIcon className="icon" />
  </button>
))(({ theme, isOpen }) => ({
  ...theme.partials.reset.button,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: theme.spacing.large,
  paddingLeft: theme.spacing.large,
  cursor: 'pointer',
  ...(isOpen
    ? {
      '.icon': {
        transform: 'rotate(90deg)',
        transition: 'transform 0.1s ease',
      },
    }
    : {
      '&:hover': {
        '.icon': {
          transform: 'translateX(10%)',
          transition: 'transform 0.1s ease',
        },
      },
    }),
}))

const NavLink = styled(({
  className,
  isSubSection = false,
  isOpen = false,
  icon,
  ...props
}: {
    isSubSection?: boolean
    isOpen?: boolean
    icon?: ReactElement
  } & Partial<ComponentProps<typeof Link>>) => {
  const router = useRouter()
  const href = useMemo(() => removeTrailingSlashes(props.href), [props.href])
  const pathname = useMemo(() => removeTrailingSlashes(router.pathname),
    [router.pathname])
  const isSelected = useMemo(() => pathname === href, [pathname, href])
  const subSectionContext = useContext(SubSectionContext)

  if (isSelected) {
    subSectionContext.setActiveLink()
  }

  return (
    <li className={classNames(className, { isSelected })}>
      <LinkBase
        isSelected={isSelected}
        isOpen={isOpen}
        icon={icon}
        {...props}
      />
      {isSubSection && <CaretButton isOpen={isOpen} />}
    </li>
  )
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing.medium,
  alignItems: 'stretch',
  justifyContent: 'space-between',
  margin: 0,
  padding: 0,
  listStyle: 'none',

  borderStartStartRadius: theme.borderRadiuses.medium,
  borderEndStartRadius: theme.borderRadiuses.medium,
  '&:hover': {
    backgroundColor: theme.colors['fill-one-hover'],
  },
  '&.isSelected': {
    backgroundColor: theme.colors['action-primary'],
    '&:hover': { backgroundColor: theme.colors['action-primary-hover'] },
  },
}))

const TopHeading = styled.h1(({ theme }) => ({
  marginTop: theme.spacing.large,
  ...theme.partials.marketingText.label,
}))

const TopSection = styled(({ title, children, ...props }) => (
  <div {...props}>
    <TopHeading>{title}</TopHeading>
    {children}
  </div>
))(({ theme }) => ({
  display: 'block',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  h2: {
    ...theme.partials.text.subtitle2,
  },
}))

function SubSection({
  title,
  href,
  sections,
  icon,
  indentLevel = 1,
}: NavItem & { indentLevel?: number }) {
  const [_isActiveSection, setIsActiveSection] = useState(false)
  const contextValue = useMemo(() => ({
    setActiveLink: () => {
      setIsActiveSection(true)
    },
  }),
  [])

  return (
    <SubSectionContext.Provider value={contextValue}>
      <NavLink
        isSubSection={!!sections}
        href={href}
        icon={icon}
      >
        {title}
      </NavLink>
      {sections && (
        <LinkList $indentLevel={indentLevel}>
          {sections.map(subSection => (
            <SubSection
              {...subSection}
              indentLevel={2}
            />
          ))}
        </LinkList>
      )}
    </SubSectionContext.Provider>
  )
}

const NavWrap = styled.nav(({ theme }) => ({
  // layout,
  position: 'sticky',
  top: 'var(--top-nav-height)',
  height: 'calc(100vh - var(--top-nav-height))',
  overflowY: 'auto',
  // flex: '0 0 auto',

  // style
  backgroundColor: theme.colors['fill-one'],
  borderRight: theme.borders['fill-one'],
  // ...theme.partials.marketingText.body2,

  // borderRight: theme,
}))

export function SideNav({ navData, ...props }: SideNavProps) {
  const router = useRouter()

  console.log('router', router)

  return (
    <NavWrap {...props}>
      {navData.map(({ title, sections }) => (
        <TopSection title={title}>
          {sections.map(subSection => (
            <SubSection {...subSection} />
          ))}
        </TopSection>
      ))}
    </NavWrap>
  )
}

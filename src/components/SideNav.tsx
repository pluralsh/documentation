import React, {
  ComponentProps,
  MutableRefObject,
  ReactElement,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { removeTrailingSlashes } from 'utils/text'
import { CaretRightIcon, usePrevious } from 'pluralsh-design-system'
import classNames from 'classnames'
import { animated, useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'

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

const NavContext = createContext<{ optimisticPathname: null | string }>({
  optimisticPathname: null,
})

const LinkA = styled.a(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.small,
  cursor: 'pointer',
  flexGrow: 1,
  margin: 0,
  padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
  ...theme.partials.marketingText.body2,
  color: theme.colors['text-light'],
  '&:hover': {
    color: theme.colors.text,
  },
}))

type LinkBaseProps = Partial<ComponentProps<typeof Link>> & {
  icon?: ReactElement
}

function LinkBase({
  className,
  children,
  icon,
  href,
}: // ...props
LinkBaseProps) {
  const content = (
    <LinkA className={className}>
      {icon && icon}
      {children}
    </LinkA>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

const CaretButton = styled(({ isOpen: _isOpen = false, className, ...props }) => (
  <button
    type="button"
    className={className}
    {...props}
  >
    <CaretRightIcon className="icon" />
  </button>
))(({ theme, isOpen }) => ({
  ...theme.partials.reset.button,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: theme.spacing.large,
  paddingLeft: theme.spacing.medium,
  cursor: 'pointer',
  color: theme.colors['text-light'],
  '&:hover': theme.colors.text,
  transition: 'color 0.1s ease',
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
  onToggleOpen,
  icon,
  ...props
}: {
    isSubSection?: boolean
    isOpen?: boolean
    icon?: ReactElement
    onToggleOpen?: () => void
  } & Partial<ComponentProps<typeof Link>>) => {
  const href = useMemo(() => removeTrailingSlashes(props.href), [props.href])
  const pathname = removeTrailingSlashes(useContext(NavContext).optimisticPathname)
  const isSelected = useMemo(() => pathname === href, [pathname, href])

  return (
    <li className={classNames(className, { isSelected })}>
      <LinkBase
        icon={icon}
        {...props}
      />
      {isSubSection && (
        <CaretButton
          isOpen={isOpen}
          onClick={onToggleOpen}
        />
      )}
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
  paddingLeft: theme.spacing.medium,
  paddingTop: theme.spacing.xsmall,
  paddingBottom: theme.spacing.xsmall,
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

function isPathnameInSections(routerPathname,
  sections: NavItem[] | undefined,
  depth = 0) {
  routerPathname = removeTrailingSlashes(routerPathname)
  for (const section of sections || []) {
    if (routerPathname === removeTrailingSlashes(section.href)) {
      return true
    }
    if (isPathnameInSections(routerPathname, section.sections, depth + 1)) {
      return true
    }
  }

  return false
}

const SubSectionsList = styled(forwardRef<
    HTMLUListElement,
    { sections: NavItem[]; indentLevel?: number; className?: string }
  >(({ className, sections, indentLevel = 0 }, ref) => {
    const router = useRouter()

    return (
      <ul
        ref={ref}
        className={className}
      >
        {sections.map(subSection => {
          const defaultOpen = isPathnameInSections(router.pathname, [
            subSection,
          ])

          return (
            <SubSection
              key={`${subSection.href || ''}-${subSection.title || ''}`}
              defaultOpen={defaultOpen}
              {...subSection}
              indentLevel={indentLevel + 1}
            />
          )
        })}
      </ul>
    )
  }))(({ theme, indentLevel }) => ({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  ...(indentLevel
    ? {
      paddingLeft:
          indentLevel >= 2 ? theme.spacing.xsmall : theme.spacing.medium,
    }
    : {}),
}))

function SubSection({
  title,
  href,
  sections,
  icon,
  indentLevel = 1,
  defaultOpen = false,
}: NavItem & { indentLevel?: number; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])
  const [measureRef, { height }] = useMeasure()
  const prevHeight = usePrevious(height)

  const pathname = removeTrailingSlashes(useContext(NavContext).optimisticPathname)
  const prevPathname = usePrevious(pathname)
  const isSelected = useMemo(() => pathname === removeTrailingSlashes(href), [pathname, href])

  useEffect(() => {
    if (prevPathname !== pathname && isSelected) {
      setIsOpen(true)
    }
  }, [prevPathname, pathname, isSelected])

  const expand = useSpring({
    height: isOpen ? `${height}px` : '0px',
    immediate: !prevHeight,
    config: isOpen
      ? {
        mass: 0.6,
        tension: 280,
        velocity: 0.02,
      }
      : {
        mass: 0.6,
        tension: 400,
        velocity: 0.02,
        restVelocity: 0.1,
      },
  })

  return (
    <>
      <NavLink
        isSubSection={!!sections}
        href={href}
        icon={icon}
        isOpen={isOpen}
        onToggleOpen={toggleOpen}
      >
        {title}
      </NavLink>
      {sections && (
        <animated.div
          className="sturf"
          style={{
            ...(prevHeight ? expand : { height: isOpen ? 'auto' : '0' }),
            overflow: 'hidden',
          }}
        >
          <SubSectionsList
            sections={sections}
            ref={measureRef as unknown as MutableRefObject<any>}
            indentLevel={indentLevel}
          />
        </animated.div>
      )}
    </>
  )
}

const NavWrap = styled.nav(({ theme }) => ({
  // layout,
  position: 'sticky',
  top: 'var(--top-nav-height)',
  height: 'calc(100vh - var(--top-nav-height))',
  overflowY: 'auto',
  paddingBottom: theme.spacing.xlarge,
  // style
  backgroundColor: theme.colors['fill-one'],
  borderRight: theme.borders['fill-one'],
}))

export function SideNav({ navData, ...props }: SideNavProps) {
  const router = useRouter()
  const [optimisticPathname, setOptimisticPathname] = useState<string | null>(null)
  const contextValue = useMemo(() => ({
    optimisticPathname:
        optimisticPathname === null ? router.pathname : optimisticPathname,
  }),
  [optimisticPathname, router.pathname])

  useEffect(() => {
    if (!router?.events?.on) {
      return
    }
    const handleRouteChangeStart = url => {
      setOptimisticPathname(url)
    }
    const handleRouteChangeComplete = _url => {
      setOptimisticPathname(null)
    }
    const handleRouteChangeError = (_err, _url) => {
      setOptimisticPathname(null)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router.events])

  return (
    <NavContext.Provider value={contextValue}>
      <NavWrap {...props}>
        {navData.map(({ title, sections }) => (
          <TopSection
            title={title}
            key={title}
          >
            <SubSectionsList sections={sections} />
          </TopSection>
        ))}
      </NavWrap>
    </NavContext.Provider>
  )
}

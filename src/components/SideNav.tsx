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
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import styled, { useTheme } from 'styled-components'
import { useRouter } from 'next/router'
import { removeTrailingSlashes } from 'utils/text'
import { CaretRightIcon, usePrevious } from 'pluralsh-design-system'
import classNames from 'classnames'
import { animated, useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'
import { useInViewRef, useMergeRefs } from 'rooks'

import scrollIntoContainerView from 'utils/scrollIntoContainerView'

import { NavData, NavItem } from '../NavData'

export type SideNavProps = {
  navData: NavData
}

const NavContext = createContext<{
  optimisticPathname: null | string
  scrollRef: MutableRefObject<HTMLDivElement | null>
}>({
  optimisticPathname: null,
  scrollRef: { current: null },
})

const KeyboardNavContext = createContext<{
  keyboardNavigable: boolean
}>({
  keyboardNavigable: true,
})

const LinkA = styled.a(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.small,
  cursor: 'pointer',
  flexGrow: 1,
  margin: 0,
  padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
  ...theme.partials.marketingText.body2,
  textDecoration: 'none',
  color: theme.colors['text-light'],
  '&:focus, &:focus-visible': {
    outline: 'none',
    boxShadow: 'none',
  },
  '&:focus-visible::after': {
    borderStartStartRadius: theme.borderRadiuses.medium,
    borderEndStartRadius: theme.borderRadiuses.medium,
    ...theme.partials.focus.insetAbsolute,
  },
}))

type LinkBaseProps = Partial<ComponentProps<typeof Link>> & {
  icon?: ReactElement
}

const LinkBase = forwardRef<HTMLAnchorElement, LinkBaseProps>(({
  className, children, icon, href,
}, ref) => {
  const { keyboardNavigable } = useContext(KeyboardNavContext)
  const content = (
    <LinkA
      className={className}
      tabIndex={keyboardNavigable ? 0 : -1}
      ref={ref}
    >
      {icon && icon}
      {children}
    </LinkA>
  )

  if (href) {
    return (
      <Link
        href={href}
        passHref
      >
        {content}
      </Link>
    )
  }

  return content
})

const CaretButton = styled(({ isOpen = false, className, ...props }) => {
  const { keyboardNavigable } = useContext(KeyboardNavContext)

  return (
    <button
      tabIndex={keyboardNavigable ? 0 : -1}
      type="button"
      className={className}
      aria-label={isOpen ? 'Collapse' : 'Expand'}
      {...props}
    >
      <CaretRightIcon className="icon" />
    </button>
  )
})(({ theme, isOpen }) => ({
  ...theme.partials.reset.button,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: theme.spacing.large,
  paddingLeft: theme.spacing.medium,
  cursor: 'pointer',
  color: theme.colors['text-light'],
  transition: 'color 0.1s ease',
  position: 'relative',
  '&:focus-visible::before': {
    ...theme.partials.focus.insetAbsolute,
    borderRadius: theme.borderRadiuses.medium,
    top: theme.spacing.xsmall,
    left: theme.spacing.xsmall,
    right: theme.spacing.xsmall + theme.spacing.xsmall,
    bottom: theme.spacing.xsmall,
  },
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
  childIsSelected = false,
  onToggleOpen,
  icon,
  ...props
}: {
    isSubSection?: boolean
    isOpen?: boolean
    childIsSelected: boolean
    icon?: ReactElement
    onToggleOpen?: () => void
  } & Partial<ComponentProps<typeof Link>>) => {
  const href = useMemo(() => removeTrailingSlashes(props.href), [props.href])
  const { scrollRef, ...navContext } = useContext(NavContext)
  const optimisticPathname = removeTrailingSlashes(navContext.optimisticPathname)
  const isSelectedOptimistic = useMemo(() => optimisticPathname === href,
    [optimisticPathname, href])
  const [inViewRef, isInView] = useInViewRef(undefined, { threshold: [1, 1] })
  const eltRef = useRef<HTMLLIElement>(null)
  const ref = useMergeRefs(inViewRef, eltRef)
  const theme = useTheme()

  // Scroll into view gets interrupted by page transitions, so we only start
  // scrolling when the actual pathname changes instead of using optimisticPathname
  // like everything else
  const pathname = removeTrailingSlashes(useRouter().pathname)
  const isSelected = useMemo(() => pathname === href, [pathname, href])
  const wasSelected = usePrevious(isSelected)

  useEffect(() => {
    if (
      isSelected
        && !wasSelected
        && eltRef?.current
        && scrollRef?.current
        && !isInView
    ) {
      scrollIntoContainerView(eltRef.current, scrollRef.current, {
        behavior: 'smooth',
        block: 'start',
        blockOffset: theme.spacing.xlarge,
      })
        // eltRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [
    isInView,
    isSelected,
    wasSelected,
    scrollRef,
    eltRef,
    theme.spacing.xlarge,
  ])

  return (
    <li
      ref={ref}
      className={classNames(className, {
        selected: isSelectedOptimistic,
        selectedSecondary: childIsSelected && !isSelectedOptimistic,
      })}
    >
      <LinkBase
        icon={icon}
        ref={ref}
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
  position: 'relative',
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
  '&.selectedSecondary': {
    backgroundColor: theme.colors['fill-one-selected'],
    '&:hover': { backgroundColor: theme.colors['fill-one-selected'] },
  },
  '&.selected': {
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
    const pathname = useContext(NavContext).optimisticPathname

    return (
      <ul
        ref={ref}
        className={className}
      >
        {sections.map(subSection => {
          const defaultOpen = isPathnameInSections(pathname, [subSection])

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
  const isSelected = useMemo(() => pathname === removeTrailingSlashes(href),
    [pathname, href])

  useEffect(() => {
    if (
      prevPathname !== pathname
      && isPathnameInSections(pathname, [{ href, sections }])
    ) {
      setIsOpen(true)
    }
  }, [prevPathname, pathname, isSelected, href, sections])

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

  const contextValue = useMemo(() => ({ keyboardNavigable: isOpen }), [isOpen])

  return (
    <>
      <NavLink
        isSubSection={!!sections}
        href={href}
        icon={icon}
        isOpen={isOpen}
        childIsSelected={defaultOpen}
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
          <KeyboardNavContext.Provider value={contextValue}>
            <SubSectionsList
              sections={sections}
              ref={measureRef as unknown as MutableRefObject<any>}
              indentLevel={indentLevel}
            />
          </KeyboardNavContext.Provider>
        </animated.div>
      )}
    </>
  )
}
const navLeftOffset = 1000

const NavPositionWrapper = styled.nav(({ theme: _theme }) => ({
  position: 'sticky',
  height: 'calc(100vh - var(--top-nav-height))',
  top: 'var(--top-nav-height)',
  marginLeft: -navLeftOffset,
}))

const NavScrollContainer = styled.div(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflowY: 'auto',
  backgroundColor: theme.colors['fill-one'],
  borderRight: theme.borders['fill-one'],
  paddingBottom: theme.spacing.xlarge,
}))

const Nav = styled.nav(({ theme: _theme }) => ({
  marginLeft: navLeftOffset,
}))

export function SideNav({ navData, ...props }: SideNavProps) {
  const router = useRouter()
  const [optimisticPathname, setOptimisticPathname] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const contextValue = useMemo(() => ({
    scrollRef,
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
      <NavPositionWrapper
        aria-label="Main"
        {...props}
      >
        <NavScrollContainer ref={scrollRef}>
          <Nav>
            {navData.map(({ title, sections }) => (
              <TopSection
                title={title}
                key={title}
              >
                {sections && <SubSectionsList sections={sections} />}
              </TopSection>
            ))}
          </Nav>
        </NavScrollContainer>
      </NavPositionWrapper>
    </NavContext.Provider>
  )
}

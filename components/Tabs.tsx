import styled from 'styled-components'
import {
  Tab as TabComponent,
  TabList,
  TabListStateProps,
  TabPanel,
} from 'pluralsh-design-system'
import {
  Key,
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react'

// components/Tab.js

export const TabContext = createContext({})

export const TabPanelStyled = styled(TabPanel)(({ theme }) => ({
  borderBottom: theme.borders.default,
  marginBottom: theme.spacing.xxlarge,
  '> div': {
    marginTop: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
  },
}))

export function Tabs({
  titles,
  children,
}: {
  titles: string[]
  children: ReactNode
}) {
  const tabStateRef = useRef<any>()
  const [selectedKey, setSelectedKey] = useState<Key>(titles[0] || '')
  const tabListStateProps: TabListStateProps = {
    keyboardActivation: 'manual',
    orientation: 'horizontal',
    selectedKey,
    onSelectionChange: setSelectedKey,
  }

  return (
    <TabContext.Provider value={selectedKey}>
      <TabList
        stateRef={tabStateRef}
        stateProps={tabListStateProps}
        flexShrink={0}
      >
        {titles.map(title => (
          <TabComponent
            key={title}
            textValue={title}
          >
            {title}
          </TabComponent>
        ))}
      </TabList>
      <TabPanelStyled
        stateRef={tabStateRef}
        as={TabPanelStyled}
      >
        <div>{children}</div>
      </TabPanelStyled>
    </TabContext.Provider>
  )
}

export function Tab({ title, children }) {
  const currentTab = useContext(TabContext)

  if (title !== currentTab) {
    return null
  }

  return children
}

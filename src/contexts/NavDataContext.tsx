import { createContext, useContext } from 'react'

import { useRouter } from 'next/router'

import { isAppCatalogRoute } from '../utils/text'

import type { NavData } from '../NavData'

export const NavDataContext = createContext<NavData>({
  docs: [],
  appCatalog: [],
})
export const useNavMenu = () => {
  const navData = useContext(NavDataContext)
  const router = useRouter()

  return isAppCatalogRoute(router.asPath) ? navData.appCatalog : navData.docs
}

export const useNavData = () => useContext(NavDataContext)
export const NavDataProvider = NavDataContext.Provider

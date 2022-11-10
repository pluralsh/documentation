import { createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { NavData } from '../NavData'
import { isSubrouteOf } from '../utils/text'

export const NavDataContext = createContext<NavData>({
  docs: [],
  appCatalog: [],
})
export const useNavMenu = () => {
  const navData = useContext(NavDataContext)
  const router = useRouter()
  const isAppCatalogRoute = isSubrouteOf(router.asPath, '/repositories')

  return isAppCatalogRoute ? navData.appCatalog : navData.docs
}

export const useNavData = () => useContext(NavDataContext)
export const NavDataProvider = NavDataContext.Provider

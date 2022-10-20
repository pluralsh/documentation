import { createContext, useContext } from 'react'

export const FillLevelContext = createContext(0)
export const useFillLevel = () => useContext(FillLevelContext)

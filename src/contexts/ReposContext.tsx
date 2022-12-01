import { createContext, useContext } from 'react'

import type { Repo } from '../data/getRepos'

export type ReposContextT = any
export const ReposContext = createContext<Repo[]>([])
export const useRepos = () => useContext(ReposContext)
export const ReposProvider = ReposContext.Provider

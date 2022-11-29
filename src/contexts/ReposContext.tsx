import { createContext, useContext } from 'react'

import type { RepoFragmentFragment } from '../gql/graphql'

export type ReposContextT = any
export const ReposContext = createContext<RepoFragmentFragment[]>([])
export const useRepos = () => useContext(ReposContext)
export const ReposProvider = ReposContext.Provider

import { createContext, useContext } from 'react'

import type { FragmentType } from '../gql/fragment-masking'
import type { RepoFragment } from '../data/queries/recipesQueries'

export type ReposContextT = any
export const ReposContext = createContext<FragmentType<typeof RepoFragment>[]>([])
export const useRepos = () => useContext(ReposContext)
export const ReposProvider = ReposContext.Provider

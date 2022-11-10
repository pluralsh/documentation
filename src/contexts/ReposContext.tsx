import { createContext, useContext } from 'react'
import { RepoFragment } from '../queries/recipesQueries'

import { FragmentType } from '../gql/fragment-masking'

export type ReposContextT = any
export const ReposContext = createContext<FragmentType<typeof RepoFragment>[]>([])
export const useRepos = () => useContext(ReposContext)
export const ReposProvider = ReposContext.Provider

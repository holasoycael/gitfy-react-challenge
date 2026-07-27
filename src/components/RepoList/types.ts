// types and interfaces
import type { IGitHubRepo } from 'models/Github/repos/types'

export type TSortKey = 'stars-desc' | 'stars-asc' | 'name' | 'updated'

export type RepoListProps = {
  repos: IGitHubRepo[]
  username: string
  isLoading: boolean
  isError: boolean
}

// models
import type { IGitHubRepo } from 'models/Github/repos/types'

export type TSortKey = 'stars-desc' | 'stars-asc' | 'name' | 'updated'

export type RepoListProps = {
  username: string
}

export type FetchRepoListProps = {
  username: string
}

export type DataRepoListProps = {
  repos: IGitHubRepo[]
  username: string
}

export type ErrorRepoListProps = {
  username: string
  onRetry: () => void
}

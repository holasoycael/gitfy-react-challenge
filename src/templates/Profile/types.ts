// models
import type { IUser } from 'models/Users/$/types'
import type { IGitHubRepo } from 'models/Github/repos/types'

export type ProfileProps = {
  user?: string
}

export type FetchProfileProps = {
  username: string
}

export type DataProfileProps = {
  data: IUser
  repos: IGitHubRepo[]
  reposLoading: boolean
  reposError: boolean
}

export type ErrorProfileProps = {
  username: string
  onRetry: () => void
}

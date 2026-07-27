// types and interfaces
import type { IGitHubRepo } from 'models/Github/repos/types'

export type TRepositoryDetailData = {
  repo: IGitHubRepo
  readme: string | null
}

export type FetchRepositoryProps = {
  user: string
  repository: string
}

export type DataRepositoryProps = {
  data: TRepositoryDetailData
  user: string
}

export type ErrorRepositoryProps = {
  repository: string
  user: string
  onRetry?: () => void
}

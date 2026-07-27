// models
import type { IUser } from 'models/Users/$/types'

export type ProfileProps = {
  user?: string
}

export type FetchProfileProps = {
  username: string
}

export type DataProfileProps = {
  data: IUser
}

export type ErrorProfileProps = {
  username: string
  onRetry: () => void
}

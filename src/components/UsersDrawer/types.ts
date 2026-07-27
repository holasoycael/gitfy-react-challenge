// types and interfaces
import type { IUser } from 'models/Users/$/types'

export type UsersDrawerProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export type FetchProps = IUser[]

export type DataUsersDrawerProps = {
  data: FetchProps
}

export type FetchUsersDrawerProps = Record<string, never>

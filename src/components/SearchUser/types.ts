export type TRowUser = {
  username: string
  avatarUrl: string
}

export type SearchUserProps = {
  placeholder?: string
  onFetch: (query: string) => Promise<TRowUser[]>
  onSelect?: (user: TRowUser) => void
}

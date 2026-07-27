export type TItems = string[]

export type RecentUsersProps = {
  items: TItems
  onClick: (user: string) => void
  onOpen: () => void
}

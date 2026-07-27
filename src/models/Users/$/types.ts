export type UserProps = {
  isReady: boolean
  users: TUserMap
  add: (username: string, user: TUser) => void
  remove: (username: string) => void
  update: (username: string, user: TUser) => void
  clear: () => void
  setStateReady: () => void
}

export interface IUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  user_view_type: string
  site_admin: boolean
  name: string
  company: unknown
  blog: string
  location: string
  email: unknown
  hireable: unknown
  bio: string
  twitter_username: unknown
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export type TUser = Omit<IUser, 'login'>
export type TUserMap = Map<string, TUser>

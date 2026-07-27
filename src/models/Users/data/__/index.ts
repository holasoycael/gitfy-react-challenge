// types and interfaces
import type { TUser, IUser } from 'models/Users/$/types'

export default new (class {
  toArray(users: Map<string, TUser>): IUser[] {
    if (!users) return []

    return Array.from(users.entries()).map(([login, user]) => ({
      login,
      ...user
    }))
  }
})()

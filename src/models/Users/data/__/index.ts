// types and interfaces
import type { TLocalUser, ILocalUser } from 'models/Users/$/types'

export default new (class {
  toArray(users: Map<string, TLocalUser>): ILocalUser[] {
    if (!users) return []

    return Array.from(users.entries())
      .map(([login, user]) => ({
        login,
        ...user
      }))
      .sort((a, b) => (b.accessedAt || 0) - (a.accessedAt || 0))
  }
})()

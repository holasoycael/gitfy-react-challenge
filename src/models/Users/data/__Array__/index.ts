// types and interfaces
import type { TUserMap, ILocalUser } from '../../$/types'

export default new (class {
  getRecentLogins(usersMap: TUserMap, limit = 4): string[] {
    if (!usersMap || !usersMap.size) return []

    return Array.from(usersMap.entries())
      .sort(([, userA], [, userB]) => {
        const timeA = userA?.accessedAt ?? 0
        const timeB = userB?.accessedAt ?? 0
        return timeB - timeA
      })
      .slice(0, limit)
      .map(([login]) => login)
  }

  sortByAccessedAt(items: ILocalUser[]): ILocalUser[] {
    if (!items || !items.length) return []

    return [...items].sort((a, b) => (b.accessedAt ?? 0) - (a.accessedAt ?? 0))
  }
})()

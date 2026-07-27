import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createStore, get, set, del } from 'idb-keyval'

// types and interfaces
import type { UserProps, TUser } from './types'

const store = createStore('gitfy-db', 'zustand')

export const UserState = create<UserProps>()(
  persist(
    (set, get) => ({
      isReady: false,
      users: new Map<string, TUser>(),
      add: (username: string, user: TUser) => {
        const { users } = get()

        const updatedUsers = new Map(users)
        updatedUsers.set(username, user)

        set({ users: updatedUsers })
      },
      remove: (username: string) => {
        const { users } = get()

        const updatedUsers = new Map(users)
        updatedUsers.delete(username)

        set({ users: updatedUsers })
      },
      update: (username: string, user: TUser) => {
        const { users } = get()

        const updatedUsers = new Map(users)
        updatedUsers.set(username, user)

        set({ users: updatedUsers })
      },
      clear: () => {
        set({ users: new Map<string, TUser>() })
      },
      setStateReady: () => {
        set({ isReady: true })
      }
    }),
    {
      name: 'users',
      storage: {
        getItem: async (name: string) => {
          if (!store) return null
          return (await get(name, store)) ?? null
        },

        setItem: async (name: string, value: unknown) => {
          if (!store) return
          await set(name, value, store)
        },

        removeItem: async (name: string) => {
          if (!store) return
          await del(name, store)
        }
      },

      partialize: (state) => ({
        users: state.users
      }),

      onRehydrateStorage: () => {
        return (state, error) => {
          if (!error && typeof state?.setStateReady === 'function') {
            state.setStateReady()
          }
        }
      }
    }
  )
)

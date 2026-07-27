import { useNavigate } from 'react-router'
import SimpleBar from 'simplebar-react'

// contexts
import { IsOpenCartContext } from 'contexts/App'

// models
import GitHub from 'models/Github'
import Users from 'models/Users'

// components JSX
import Atmosphere from 'components/Atmosphere'
import GlowTop from 'components/GlowTop'
import GlowBottom from 'components/GlowBottom'
import SearchUser from 'components/SearchUser'
import RecentUsers from 'components/RecentUsers'

// types and interfaces
import type { TRowUser } from 'components/SearchUser/types'

const Home = () => {
  const navigate = useNavigate()

  const { users } = Users.$.UserState()

  const { setIsOpenCart } = IsOpenCartContext()

  const onSelect = (user: TRowUser) => navigate(`/${user.username}`)
  const onFetch = async (query: string) => {
    const data = await GitHub.search.fetchByQuery(query, 3)

    return data.map((user) => ({
      username: user.login,
      avatarUrl: user.avatar_url
    }))
  }

  const onClick = (username: string) => navigate(`/${username}`)
  const onOpen = () => setIsOpenCart(true)
  const items = Users.data.__Array__.getRecentLogins(users, 4)

  return (
    <SimpleBar className="h-full">
      <main className="dark flex flex-col min-h-screen items-center justify-center h-full">
        <Atmosphere />

        <div className="flex flex-col space-y-8 w-full max-w-md xs:pt-10 max-sm:items-center">
          <div className="flex flex-col items-center space-y-4 relative z-1">
            <div className="flex">
              <img
                src="/brandtext__gw.svg"
                width="222"
                alt="Gitfy"
                className="pointer-events-none touch-none max-xs:max-w-[40vw]"
              />
            </div>
            <div className="flex flex-col items-center space-y-2 max-sm:flex max-sm:justify-center">
              <span className="dark:text-white text-black text-2xl font-centrale-sans">Explore GitHub</span>

              <span className="dark:text-white/70 text-black text-sm font-extralight text-center max-w-[calc(100vw-32px)]">
                Search for any GitHub developer and explore repositories, stars, languages and project details.
              </span>
            </div>
          </div>

          <GlowTop zIndex={-1} />
          <GlowBottom zIndex={-1} />

          <div className="flex flex-col gap-6 w-full max-w-[calc(100vw-32px)]">
            <SearchUser onFetch={onFetch} onSelect={onSelect} placeholder="Buscar GitHub username..." />
            <RecentUsers items={items} onClick={onClick} onOpen={onOpen} />
          </div>
        </div>

        <footer className="w-full py-6 text-center fixed max-sm:relative sm:bottom-2 left-1/2 -translate-x-1/2 max-sm:flex max-sm:justify-center">
          <p className="text-xs font-extralight text-gray-400 max-w-[calc(100vw-32px)]">
            Built with Vite.js, React, Tailwind and the{' '}
            <a
              href="https://docs.github.com/en/rest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70"
            >
              GitHub API
            </a>
            .
          </p>
        </footer>
      </main>
    </SimpleBar>
  )
}

export default Home

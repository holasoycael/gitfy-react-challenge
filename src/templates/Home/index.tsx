// import { useNavigate } from 'react-router'

// components JSX
import Atmosphere from 'components/Atmosphere'
import GlowTop from 'components/GlowTop'
import GlowBottom from 'components/GlowBottom'
import SearchUser from 'components/SearchUser'

// types and interfaces
import type { TRowUser } from 'components/SearchUser/types'

// models
import GitHub from 'models/Github'

const Home = () => {
  // const navigate = useNavigate()

  const onSelect = (user: TRowUser) => {
    // navigate(`/user/${user.login}`)
    console.log(user)
  }

  const onFetch = async (query: string) => {
    const data = await GitHub.search.fetchByQuery(query, 5)

    return data.map((user) => ({
      username: user.login,
      avatarUrl: user.avatar_url
    }))
  }

  return (
    <main className="dark flex flex-col min-h-screen items-center justify-center">
      <Atmosphere />

      <div className="flex flex-col space-y-8 w-full max-w-md">
        <div className="flex flex-col items-center space-y-6 relative z-1">
          <div className="flex">
            <img src="/brandtext__gw.svg" width="222" alt="Gitfy" className="pointer-events-none touch-none" />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="dark:text-white text-black text-2xl font-(--font-centrale-sans)">Explore GitHub</span>
            <span className="dark:text-white/70 text-black text-sm font-extralight text-center max-w-sm">
              Search for any GitHub developer and explore repositories, stars, languages and project details.
            </span>
          </div>
        </div>

        <GlowTop />
        <GlowBottom />

        <div className="flex flex-col gap-2">
          <SearchUser onFetch={onFetch} onSelect={onSelect} placeholder="Buscar GitHub username..." />
        </div>
      </div>

      <footer className="w-full py-6 text-center fixed bottom-2 left-1/2 -translate-x-1/2">
        <p className="text-xs font-extralight text-gray-400">
          Built with Vite.js, React, Tailwind and the{' '}
          <a href="https://docs.github.com/en/rest" target="_blank" rel="noopener noreferrer" className="text-white/70">
            GitHub API
          </a>
          .
        </p>
      </footer>
    </main>
  )
}

export default Home

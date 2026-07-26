// heroui
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'

// components JSX
import Atmosphere from 'components/Atmosphere'

// icons lucide
import { Search as IconSearch } from 'lucide-react'

const Home = () => {
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

        <div
          className="pointer-events-none"
          style={{
            background:
              'radial-gradient(48.78087172574147% 48.780871725741484% at 52.26579732061952% 52.311511675873824%, rgba(31,183,107, 0.35), rgba(0,0,0,0))',
            flex: 'none',
            height: '726px',
            left: 'calc(50.00000000000002% - 345px / 2)',
            position: 'absolute',
            top: '-328px',
            userSelect: 'none',
            width: '345px',
            zIndex: -1,
            animation: 'glow-drift-top 22s ease-in-out infinite',
            willChange: 'transform, opacity'
          }}
        />

        <div
          className="pointer-events-none"
          style={{
            background:
              'radial-gradient(48.78087172574147% 48.780871725741484% at 52.26579732061952% 52.311511675873824%, rgba(31,183,107, 0.25), rgba(0,0,0,0))',
            flex: 'none',
            height: '726px',
            left: 'calc(50.00000000000002% - 345px / 2)',
            position: 'absolute',
            bottom: -481,
            userSelect: 'none',
            width: '345px',
            zIndex: -1,
            animation: 'glow-drift-bottom 26s ease-in-out infinite',
            willChange: 'transform, opacity'
          }}
        />

        <div className="flex flex-col gap-2">
          <Input
            size="lg"
            variant="bordered"
            placeholder="Buscar GitHub username..."
            startContent={
              <div>
                <IconSearch size={18} />
              </div>
            }
            endContent={
              <Button
                color="primary"
                size="sm"
                variant="shadow"
                startContent={
                  <div>
                    <IconSearch size={16} />
                  </div>
                }
                className="px-5"
              >
                <span className="leading-3.5!">Buscar</span>
              </Button>
            }
            classNames={{
              mainWrapper: 'w-full',
              inputWrapper: 'pr-1.5',
              input: 'placeholder:text-sm placeholder:text-white/60 placeholder:font-extralight'
            }}
          />
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

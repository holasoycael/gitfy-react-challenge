import { MemoryRouter } from 'react-router'

// heroui
import { HeroUIProvider } from '@heroui/react'

// styles
import 'styles/index.css'

// types and interfaces
import type { AppProps } from './types'

export const App = ({ children }: AppProps) => {
  return (
    <MemoryRouter>
      <HeroUIProvider>{children}</HeroUIProvider>
    </MemoryRouter>
  )
}

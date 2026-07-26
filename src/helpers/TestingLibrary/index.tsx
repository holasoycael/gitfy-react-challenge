import React from 'react'
import { render } from '@testing-library/react'
import { HeroUIProvider } from '@heroui/react'

// types and interfaces
import type { RenderResult } from '@testing-library/react'

// types and interfaces
import type { AppProps } from './types'

export const App = ({ children }: AppProps) => {
  return <>{children}</>
}

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<HeroUIProvider>{children}</HeroUIProvider>)

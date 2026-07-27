import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// types and interfaces
import type { ReactNode } from 'react'

Object.assign(global, { TextEncoder, TextDecoder })

const originalGetComputedStyle = window.getComputedStyle
window.getComputedStyle = (elt) => originalGetComputedStyle(elt)

jest.mock('idb-keyval', () => ({
  createStore: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn()
}))

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  domAnimation: Promise.resolve({ default: {} }),
  LazyMotion: ({ children }: { children: ReactNode }) => children
}))

jest.mock('react-markdown', () => {
  return function DummyReactMarkdown({ children }: { children: ReactNode }) {
    const content = typeof children === 'string' ? children.replace(/^#+\s*/, '') : children
    return <div>{content}</div>
  }
})

jest.mock('remark-gfm', () => () => {})

jest.mock('react-syntax-highlighter', () => ({
  Prism: ({ children }: { children: ReactNode }) => <pre>{children}</pre>
}))

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  oneDark: {}
}))

jest.mock('utils/env', () => ({
  __esModule: true,
  default: {
    GITHUB_API: 'https://api.github.com'
  }
}))

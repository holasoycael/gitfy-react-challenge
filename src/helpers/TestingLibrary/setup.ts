import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

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
  LazyMotion: ({ children }: { children: React.ReactNode }) => children
}))

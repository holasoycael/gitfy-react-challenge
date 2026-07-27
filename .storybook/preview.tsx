// global css
import 'simplebar-react/dist/simplebar.min.css'
import 'styles/index.css'

// types and interfaces
import type { Preview } from '@storybook/react-webpack5'

// Workaround for Storybook focus instrumentation conflict with @react-aria / HeroUI
if (typeof window !== 'undefined' && HTMLElement?.prototype) {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus')
  if (descriptor?.get) {
    try {
      const tempElement = document.createElement('div')
      const nativeFocus = descriptor.get.call(tempElement)
      if (typeof nativeFocus === 'function') {
        Object.defineProperty(HTMLElement.prototype, 'focus', {
          value: nativeFocus,
          writable: true,
          configurable: true
        })
      }
    } catch {
      // ignore
    }
  }
}

const preview: Preview = {
  decorators: [(Story) => <Story />]
}

export default preview

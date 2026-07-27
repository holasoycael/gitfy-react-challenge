// styles
import 'simplebar-react/dist/simplebar.min.css'
import 'styles/index.css'

// types and interfaces
import type { Preview } from '@storybook/react-webpack5'

// Workaround for Storybook focus instrumentation conflict with @react-aria / HeroUI
const nativeElementFocus =
  typeof window !== 'undefined' && typeof HTMLElement !== 'undefined'
    ? HTMLInputElement.prototype.focus || HTMLElement.prototype.focus
    : null

const fixFocusInstrumentation = () => {
  if (typeof window === 'undefined' || typeof HTMLElement === 'undefined' || !nativeElementFocus) return

  try {
    const currentDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus')

    if (
      currentDescriptor &&
      'get' in currentDescriptor &&
      (currentDescriptor.get as { __isSafeFocus?: boolean })?.__isSafeFocus
    ) {
      return
    }

    const safeFocusFunction = function (this: unknown, options?: FocusOptions) {
      if (this && this instanceof Node) {
        try {
          return nativeElementFocus.call(this, options)
        } catch {
          // ignore
        }
      }
    }

    const getter = function () {
      return safeFocusFunction
    }
    Object.defineProperty(getter, '__isSafeFocus', { value: true, writable: false })

    Object.defineProperty(HTMLElement.prototype, 'focus', {
      get: getter,
      set() {
        // Prevent Storybook instrumenter from overriding the focus getter on story transitions
      },
      configurable: true
    })
  } catch {
    // ignore
  }
}

fixFocusInstrumentation()

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true
    }
  },
  decorators: [
    (Story) => {
      fixFocusInstrumentation()
      return <Story />
    }
  ]
}

export default preview

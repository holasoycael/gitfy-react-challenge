// heroui
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from '@heroui/toast'

// types and interfaces
import type { Preview } from '@storybook/react-webpack5'

const preview: Preview = {
  decorators: [
    (Story) => (
      <HeroUIProvider>
        <ToastProvider />
        <Story />
      </HeroUIProvider>
    )
  ]
}

export default preview

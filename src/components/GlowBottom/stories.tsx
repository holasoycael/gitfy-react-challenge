// helpers
import { App } from 'helpers/Storybook'

// components JSX
import GlowBottom from '.'

// external libraries
import { expect, within } from 'storybook/test'

// types and interfaces
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/GlowBottom',
  component: GlowBottom,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div className="relative h-screen w-full overflow-hidden bg-[#0d1117]">
        <App>
          <Story />
        </App>
      </div>
    )
  ],
  argTypes: {
    color: { control: 'color' },
    opacity: { control: { type: 'number', min: 0, max: 1, step: 0.01 } }
  }
} as Meta<typeof GlowBottom>

export const Default: StoryObj<typeof GlowBottom> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('glow-bottom__container')).toBeInTheDocument()
  }
}

export const CustomColor: StoryObj<typeof GlowBottom> = {
  args: {
    color: '#00e5ff',
    opacity: 0.4
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('glow-bottom__container')).toBeInTheDocument()
  }
}

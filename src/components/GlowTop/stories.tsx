// helpers
import { App } from 'helpers/Storybook'

// components JSX
import GlowTop from '.'

// external libraries
import { expect, within } from 'storybook/test'

// types and interfaces
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/GlowTop',
  component: GlowTop,
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
} as Meta<typeof GlowTop>

export const Default: StoryObj<typeof GlowTop> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('glow-top__container')).toBeInTheDocument()
  }
}

export const CustomColor: StoryObj<typeof GlowTop> = {
  args: {
    color: '#aa3bff',
    opacity: 0.5
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('glow-top__container')).toBeInTheDocument()
  }
}

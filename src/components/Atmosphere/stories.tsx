// helpers
import { App } from 'helpers/Storybook'

// components JSX
import Atmosphere from '.'

// external libraries
import { expect, within } from 'storybook/test'

// types and interfaces
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/Atmosphere',
  component: Atmosphere,
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
    radialColor: { control: 'color' },
    radialOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.01 } },
    gridColor: { control: 'color' },
    gridOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.01 } },
    dotColor: { control: 'color' },
    dotOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.01 } },
    noiseOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.01 } }
  }
} as Meta<typeof Atmosphere>

export const Default: StoryObj<typeof Atmosphere> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('atmosphere__container')).toBeInTheDocument()
  }
}

export const CustomColors: StoryObj<typeof Atmosphere> = {
  args: {
    radialColor: '#ff0055',
    radialOpacity: 0.25,
    gridColor: '#00e5ff',
    gridOpacity: 0.05,
    dotColor: '#a855f7',
    dotOpacity: 0.2,
    noiseOpacity: 0.04
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('atmosphere__container')).toBeInTheDocument()
  }
}

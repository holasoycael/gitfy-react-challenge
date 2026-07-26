// external libraries
import { expect, within } from 'storybook/test'

// components JSX
import Main from '.'

// types and interfaces
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/Main',
  component: Main,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta<typeof Main>

export const Default: StoryObj<typeof Main> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('heading', { name: /Main/i })).toBeInTheDocument()
  }
}

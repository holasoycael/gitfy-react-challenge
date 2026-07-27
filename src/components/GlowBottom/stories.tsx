import { expect, within } from 'storybook/test'

// helpers
import { App } from 'helpers/Storybook'

// components JSX
import GlowBottom from '.'

// types and interfaces
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/GlowBottom',
  component: GlowBottom,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Componente visual de iluminação e brilho radial posicionado na borda inferior da tela, criando profundidade visual.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="bg-[#0d1117] min-h-screen w-full flex flex-col justify-between">
        <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
          <App>
            <Story />
          </App>
          <div className="z-10 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md max-w-sm text-center">
            <h3 className="text-lg font-medium text-white font-centrale-sans">Glow Bottom</h3>
            <p className="text-xs text-white/70 mt-1 font-extralight">Bottom background radial glow element.</p>
          </div>
        </div>
      </div>
    )
  ],
  argTypes: {
    color: {
      description: 'Cor hexadecimal ou CSS do gradiente de iluminação inferior.',
      control: 'color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#1fb76b' }
      }
    },
    opacity: {
      description: 'Opacidade da iluminação radial inferior (valor entre 0 e 1).',
      control: { type: 'number', min: 0, max: 1, step: 0.01 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.25' }
      }
    },
    zIndex: {
      description: 'Nível de empilhamento z-index do elemento de brilho na página.',
      control: { type: 'number', min: 0, max: 10, step: 1 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' }
      }
    }
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
    opacity: 0.4,
    zIndex: 2
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('glow-bottom__container')).toBeInTheDocument()
  }
}

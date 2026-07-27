import { expect, within } from 'storybook/test'

// helpers
import { App } from 'helpers/Storybook'

// components JSX
import Atmosphere from '.'

// types and interfaces
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/Atmosphere',
  component: Atmosphere,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Componente de efeito atmosférico de fundo com iluminação radial, grade suave, padrão de pontos e textura de ruído sintético.'
      }
    }
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
    radialColor: {
      description: 'Cor hexadecimal ou CSS da luz radial centralizada no topo.',
      control: 'color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#388bfd' }
      }
    },
    radialOpacity: {
      description: 'Opacidade da luz radial superior (valor entre 0 e 1).',
      control: { type: 'number', min: 0, max: 1, step: 0.01 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.15' }
      }
    },
    gridColor: {
      description: 'Cor das linhas que compõem a grade sutil de fundo.',
      control: 'color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#e6edf3' }
      }
    },
    gridOpacity: {
      description: 'Opacidade das linhas da grade de fundo (valor entre 0 e 1).',
      control: { type: 'number', min: 0, max: 1, step: 0.01 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.03' }
      }
    },
    dotColor: {
      description: 'Cor dos pontos no padrão pontilhado de fundo.',
      control: 'color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#7d8590' }
      }
    },
    dotOpacity: {
      description: 'Opacidade dos pontos do padrão pontilhado (valor entre 0 e 1).',
      control: { type: 'number', min: 0, max: 1, step: 0.01 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.12' }
      }
    },
    noiseOpacity: {
      description: 'Opacidade da textura de ruído granulado sobreposta (valor entre 0 e 1).',
      control: { type: 'number', min: 0, max: 1, step: 0.01 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.025' }
      }
    }
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

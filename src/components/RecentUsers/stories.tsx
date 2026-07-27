import { expect, within, fn } from 'storybook/test'

// helpers
import { App } from 'helpers/Storybook'

// models
import Users from 'models/Users'

// components JSX
import RecentUsers from '.'

// mock
import mock from './mock'

// types and interfaces
import type { Meta, StoryObj } from '@storybook/react'

const mockItems = Users.data.__Array__.getRecentLogins(mock, 4)

export default {
  title: 'Components/RecentUsers',
  component: RecentUsers,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Componente de usuários buscados recentemente, exibindo até 4 badges interativas ordenadas pela data de acesso.'
      }
    }
  },
  argTypes: {
    items: {
      description:
        'Lista de usernames dos usuários buscados recentemente. Caso a lista esteja vazia, exibe sugestões padrão.',
      control: 'object',
      table: {
        type: { summary: 'string[]' }
      }
    },
    onClick: {
      action: 'onClick',
      description: 'Callback disparado ao clicar na badge de um usuário recente para carregar seus dados.',
      table: {
        type: { summary: '(user: string) => void' }
      }
    },
    onOpen: {
      action: 'onOpen',
      description: 'Callback disparado ao clicar no botão "Ver todos buscados" para exibir o histórico completo.',
      table: {
        type: { summary: '() => void' }
      }
    }
  },
  args: {
    items: mockItems,
    onClick: fn(),
    onOpen: fn()
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117] text-white p-8">
        <div className="w-full max-w-md">
          <App>
            <Story />
          </App>
        </div>
      </div>
    )
  ]
} as Meta<typeof RecentUsers>

export const Default: StoryObj<typeof RecentUsers> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('recent-users__wrapper')).toBeInTheDocument()
    await expect(canvas.getByTestId('recent-users__item--linuxmint')).toBeInTheDocument()
  }
}

export const EmptyState: StoryObj<typeof RecentUsers> = {
  args: {
    items: []
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('recent-users__wrapper')).toBeInTheDocument()
    const button = canvas.getByTestId('recent-users__button--open')
    await expect(button).toBeDisabled()
  }
}

export const FilteredToFour: StoryObj<typeof RecentUsers> = {
  args: {
    items: ['recent1', 'recent2', 'recent3', 'recent4', 'recent5', 'recent6']
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('recent-users__item--recent1')).toBeInTheDocument()
    await expect(canvas.getByTestId('recent-users__item--recent4')).toBeInTheDocument()
    await expect(canvas.queryByTestId('recent-users__item--recent5')).not.toBeInTheDocument()
  }
}

export const SortedByAccessTime: StoryObj<typeof RecentUsers> = {
  render: (args) => {
    const recentLogins = Users.data.__Array__.getRecentLogins(mock, 4)

    return <RecentUsers {...args} items={recentLogins} />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('recent-users__item--linuxmint')).toBeInTheDocument()
    await expect(canvas.getByTestId('recent-users__item--dgobatista')).toBeInTheDocument()
    await expect(canvas.getByTestId('recent-users__item--holasoycael')).toBeInTheDocument()
    await expect(canvas.getByTestId('recent-users__item--ayrtonteshima')).toBeInTheDocument()
    await expect(canvas.queryByTestId('recent-users__item--diego3g')).not.toBeInTheDocument()
  }
}

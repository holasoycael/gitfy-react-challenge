import { expect, within, userEvent, fn } from 'storybook/test'

// helpers
import { App } from 'helpers/Storybook'

// components JSX
import SearchUser from '.'

// models
import GitHub from 'models/Github'

// types and interfaces
import type { Meta, StoryObj } from '@storybook/react'

const onFetch = async (query: string) => {
  const data = await GitHub.search.fetchByQuery(query, 5)

  return data.map((user) => ({
    username: user.login,
    avatarUrl: user.avatar_url
  }))
}

export default {
  title: 'Components/SearchUser',
  component: SearchUser,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de busca assíncrona de usuários do GitHub com autopreenchimento, navegação por teclado e integração com a camada de domínio User.'
      }
    }
  },
  argTypes: {
    onSelect: {
      action: 'onSelect',
      description: 'Callback executado ao selecionar um usuário na lista de resultados.',
      table: {
        type: { summary: '(user: TRowUser) => void' }
      }
    }
  },
  args: {
    placeholder: 'Buscar GitHub username...',
    onFetch,
    onSelect: fn()
  },
  decorators: [
    (Story) => (
      <div className="relative w-120 min-h-75 bg-[#0d1117] p-8 rounded-xl border border-white/10">
        <App>
          <Story />
        </App>
      </div>
    )
  ]
} as Meta<typeof SearchUser>

export const Default: StoryObj<typeof SearchUser> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('search-user__container')).toBeInTheDocument()
    await expect(canvas.getByPlaceholderText('Buscar GitHub username...')).toBeInTheDocument()
  }
}

export const TypingInteraction: StoryObj<typeof SearchUser> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Buscar GitHub username...')

    await userEvent.type(input, 'holasoycael')
    await expect(input).toHaveValue('holasoycael')
  }
}

export const KeyboardNavigation: StoryObj<typeof SearchUser> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Buscar GitHub username...')

    await userEvent.type(input, 'holasoycael')
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Escape}')

    await expect(input).toHaveValue('holasoycael')
  }
}

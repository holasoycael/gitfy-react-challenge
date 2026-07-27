import { expect, within } from 'storybook/test'
import SimpleBar from 'simplebar-react'

// helpers
import { App } from 'helpers/Storybook'

// components JSX
import ProfileCard from '.'

// mock
import mockUser from './mock'

// types and interfaces
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Componente de exibição de informações detalhadas do perfil de usuário do GitHub na barra lateral (avatar, nome, métricas e links sociais).'
      }
    }
  },
  argTypes: {
    data: {
      description:
        'Objeto contendo todas as informações do perfil do usuário retornado da API do GitHub (avatar_url, name, login, bio, followers, following, location, company, email, blog, html_url).',
      control: 'object',
      table: {
        type: { summary: 'IUser' }
      }
    }
  },
  args: {
    data: mockUser
  },
  decorators: [
    (Story) => (
      <SimpleBar className="w-full h-screen bg-[#0d1117] text-white">
        <div className="p-8 flex justify-center items-start min-h-screen">
          <div className="w-80">
            <App>
              <Story />
            </App>
          </div>
        </div>
      </SimpleBar>
    )
  ]
} as Meta<typeof ProfileCard>

export const Default: StoryObj<typeof ProfileCard> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('profile-card')).toBeInTheDocument()
    await expect(canvas.getByTestId('profile-card__name')).toHaveTextContent('Natanael Lourenço')
    await expect(canvas.getByTestId('profile-card__login')).toHaveTextContent('holasoycael')
    await expect(canvas.getByTestId('profile-card__bio')).toHaveTextContent('Full Stack Developer')
  }
}

export const MinimalUser: StoryObj<typeof ProfileCard> = {
  args: {
    data: {
      ...mockUser,
      bio: '',
      location: '',
      company: null,
      email: null,
      blog: ''
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('profile-card')).toBeInTheDocument()
    await expect(canvas.getByTestId('profile-card__name')).toHaveTextContent('Natanael Lourenço')
  }
}

import { expect, userEvent, within } from 'storybook/test'
import SimpleBar from 'simplebar-react'

// helpers
import { App } from 'helpers/Storybook'

// components JSX
import RepoList from '.'
import DataRepoList from './data'
import SkeletonRepoList from './skeleton'
import ErrorRepoList from './error'

// mock
import mockRepos from './mock'

// types and interfaces
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/RepoList',
  component: RepoList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Componente de listagem de repositórios públicos do GitHub com suporte a ordenação dinâmica por estrelas, nome e atualização recente.'
      }
    }
  },
  argTypes: {
    username: {
      description: 'Nome de usuário do GitHub cujos repositórios públicos são exibidos.',
      control: 'text',
      table: {
        type: { summary: 'string' }
      }
    },
    repos: {
      description:
        'Lista de repositórios contendo metadados como nome, linguagem, contagem de estrelas, forks e data de atualização.',
      control: 'object',
      table: {
        type: { summary: 'IGitHubRepo[]' }
      }
    },
    onRetry: {
      action: 'onRetry',
      description: 'Callback acionado para tentar recarregar os dados do usuário em caso de erro.',
      table: {
        type: { summary: '() => void' }
      }
    }
  },
  args: {
    username: 'holasoycael'
  },
  decorators: [
    (Story) => (
      <SimpleBar className="w-full h-screen bg-[#0d1117] text-white">
        <div className="p-8 max-w-3xl mx-auto">
          <App>
            <Story />
          </App>
        </div>
      </SimpleBar>
    )
  ]
} as Meta<typeof RepoList>

export const DataState: StoryObj<typeof DataRepoList> = {
  render: (args) => <DataRepoList repos={args.repos || mockRepos} username={args.username || 'holasoycael'} />,
  args: {
    repos: mockRepos,
    username: 'holasoycael'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('repo-list')).toBeInTheDocument()
    await expect(canvas.getByTestId('repo-list__header')).toBeInTheDocument()
    await expect(canvas.getByText('gitfy-react-challenge')).toBeInTheDocument()
  }
}

export const SortingInteraction: StoryObj<typeof DataRepoList> = {
  render: (args) => <DataRepoList repos={args.repos || mockRepos} username={args.username || 'holasoycael'} />,
  args: {
    repos: mockRepos,
    username: 'holasoycael'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selectTrigger = canvas.getByTestId('repo-list__select--sort')
    await userEvent.click(selectTrigger)
  }
}

export const EmptyState: StoryObj<typeof DataRepoList> = {
  render: (args) => <DataRepoList repos={[]} username={args.username || 'holasoycael'} />,
  args: {
    repos: [],
    username: 'holasoycael'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('repo-list__empty-state')).toBeInTheDocument()
    await expect(canvas.getByText('Nenhum repositório público.')).toBeInTheDocument()
  }
}

export const SkeletonState: StoryObj<typeof SkeletonRepoList> = {
  render: () => <SkeletonRepoList />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('repo-list__skeleton')).toBeInTheDocument()
  }
}

export const ErrorState: StoryObj<typeof ErrorRepoList> = {
  render: (args) => <ErrorRepoList username={args.username || 'holasoycael'} onRetry={args.onRetry || (() => {})} />,
  args: {
    username: 'holasoycael'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('repo-list__error')).toBeInTheDocument()
    await expect(canvas.getByText('Não foi possível carregar os repositórios')).toBeInTheDocument()
  }
}

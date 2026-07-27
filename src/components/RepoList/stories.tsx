import { expect, within, userEvent } from 'storybook/test'
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
          'Componente de listagem de repositórios públicos do GitHub com suporte a ordenação por estrelas, nome e atualização.'
      }
    }
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
  render: () => <DataRepoList repos={mockRepos} username="holasoycael" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('repo-list')).toBeInTheDocument()
    await expect(canvas.getByTestId('repo-list__header')).toBeInTheDocument()
    await expect(canvas.getByText('gitfy-react-challenge')).toBeInTheDocument()
  }
}

export const SortingInteraction: StoryObj<typeof DataRepoList> = {
  render: () => <DataRepoList repos={mockRepos} username="holasoycael" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selectTrigger = canvas.getByTestId('repo-list__select--sort')
    await userEvent.click(selectTrigger)
  }
}

export const EmptyState: StoryObj<typeof DataRepoList> = {
  render: () => <DataRepoList repos={[]} username="holasoycael" />,
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
  render: () => <ErrorRepoList username="holasoycael" onRetry={() => {}} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('repo-list__error')).toBeInTheDocument()
    await expect(canvas.getByText('Não foi possível carregar os repositórios')).toBeInTheDocument()
  }
}

import { screen, fireEvent } from '@testing-library/react'

// helpers
import { renderWithTheme } from 'helpers/TestingLibrary'

// components JSX
import DataRepoList from './data'
import SkeletonRepoList from './skeleton'
import ErrorRepoList from './error'

// mock
import mockRepos from './mock'

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn()
}))

describe('<RepoList /> components', () => {
  it('should render Skeleton repo list state', () => {
    renderWithTheme(<SkeletonRepoList />)
    expect(screen.getByTestId('repo-list__skeleton')).toBeInTheDocument()
  })

  it('should render Error repo list state and trigger onRetry callback', () => {
    const handleRetry = jest.fn()
    renderWithTheme(<ErrorRepoList username="holasoycael" onRetry={handleRetry} />)

    expect(screen.getByTestId('repo-list__error')).toBeInTheDocument()
    expect(screen.getByText(/holasoycael/i)).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('repo-list__button--retry'))
    expect(handleRetry).toHaveBeenCalledTimes(1)
  })

  it('should render Data repo list with items and repository count', () => {
    renderWithTheme(<DataRepoList repos={mockRepos} username="holasoycael" />)

    expect(screen.getByTestId('repo-list')).toBeInTheDocument()
    expect(screen.getByTestId('repo-list__header')).toBeInTheDocument()
    expect(screen.getByText('(3)')).toBeInTheDocument()
    expect(screen.getByText('gitfy-react-challenge')).toBeInTheDocument()
    expect(screen.getByText('make-currency')).toBeInTheDocument()
    expect(screen.getByText('gltf-react-three')).toBeInTheDocument()
  })

  it('should render empty state when repositories array is empty', () => {
    renderWithTheme(<DataRepoList repos={[]} username="holasoycael" />)

    expect(screen.getByTestId('repo-list__empty-state')).toBeInTheDocument()
    expect(screen.getByText('Nenhum repositório público.')).toBeInTheDocument()
  })
})

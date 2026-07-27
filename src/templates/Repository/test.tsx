import { render, screen, fireEvent } from '@testing-library/react'

// components JSX
import DataRepository from './data'
import SkeletonRepository from './skeleton'
import ErrorRepository from './error'

// mock
import mockRepositoryData from './mock'

const mockNavigate = jest.fn()

jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  )
}))

describe('<Repository /> components', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render Skeleton repository state', () => {
    render(<SkeletonRepository />)
    expect(screen.getByTestId('repository__skeleton')).toBeInTheDocument()
  })

  it('should render Error repository state and handle retry and back clicks', () => {
    const handleRetry = jest.fn()
    render(<ErrorRepository repository="non-existent" user="holasoycael" onRetry={handleRetry} />)

    expect(screen.getByTestId('repository__error')).toBeInTheDocument()
    expect(screen.getByTestId('repository__error-description')).toHaveTextContent('non-existent')

    fireEvent.click(screen.getByTestId('repository__button--retry'))
    expect(handleRetry).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByTestId('repository__button--back-error'))
    expect(mockNavigate).toHaveBeenCalledWith('/holasoycael')
  })

  it('should render Data repository state with repository information and readme', () => {
    render(<DataRepository data={mockRepositoryData} user="holasoycael" />)

    expect(screen.getByTestId('repository__data')).toBeInTheDocument()
    expect(screen.getByTestId('repository__name')).toHaveTextContent('gitfy-react-challenge')
    expect(screen.getByTestId('repository__description')).toHaveTextContent(
      'Um desafio incrível em React e TypeScript para buscas no GitHub.'
    )
    expect(screen.getByTestId('repository__chip--stars')).toHaveTextContent('42')
    expect(screen.getByTestId('repository__chip--language')).toHaveTextContent('TypeScript')
    expect(screen.getByTestId('repository__button--github')).toHaveAttribute(
      'href',
      'https://github.com/holasoycael/gitfy-react-challenge'
    )
    expect(screen.getByTestId('repository__readme')).toHaveTextContent('Bem-vindo ao repositório de teste!')
  })

  it('should render empty readme message when readme is null', () => {
    const dataWithoutReadme = {
      ...mockRepositoryData,
      readme: null
    }

    render(<DataRepository data={dataWithoutReadme} user="holasoycael" />)

    expect(screen.getByTestId('repository__readme--empty')).toBeInTheDocument()
    expect(screen.getByTestId('repository__readme--empty')).toHaveTextContent(
      'Nenhum arquivo README disponível neste repositório.'
    )
  })
})

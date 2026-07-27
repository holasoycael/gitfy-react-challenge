// testing
import { render, screen, fireEvent } from '@testing-library/react'

// components JSX
import DataProfile from './data'
import SkeletonProfile from './skeleton'
import ErrorProfile from './error'

// mock
import mock from './mock'

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn()
}))

describe('<Profile /> components', () => {
  it('should render Skeleton profile state', () => {
    render(<SkeletonProfile />)
    expect(screen.getByTestId('profile__skeleton')).toBeInTheDocument()
  })

  it('should render Error profile state and handle retry click', () => {
    const handleRetry = jest.fn()
    render(<ErrorProfile username="torvalds" onRetry={handleRetry} />)
    expect(screen.getByTestId('profile__error')).toBeInTheDocument()
    expect(screen.getByText(/torvalds/i)).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('profile__button--retry'))
    expect(handleRetry).toHaveBeenCalledTimes(1)
  })

  it('should render Data profile state with user information', () => {
    render(<DataProfile data={mock} repos={[]} reposLoading={false} reposError={false} />)
    expect(screen.getByTestId('profile__data')).toBeInTheDocument()
    expect(screen.getByTestId('profile-card__name')).toHaveTextContent('Natanael Lourenço')
    expect(screen.getByTestId('profile-card__login')).toHaveTextContent('@holasoycael')
    expect(screen.getByTestId('profile-card__bio')).toHaveTextContent('Full Stack Developer')
  })
})

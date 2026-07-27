import { screen } from '@testing-library/react'

// helpers
import { renderWithTheme } from 'helpers/TestingLibrary'

// components JSX
import ProfileCard from '.'

// mock
import mockUser from './mock'

describe('<ProfileCard />', () => {
  it('should render profile card with user information', () => {
    renderWithTheme(<ProfileCard data={mockUser} />)

    expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    expect(screen.getByTestId('profile-card__name')).toHaveTextContent('Natanael Lourenço')
    expect(screen.getByTestId('profile-card__login')).toHaveTextContent('holasoycael')
    expect(screen.getByTestId('profile-card__bio')).toHaveTextContent('Full Stack Developer')
    expect(screen.getByTestId('profile-card__stats')).toHaveTextContent('31')
    expect(screen.getByTestId('profile-card__stats')).toHaveTextContent('6')
  })

  it('should render metadata fields when provided', () => {
    renderWithTheme(<ProfileCard data={mockUser} />)

    expect(screen.getByTestId('profile-card__meta--location')).toHaveTextContent('São Paulo - Brasil')
    expect(screen.getByTestId('profile-card__meta--company')).toHaveTextContent('Company')
    expect(screen.getByTestId('profile-card__meta--email')).toHaveTextContent('holasoycael@gmail.com')
    expect(screen.getByTestId('profile-card__meta--blog')).toHaveTextContent('cael.dev')
  })
})

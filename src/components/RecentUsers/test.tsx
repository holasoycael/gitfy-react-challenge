// testing
import { screen, fireEvent } from '@testing-library/react'

// helpers
import { renderWithTheme } from 'helpers/TestingLibrary'

// models
import Users from 'models/Users'

// components JSX
import RecentUsers from '.'

// mock
import mock from './mock'

const mockItems = Users.data.__Array__.getRecentLogins(mock, 4)

describe('<RecentUsers />', () => {
  it('should render header icon and items when items are provided', () => {
    const handleClick = jest.fn()
    const handleOpen = jest.fn()
    renderWithTheme(<RecentUsers items={mockItems} onClick={handleClick} onOpen={handleOpen} />)

    expect(screen.getByTestId('recent-users__header')).toBeInTheDocument()
    expect(screen.getByTestId('recent-users__item--linuxmint')).toBeInTheDocument()
    expect(screen.getByTestId('recent-users__item--dgobatista')).toBeInTheDocument()
  })

  it('should call onClick when an item is clicked', () => {
    const handleClick = jest.fn()
    const handleOpen = jest.fn()
    renderWithTheme(<RecentUsers items={mockItems} onClick={handleClick} onOpen={handleOpen} />)

    const item = screen.getByTestId('recent-users__item--linuxmint')
    fireEvent.click(item)

    expect(handleClick).toHaveBeenCalledWith(mockItems[0])
  })

  it('should render disabled button when items list is empty', () => {
    const handleClick = jest.fn()
    const handleOpen = jest.fn()
    renderWithTheme(<RecentUsers items={[]} onClick={handleClick} onOpen={handleOpen} />)

    const button = screen.getByRole('button', { name: /ver todos buscados/i })
    expect(button).toBeDisabled()
  })

  it('should render enabled button and call onOpen when clicked', () => {
    const handleClick = jest.fn()
    const handleOpen = jest.fn()
    renderWithTheme(<RecentUsers items={mockItems} onClick={handleClick} onOpen={handleOpen} />)

    const button = screen.getByRole('button', { name: /ver todos buscados/i })
    expect(button).not.toBeDisabled()

    fireEvent.click(button)
    expect(handleOpen).toHaveBeenCalledTimes(1)
  })

  it('should limit rendered items to a maximum of 4', () => {
    const handleClick = jest.fn()
    const handleOpen = jest.fn()
    const fiveItems = ['user1', 'user2', 'user3', 'user4', 'user5']

    renderWithTheme(<RecentUsers items={fiveItems} onClick={handleClick} onOpen={handleOpen} />)

    expect(screen.getByTestId('recent-users__item--user1')).toBeInTheDocument()
    expect(screen.getByTestId('recent-users__item--user4')).toBeInTheDocument()
    expect(screen.queryByTestId('recent-users__item--user5')).not.toBeInTheDocument()
  })

  it('should render items sorted by accessedAt using Users.data.__Array__.getRecentLogins', () => {
    const handleClick = jest.fn()
    const handleOpen = jest.fn()

    const recentLogins = Users.data.__Array__.getRecentLogins(mock, 4)
    expect(recentLogins).toEqual(['linuxmint', 'dgobatista', 'holasoycael', 'ayrtonteshima'])

    renderWithTheme(<RecentUsers items={recentLogins} onClick={handleClick} onOpen={handleOpen} />)

    const renderedUsernames = screen.getAllByTestId('recent-users__username').map((el) => el.textContent)
    expect(renderedUsernames).toEqual(['linuxmint', 'dgobatista', 'holasoycael', 'ayrtonteshima'])
  })
})

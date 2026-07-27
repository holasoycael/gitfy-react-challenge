// testing
import { screen, fireEvent } from '@testing-library/react'

// helpers
import { renderWithTheme } from 'helpers/TestingLibrary'

// components JSX
import RecentUsers from '.'

// mock
import mock from './mock'

describe('<RecentUsers />', () => {
  it('should render header icon and items when items are provided', () => {
    const handleClick = jest.fn()
    const handleOpen = jest.fn()
    renderWithTheme(<RecentUsers items={mock} onClick={handleClick} onOpen={handleOpen} />)

    expect(screen.getByTestId('recent-users__header')).toBeInTheDocument()
    expect(screen.getByTestId('recent-users__item--torvalds')).toBeInTheDocument()
    expect(screen.getByTestId('recent-users__item--gaearon')).toBeInTheDocument()
  })

  it('should call onClick when an item is clicked', () => {
    const handleClick = jest.fn()
    const handleOpen = jest.fn()
    renderWithTheme(<RecentUsers items={mock} onClick={handleClick} onOpen={handleOpen} />)

    const item = screen.getByTestId('recent-users__item--torvalds')
    fireEvent.click(item)

    expect(handleClick).toHaveBeenCalledWith(mock[0])
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
    renderWithTheme(<RecentUsers items={mock} onClick={handleClick} onOpen={handleOpen} />)

    const button = screen.getByRole('button', { name: /ver todos buscados/i })
    expect(button).not.toBeDisabled()

    fireEvent.click(button)
    expect(handleOpen).toHaveBeenCalledTimes(1)
  })
})

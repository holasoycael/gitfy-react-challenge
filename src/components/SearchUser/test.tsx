import { act } from 'react'

// helpers
import { renderWithTheme } from 'helpers/TestingLibrary'

// components JSX
import SearchUser from '.'

// childrens
import { mockUsers } from './mock'

// external libraries
import { screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// types and interfaces
import type { TRowUser } from './types'

const mockRowUsers: TRowUser[] = mockUsers.map((user) => ({
  username: user.login,
  avatarUrl: user.avatar_url
}))

describe('<SearchUser />', () => {
  const onFetchMock = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
    onFetchMock.mockReset()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render the search input with correct placeholder', () => {
    renderWithTheme(<SearchUser onFetch={onFetchMock} placeholder="Buscar GitHub username..." />)

    expect(screen.getByPlaceholderText('Buscar GitHub username...')).toBeInTheDocument()
    expect(screen.getByTestId('search-user__container')).toBeInTheDocument()
  })

  it('should display dropdown with users after typing and debounce', async () => {
    onFetchMock.mockResolvedValueOnce(mockRowUsers)

    renderWithTheme(<SearchUser onFetch={onFetchMock} placeholder="Buscar GitHub username..." />)

    const input = screen.getByPlaceholderText('Buscar GitHub username...')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).type(input, 'holasoy')
    })

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('search-user__dropdown')).toBeInTheDocument()
      expect(screen.getByText('holasoycael')).toBeInTheDocument()
      expect(screen.getByText('holasoydev')).toBeInTheDocument()
    })
  })

  it('should clear users and close dropdown when input is emptied', async () => {
    onFetchMock.mockResolvedValueOnce(mockRowUsers)

    renderWithTheme(<SearchUser onFetch={onFetchMock} placeholder="Buscar GitHub username..." />)

    const input = screen.getByPlaceholderText('Buscar GitHub username...')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).type(input, 'holasoy')
    })

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('search-user__dropdown')).toBeInTheDocument()
    })

    await act(async () => {
      userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
      fireEvent.change(input, { target: { value: '' } })
    })

    expect(screen.queryByTestId('search-user__dropdown')).not.toBeInTheDocument()
  })

  it('should navigate dropdown items with ArrowDown and ArrowUp', async () => {
    onFetchMock.mockResolvedValueOnce(mockRowUsers)

    renderWithTheme(<SearchUser onFetch={onFetchMock} placeholder="Buscar GitHub username..." />)

    const input = screen.getByPlaceholderText('Buscar GitHub username...')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).type(input, 'holasoy')
    })

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('search-user__dropdown')).toBeInTheDocument()
    })

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).keyboard('{ArrowDown}')
    })

    expect(screen.getByTestId('search-user__item--active')).toHaveTextContent('holasoycael')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).keyboard('{ArrowDown}')
    })

    expect(screen.getByTestId('search-user__item--active')).toHaveTextContent('holasoydev')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).keyboard('{ArrowUp}')
    })

    expect(screen.getByTestId('search-user__item--active')).toHaveTextContent('holasoycael')
  })

  it('should close dropdown and clear input on Escape', async () => {
    onFetchMock.mockResolvedValueOnce(mockRowUsers)

    renderWithTheme(<SearchUser onFetch={onFetchMock} placeholder="Buscar GitHub username..." />)

    const input = screen.getByPlaceholderText('Buscar GitHub username...')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).type(input, 'holasoy')
    })

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('search-user__dropdown')).toBeInTheDocument()
    })

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).keyboard('{Escape}')
    })

    expect(screen.queryByTestId('search-user__dropdown')).not.toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('should call onSelect when pressing Enter on an active item', async () => {
    onFetchMock.mockResolvedValueOnce(mockRowUsers)

    const handleSelect = jest.fn()

    renderWithTheme(
      <SearchUser onFetch={onFetchMock} onSelect={handleSelect} placeholder="Buscar GitHub username..." />
    )

    const input = screen.getByPlaceholderText('Buscar GitHub username...')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).type(input, 'holasoy')
    })

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('search-user__dropdown')).toBeInTheDocument()
    })

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).keyboard('{ArrowDown}')
    })

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).keyboard('{Enter}')
    })

    expect(handleSelect).toHaveBeenCalledWith(mockRowUsers[0])
  })

  it('should call onSelect when clicking a user item in the list', async () => {
    onFetchMock.mockResolvedValueOnce(mockRowUsers)

    const handleSelect = jest.fn()

    renderWithTheme(
      <SearchUser onFetch={onFetchMock} onSelect={handleSelect} placeholder="Buscar GitHub username..." />
    )

    const input = screen.getByPlaceholderText('Buscar GitHub username...')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).type(input, 'holasoy')
    })

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('search-user__dropdown')).toBeInTheDocument()
    })

    const userItem = screen.getByText('holasoydev')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).click(userItem)
    })

    expect(handleSelect).toHaveBeenCalledWith(mockRowUsers[1])
  })

  it('should navigate with Tab and Shift+Tab', async () => {
    onFetchMock.mockResolvedValueOnce(mockRowUsers)

    renderWithTheme(<SearchUser onFetch={onFetchMock} placeholder="Buscar GitHub username..." />)

    const input = screen.getByPlaceholderText('Buscar GitHub username...')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).type(input, 'holasoy')
    })

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('search-user__dropdown')).toBeInTheDocument()
    })

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).keyboard('{Tab}')
    })

    expect(screen.getByTestId('search-user__item--active')).toHaveTextContent('holasoycael')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).keyboard('{Tab}')
    })

    expect(screen.getByTestId('search-user__item--active')).toHaveTextContent('holasoydev')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).keyboard('{Shift>}{Tab}{/Shift}')
    })

    expect(screen.getByTestId('search-user__item--active')).toHaveTextContent('holasoycael')
  })

  it('should display empty state when no results found', async () => {
    onFetchMock.mockResolvedValueOnce([])

    renderWithTheme(<SearchUser onFetch={onFetchMock} placeholder="Buscar GitHub username..." />)

    const input = screen.getByPlaceholderText('Buscar GitHub username...')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).type(input, 'xyznonexistentuser123')
    })

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('search-user__empty')).toBeInTheDocument()
      expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument()
    })
  })

  it('should handle API error gracefully', async () => {
    onFetchMock.mockRejectedValueOnce(new Error('API Error'))

    renderWithTheme(<SearchUser onFetch={onFetchMock} placeholder="Buscar GitHub username..." />)

    const input = screen.getByPlaceholderText('Buscar GitHub username...')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).type(input, 'erroruser')
    })

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.queryByTestId('search-user__dropdown')).not.toBeInTheDocument()
    })
  })

  it('should auto-select item when single result is returned', async () => {
    onFetchMock.mockResolvedValueOnce([mockRowUsers[0]])

    renderWithTheme(<SearchUser onFetch={onFetchMock} placeholder="Buscar GitHub username..." />)

    const input = screen.getByPlaceholderText('Buscar GitHub username...')

    await act(async () => {
      await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).type(input, 'singleuser')
    })

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('search-user__item--active')).toHaveTextContent('holasoycael')
    })
  })
})

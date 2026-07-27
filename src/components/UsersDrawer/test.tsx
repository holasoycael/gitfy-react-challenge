// testing
import { screen } from '@testing-library/react'

// heroui
import { Drawer } from '@heroui/react'
import { DrawerContent } from '@heroui/react'

// helpers
import { renderWithTheme } from 'helpers/TestingLibrary'

// components JSX
import DataUsersDrawer from './data'

// mock
import mock from './mock'

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn()
}))

jest.mock('contexts/App', () => ({
  IsOpenCartContext: () => ({
    isOpenCart: true,
    setIsOpenCart: jest.fn()
  })
}))

describe('<UsersDrawer />', () => {
  it('should render empty state when no users are provided', () => {
    renderWithTheme(
      <Drawer isOpen={true} onOpenChange={jest.fn()}>
        <DrawerContent>
          <DataUsersDrawer data={[]} />
        </DrawerContent>
      </Drawer>
    )

    expect(screen.getByTestId('users-drawer__header')).toBeInTheDocument()
    expect(screen.getByTestId('users-drawer__empty-state')).toBeInTheDocument()
    expect(screen.getByText(/nenhum usuário salvo ainda/i)).toBeInTheDocument()
  })

  it('should render user list when users are provided', () => {
    renderWithTheme(
      <Drawer isOpen={true} onOpenChange={jest.fn()}>
        <DrawerContent>
          <DataUsersDrawer data={mock} />
        </DrawerContent>
      </Drawer>
    )

    expect(screen.getByTestId('users-drawer__header')).toBeInTheDocument()
    expect(screen.getByTestId('users-drawer__item--octocat')).toBeInTheDocument()
    expect(screen.getAllByTestId('users-drawer__name')[0]).toHaveTextContent('Monalisa Octocat')
  })
})

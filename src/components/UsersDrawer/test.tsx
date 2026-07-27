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

  it('should render user list sorted by accessedAt descending', () => {
    const mockUsers = [
      {
        login: 'oldest',
        id: 1,
        node_id: '',
        avatar_url: '',
        gravatar_id: '',
        url: '',
        html_url: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: 'User',
        user_view_type: 'public',
        site_admin: false,
        name: 'Oldest User',
        company: null,
        blog: null,
        location: null,
        email: null,
        hireable: null,
        bio: null,
        twitter_username: null,
        public_repos: 0,
        public_gists: 0,
        followers: 0,
        following: 0,
        created_at: '',
        updated_at: '',
        accessedAt: 1000
      },
      {
        login: 'newest',
        id: 2,
        node_id: '',
        avatar_url: '',
        gravatar_id: '',
        url: '',
        html_url: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: 'User',
        user_view_type: 'public',
        site_admin: false,
        name: 'Newest User',
        company: null,
        blog: null,
        location: null,
        email: null,
        hireable: null,
        bio: null,
        twitter_username: null,
        public_repos: 0,
        public_gists: 0,
        followers: 0,
        following: 0,
        created_at: '',
        updated_at: '',
        accessedAt: 5000
      }
    ]

    renderWithTheme(
      <Drawer isOpen={true} onOpenChange={jest.fn()}>
        <DrawerContent>
          <DataUsersDrawer data={mockUsers} />
        </DrawerContent>
      </Drawer>
    )

    const names = screen.getAllByTestId('users-drawer__name').map((el) => el.textContent)
    expect(names).toEqual(['Newest User', 'Oldest User'])
  })
})

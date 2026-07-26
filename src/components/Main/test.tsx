// helpers
import { renderWithTheme } from 'helpers/TestingLibrary'

// components JSX
import Main from '.'

// external libraries
import { screen } from '@testing-library/react'

describe('<Main />', () => {
  it('should render the heading', () => {
    const { container } = renderWithTheme(<Main />)

    expect(screen.getByRole('heading', { name: /Main/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})

import chroma from 'chroma-js'

// helpers
import { renderWithTheme } from 'helpers/TestingLibrary'

// components JSX
import GlowTop from '.'

// external libraries
import { screen } from '@testing-library/react'

describe('<GlowTop />', () => {
  it('should render default glow top element correctly', () => {
    const { container } = renderWithTheme(<GlowTop />)

    expect(screen.getByTestId('glow-top__container')).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should apply custom color, opacity and zIndex via props using chroma-js', () => {
    renderWithTheme(<GlowTop color="#ff0000" opacity={0.5} zIndex={-1} />)

    const glowTopContainer = screen.getByTestId('glow-top__container')
    const expectedRgba = chroma('#ff0000').alpha(0.5).css()

    expect(glowTopContainer).toHaveStyle({
      background: `radial-gradient(48.78087172574147% 48.780871725741484% at 52.26579732061952% 52.311511675873824%, ${expectedRgba}, rgba(0,0,0,0))`,
      zIndex: -1
    })
  })
})

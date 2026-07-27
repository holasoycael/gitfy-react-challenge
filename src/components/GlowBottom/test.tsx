import chroma from 'chroma-js'

// helpers
import { renderWithTheme } from 'helpers/TestingLibrary'

// components JSX
import GlowBottom from '.'

// external libraries
import { screen } from '@testing-library/react'

describe('<GlowBottom />', () => {
  it('should render default glow bottom element correctly', () => {
    const { container } = renderWithTheme(<GlowBottom />)

    expect(screen.getByTestId('glow-bottom__container')).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should apply custom color, opacity and zIndex via props using chroma-js', () => {
    renderWithTheme(<GlowBottom color="#0000ff" opacity={0.4} zIndex={-1} />)

    const glowBottomContainer = screen.getByTestId('glow-bottom__container')
    const expectedRgba = chroma('#0000ff').alpha(0.4).css()

    expect(glowBottomContainer).toHaveStyle({
      background: `radial-gradient(48.78087172574147% 48.780871725741484% at 52.26579732061952% 52.311511675873824%, ${expectedRgba}, rgba(0,0,0,0))`,
      zIndex: -1
    })
  })
})

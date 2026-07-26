import chroma from 'chroma-js'

// helpers
import { renderWithTheme } from 'helpers/TestingLibrary'

// components JSX
import Atmosphere from '.'

// external libraries
import { screen } from '@testing-library/react'

describe('<Atmosphere />', () => {
  it('should render default atmosphere background elements correctly', () => {
    const { container } = renderWithTheme(<Atmosphere />)

    expect(screen.getByTestId('atmosphere__container')).toBeInTheDocument()
    expect(screen.getByTestId('atmosphere__radial-light')).toBeInTheDocument()
    expect(screen.getByTestId('atmosphere__grid')).toBeInTheDocument()
    expect(screen.getByTestId('atmosphere__dot-pattern')).toBeInTheDocument()
    expect(screen.getByTestId('atmosphere__noise-texture')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should apply custom colors and opacities via props using chroma-js', () => {
    const customProps = {
      radialColor: '#ffffff',
      radialOpacity: 0.5,
      gridColor: '#ff0000',
      gridOpacity: 0.2,
      dotColor: '#00ff00',
      dotOpacity: 0.5,
      noiseOpacity: 0.08
    }

    renderWithTheme(<Atmosphere {...customProps} />)

    const radialLight = screen.getByTestId('atmosphere__radial-light')
    const grid = screen.getByTestId('atmosphere__grid')
    const dotPattern = screen.getByTestId('atmosphere__dot-pattern')
    const noiseTexture = screen.getByTestId('atmosphere__noise-texture')

    const expectedRadialRgba = chroma(customProps.radialColor).alpha(customProps.radialOpacity).css()
    const expectedGridRgba = chroma(customProps.gridColor).alpha(customProps.gridOpacity).css()
    const expectedDotRgba = chroma(customProps.dotColor).alpha(customProps.dotOpacity).css()

    expect(radialLight).toHaveStyle({
      background: `radial-gradient(ellipse at center, ${expectedRadialRgba}, transparent 70%)`
    })
    expect(grid).toHaveStyle({
      backgroundImage: `linear-gradient(to right, ${expectedGridRgba} 1px, transparent 1px), linear-gradient(to bottom, ${expectedGridRgba} 1px, transparent 1px)`
    })
    expect(dotPattern).toHaveStyle({
      backgroundImage: `radial-gradient(${expectedDotRgba} 1px, transparent 1px)`
    })
    expect(noiseTexture).toHaveStyle({
      opacity: '0.08'
    })
  })
})

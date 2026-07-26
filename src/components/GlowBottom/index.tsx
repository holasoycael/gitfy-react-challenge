import chroma from 'chroma-js'
import { memo } from 'react'

// types and interfaces
import type { GlowBottomProps } from './types'

const GlowBottom = ({ color = '#1fb76b', opacity = 0.25 }: GlowBottomProps) => {
  const glowRgba = chroma(color).alpha(opacity).css()

  return (
    <div
      className="pointer-events-none"
      data-testid="glow-bottom__container"
      style={{
        background: `radial-gradient(48.78087172574147% 48.780871725741484% at 52.26579732061952% 52.311511675873824%, ${glowRgba}, rgba(0,0,0,0))`,
        flex: 'none',
        height: '726px',
        left: 'calc(50.00000000000002% - 345px / 2)',
        position: 'absolute',
        bottom: -481,
        userSelect: 'none',
        width: '345px',
        zIndex: -1,
        animation: 'glow-drift-bottom 26s ease-in-out infinite',
        willChange: 'transform, opacity'
      }}
    />
  )
}

export default memo(GlowBottom)

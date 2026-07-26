import chroma from 'chroma-js'
import { memo } from 'react'

// types and interfaces
import type { AtmosphereProps } from './types'

const Atmosphere = ({
  radialColor = '#388bfd',
  radialOpacity = 0.15,
  gridColor = '#e6edf3',
  gridOpacity = 0.03,
  dotColor = '#7d8590',
  dotOpacity = 0.12,
  noiseOpacity = 0.025
}: AtmosphereProps) => {
  const radialRgba = chroma(radialColor).alpha(radialOpacity).css()
  const gridRgba = chroma(gridColor).alpha(gridOpacity).css()
  const dotRgba = chroma(dotColor).alpha(dotOpacity).css()

  return (
    <div
      aria-hidden="true"
      className="w-full h-full pointer-events-none absolute inset-0 overflow-hidden"
      data-testid="atmosphere__container"
      style={{
        contain: 'strict',
        willChange: 'transform'
      }}
    >
      <div
        className="absolute left-1/2 top-[-10%] h-130 w-205 rounded-full"
        data-description="Almost invisible radial light, centered near the top"
        data-testid="atmosphere__radial-light"
        style={{
          background: `radial-gradient(ellipse at center, ${radialRgba}, transparent 70%)`,
          animation: 'atmosphere-drift 28s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />

      <div
        className="absolute inset-0"
        data-description="Faint grid"
        data-testid="atmosphere__grid"
        style={{
          backgroundImage: `linear-gradient(to right, ${gridRgba} 1px, transparent 1px), linear-gradient(to bottom, ${gridRgba} 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, #000 40%, transparent 100%)'
        }}
      />

      <div
        className="absolute inset-0"
        data-description="Subtle dot pattern"
        data-testid="atmosphere__dot-pattern"
        style={{
          backgroundImage: `radial-gradient(${dotRgba} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 55% at 50% 45%, #000 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 45%, #000 20%, transparent 85%)'
        }}
      />

      <div
        className="absolute inset-0 mix-blend-soft-light"
        data-description="Soft noise texture"
        data-testid="atmosphere__noise-texture"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          opacity: noiseOpacity,
          willChange: 'transform',
          contain: 'strict'
        }}
      />
    </div>
  )
}

export default memo(Atmosphere)

import { memo } from 'react'

const Atmosphere = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        contain: 'strict',
        willChange: 'transform'
      }}
    >
      <div
        className="absolute left-1/2 top-[-10%] h-130 w-205 rounded-full"
        data-description="Almost invisible radial light, centered near the top"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56,139,253,0.15), transparent 70%)',
          animation: 'atmosphere-drift 28s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />

      <div
        className="absolute inset-0"
        data-description="Faint grid"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(230,237,243,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(230,237,243,0.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, #000 40%, transparent 100%)'
        }}
      />

      <div
        className="absolute inset-0"
        data-description="Subtle dot pattern"
        style={{
          backgroundImage: 'radial-gradient(rgba(125,133,144,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 55% at 50% 45%, #000 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 45%, #000 20%, transparent 85%)'
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-soft-light"
        data-description="Soft noise texture"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          willChange: 'transform',
          contain: 'strict'
        }}
      />
    </div>
  )
}

export default memo(Atmosphere)

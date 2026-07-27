import { useEffect, useRef } from 'react'

// utils
import cn from 'utils/cn'

// types and interfaces
import type { ScrollShadowProps, ShadowProps } from './types'

const Shadow = ({ children, className }: ShadowProps) => {
  return <div className={cn('w-full h-full', className)}>{children}</div>
}

const ScrollShadow = ({ children, className, shadowColor }: ScrollShadowProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null!)
  const scrollRef = useRef<HTMLDivElement>(null)

  const updateShadows = (target: HTMLDivElement) => {
    const scrollTop = target.scrollTop
    const scrollHeight = target.scrollHeight
    const clientHeight = target.clientHeight
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1 // -1 de tolerância

    wrapperRef.current.dataset.before = scrollTop ? 'visible' : 'hidden'
    wrapperRef.current.dataset.after = isAtBottom ? 'hidden' : 'visible'
  }

  useEffect(() => {
    const currentTarget = scrollRef.current
    if (currentTarget) {
      currentTarget.addEventListener('scroll', () => updateShadows(currentTarget))
      updateShadows(currentTarget)
    }

    return () => {
      if (currentTarget) {
        currentTarget.removeEventListener('scroll', () => updateShadows(currentTarget))
      }
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={cn('block w-full h-full overflow-hidden scroll-shadow', className)}
      style={{ '--scroll-shadow-color': shadowColor } as React.CSSProperties}
    >
      {children({ children, scrollRef, Shadow })}
    </div>
  )
}

export default ScrollShadow

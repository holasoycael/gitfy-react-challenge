import { useRef } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
// types and interfaces
type TDefaultProps = [string]
type TProps = any[]
type TOnChangeFn<T extends TProps> = (...args: T) => void

function useDebounce<P extends TProps = TDefaultProps>(fn: TOnChangeFn<P>, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>(null!)

  function debouncedFn(...args: P) {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  return debouncedFn
}

export default useDebounce

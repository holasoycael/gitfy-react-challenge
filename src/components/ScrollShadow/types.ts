// types and interfaces
import type { ClassValue } from 'clsx'
import type { PropsWithChildren } from 'typings/App'

export type FetchProps = {
  children: (props: FetchProps) => React.ReactNode
  scrollRef: React.RefObject<HTMLDivElement | null>
  Shadow: (props: ShadowProps) => React.ReactNode
}

export type ScrollShadowProps = {
  children: (props: FetchProps) => React.ReactNode
  className?: ClassValue
  shadowColor?: string
}

export type ShadowProps = PropsWithChildren<{
  className?: ClassValue
}>

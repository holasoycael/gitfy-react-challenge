export type WithChildren = { children: React.ReactNode }

export type ProviderScrollable = WithChildren & ContextScrollable
export type ProviderApp = WithChildren & ContextApp

export interface ContextApp {
  isOpenCart: boolean
  setIsOpenCart: React.Dispatch<React.SetStateAction<boolean>>
}

export type ContextScrollable = {
  scrollRef: React.RefObject<HTMLDivElement>
}

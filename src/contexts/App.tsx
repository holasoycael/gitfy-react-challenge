import { createContext, useContext } from 'react'

// types and interfaces
import type { ContextApp, ProviderApp } from 'typings/Contexts'

const ElementContext = createContext<ContextApp>(null!)

export default function ElementProvider({ children, isOpenCart, setIsOpenCart }: ProviderApp) {
  return <ElementContext.Provider value={{ isOpenCart, setIsOpenCart }}>{children}</ElementContext.Provider>
}

export function IsOpenCartContext() {
  const context = useContext(ElementContext)
  const { isOpenCart, setIsOpenCart } = context
  return { isOpenCart, setIsOpenCart }
}

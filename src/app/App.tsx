import { useState } from 'react'

// contexts
import AppProvider from 'contexts/App'

// components JSX
import Routes from 'app/routes'
import CartDrawer from 'components/UsersDrawer'

const App = () => {
  const [isOpenCart, setIsOpenCart] = useState(false)

  return (
    <AppProvider {...{ isOpenCart, setIsOpenCart }}>
      <div className="w-full h-full">
        <Routes />
        <CartDrawer isOpen={isOpenCart} onOpenChange={setIsOpenCart} />
      </div>
    </AppProvider>
  )
}

export default App

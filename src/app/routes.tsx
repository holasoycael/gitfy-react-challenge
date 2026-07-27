import { Route, Routes } from 'react-router'

// components JSX
import Home from 'pages'
import Profile from 'pages/profile'
import Repository from 'pages/repository'

export default () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/:user" element={<Profile />} />
      <Route path="/:user/:repository" element={<Repository />} />
    </Routes>
  )
}

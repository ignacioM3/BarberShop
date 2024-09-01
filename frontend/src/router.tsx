import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Register from './pages/Register'

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />} path='/auth/'>
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

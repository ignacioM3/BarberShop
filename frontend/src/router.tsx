import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthProvider'

export default function router() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />} path='/auth/'>
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

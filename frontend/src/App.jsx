import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import PasswordReset from './pages/PasswordReset'

function App() {

  return (
    <Routes>
      <Route path='/' Component={LoginForm} />
      <Route path='/register' Component={Register} />
      <Route path='/reset-password' Component={ResetPassword} />
      <Route path='/password-reset' Component={PasswordReset} />
    </Routes>
  )
}

export default App

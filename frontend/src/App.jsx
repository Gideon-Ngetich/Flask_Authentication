import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'

function App() {

  return (
    <Routes>
      <Route path='/' Component={LoginForm} />
      <Route path='/register' Component={Register} />
      <Route path='/reset-password' Component={ResetPassword} />
    </Routes>
  )
}

export default App

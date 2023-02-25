import { Route, Routes } from 'react-router-dom'
import RegistrationConfirm from './pages/RegistrationConfirm'
import ChangePassword from './pages/ChangePassword'
import Account from './pages/Account'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignUpHome from './pages/SignUpHome'
import SignIn from './pages/SingIn'
import SuccessRegistration from './pages/SuccessRegistration'
import CheckPasswordSocial from './pages/CheckPasswordSocial'
import RestorePassword from './pages/RestorePassword'
import RestoreChangePassword from './pages/RestoreChangePassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './scss/app.scss'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { useEffect } from 'react'
import { getUser } from './redux/User/userSlice'

const App = () => {
  const { registerUser } = useAppSelector((state) => state.signInSlice)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (registerUser) {
      dispatch(getUser())
    }
  }, [registerUser])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="signup" element={<SignUpHome />} />
        <Route path="/signup/mail" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="account" element={<Account />} />
        <Route path="success" element={<SuccessRegistration />} />
        <Route path="check/password/social" element={<CheckPasswordSocial />} />
        <Route path="signin/restore/passord" element={<RestorePassword />} />
        <Route path="confirm/password" element={<RegistrationConfirm />} />
        <Route
          path="signin/recovery/passord/change"
          element={<ChangePassword />}
        />
        <Route
          path="signin/restore/passord/change"
          element={<RestoreChangePassword />}
        />
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  )
}

export default App

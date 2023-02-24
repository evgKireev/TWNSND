import { Route, Routes } from 'react-router-dom'
import RegistrationConfirm from './pages/RegistrationConfirm'
import { Account } from './pages/Account'
import ChangePassword from './pages/ChangePassword'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignUpHome from './pages/SignUpHome'
import SignIn from './pages/SingIn'
import SuccessRegistration from './pages/SuccessRegistration'
import CheckPasswordSocial from './pages/CheckPasswordSocial'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './scss/app.scss'
import RestorePassword from './pages/RestorePassword'
import RestoreChangePassword from './pages/RestoreChangePassword'

const App = () => {
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

import { Route, Routes } from 'react-router-dom'
import RecoveryPassword from './pages/ RecoveryPassword'
import RegistrationConfirm from './pages/RegistrationConfirm'
import { Account } from './pages/Account'
import ChangePassword from './pages/ChangePassword'
import CheckMail from './pages/CheckMail'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignUpHome from './pages/SignUpHome'
import SignIn from './pages/SingIn'
import SuccessRegistration from './pages/SuccessRegistration'
import CheckPasswordSocial from './pages/CheckPasswordSocial'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './scss/app.scss'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup/mail" element={<SignUp />} />
        <Route path="signup" element={<SignUpHome />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="account" element={<Account />} />
        <Route path="signup/mail/check" element={<CheckMail />} />
        <Route path="signin/recovery/passord" element={<RecoveryPassword />} />
        <Route path="confirm/password" element={<RegistrationConfirm />} />
        <Route path="success" element={<SuccessRegistration />} />
        <Route path="check/password/social" element={<CheckPasswordSocial />} />
        <Route path="signin/recovery/passord/change" element={<ChangePassword />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  )
}

export default App

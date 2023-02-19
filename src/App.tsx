import { Route, Routes } from 'react-router-dom'
import RecoveryPassword from './pages/ RecoveryPassword'
import RegistrationConfirm from './pages/RegistrationConfirm'
import CheckMail from './pages/CheckMail'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignUpHome from './pages/SignUpHome'
import SignIn from './pages/SingIn'
import './scss/app.scss'
import SuccessRegistration from './pages/SuccessRegistration'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup/mail" element={<SignUp />} />
        <Route path="signup" element={<SignUpHome />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup/mail/check" element={<CheckMail />} />
        <Route path="signin/recovery/passord" element={<RecoveryPassword />} />
        <Route path="confirm/password" element={<RegistrationConfirm />} />
        <Route
          path="success"
          element={<SuccessRegistration />}
        />
      </Routes>
    </>
  )
}

export default App

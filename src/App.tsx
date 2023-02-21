import { Route, Routes } from 'react-router-dom'
import RecoveryPassword from './pages/ RecoveryPassword'
import { Account } from './pages/Account'
import ChangePassword from './pages/ChangePassword'
import CheckMail from './pages/CheckMail'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignUpHome from './pages/SignUpHome'
import SignIn from './pages/SingIn'
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
        <Route path="signin/recovery/passord/change" element={<ChangePassword />} />
      </Routes>
    </>
  )
}

export default App

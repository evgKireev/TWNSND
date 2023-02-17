import { Route, Routes } from 'react-router-dom'
import RecoveryPassword from './pages/ RecoveryPassword'
import CheckMail from './pages/CheckMail'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignUpHome from './pages/SignUpHome'
import './scss/app.scss'

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        ></Route>
        <Route
          path="/signup/mail"
          element={<SignUp />}
        />
        <Route
          path="signup"
          element={<SignUpHome />}
        />
        <Route
          path="signup/mail/check"
          element={<CheckMail />}
        />
        <Route
          path="signin/recovery/passord"
          element={<RecoveryPassword />}
        />
      </Routes>
    </>
  )
}

export default App

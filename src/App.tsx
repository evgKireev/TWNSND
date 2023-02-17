import { Route, Routes } from 'react-router-dom'
import Footer from './components/APP/Footer'
import Main from './components/APP/Main'
import Button, { ButtonTypes } from './components/UI/Button'
import Input, { InputTypeEnum } from './components/UI/Input'
import RecoveryPassword from './pages/ RecoveryPassword'
import CheckMail from './pages/CheckMail'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignUpHome from './pages/SignUpHome'
import './scss/app.scss'

const App = () => {
  return (
    <div className="container">
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
      <Footer />
    </div>
  )
}

export default App

import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './components/APP/Main'
import Button, { ButtonTypes } from './components/UI/Button'
import Input, { InputTypeEnum } from './components/UI/Input'
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
        >
          <Route
            index
            element={<Main />}
          />
        </Route>
        <Route
          path="signup/mail"
          element={<SignUp />}
        />
        <Route
          path="signup"
          element={<SignUpHome />}
        />
      </Routes>
    </div>
  )
}

export default App

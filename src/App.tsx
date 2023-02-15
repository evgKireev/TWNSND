import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/APP/Footer'
import Main from './components/APP/Main'
import Button, { ButtonTypes } from './components/UI/Button'
import Input, { InputTypeEnum } from './components/UI/Input'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
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
          path="signup"
          element={<SignUp />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

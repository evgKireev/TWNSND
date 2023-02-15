import { Route, Routes } from 'react-router-dom'
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
      </Routes>
    </div>
  )
}

export default App

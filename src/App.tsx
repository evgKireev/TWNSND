import { Route, Routes } from 'react-router-dom'
import Main from './components/APP/Main'
import Home from './pages/Home'
import './scss/app.scss'

const App = () => {
  return (
    <div className="conatiner">
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
      </Routes>
    </div>
  )
}

export default App

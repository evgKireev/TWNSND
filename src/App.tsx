import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './scss/app.scss'
import Router from './pages/Router/Router'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer position="bottom-right" />
    </div>
  )
}

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWithStore

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../../components/APP/Footer'
import Header from '../../components/APP/Header'
import Loader from '../../components/UI/Loader'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getRegisterUserGoogle } from '../../redux/SignUser/signUpSlice'
import styles from './Home.module.scss'
const Home = () => {
  const stateGoogle = '1234567890'
  const redirectUriGoogle = 'http://localhost:3000'
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const state = searchParams.get('state')
  const code = searchParams.get('code')
  const { statusRegisterUserGoogle } = useAppSelector(
    (state) => state.statusSlice
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (state != stateGoogle) {
      console.log('Error') // что тут показать аользователю?
      return
    } else if (state && code) {
      console.log(state, code)
      dispatch(getRegisterUserGoogle({ redirectUriGoogle, code }))
    }
  }, [])

  return statusRegisterUserGoogle === 'pending' ? (
    <Loader />
  ) : (
    <>
      <div className={styles.container}>
        <Header />
      </div>
      <Footer />
    </>
  )
}

export default Home

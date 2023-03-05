import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { redirectUriGoogle, stateGoogle } from '../../@types/constant'
import Footer from '../../components/APP/Footer'
import Header from '../../components/APP/Header'
import Loader from '../../components/UI/Loader'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  getRegisterUserGoogle,
  setCode,
} from '../../redux/SignUser/signUpSlice'
import { getUser } from '../../redux/User/userSlice'
import styles from './Home.module.scss'

const Home = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const state = searchParams.get('state')
  const code = searchParams.get('code')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { registerUser } = useAppSelector((state) => state.signInSlice)
  const { statusRegisterUserGoogle } = useAppSelector(
    (state) => state.statusSlice
  )

  useEffect(() => {
    if (state !== stateGoogle) {
      return
    } else if (state && code) {
      dispatch(setCode(code))
      dispatch(
        getRegisterUserGoogle({
          data: { redirectUriGoogle, code },
          callback: (link) => {
            navigate(link)
          },
        })
      )
    }
  }, [])
  useEffect(() => {
    if (registerUser) {
      dispatch(getUser())
    }
  }, [registerUser])
  return statusRegisterUserGoogle === 'pending' ? (
    <Loader />
  ) : (
    <>
      <div className={styles.container}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Home

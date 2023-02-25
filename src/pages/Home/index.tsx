import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { redirectUriGoogle, stateGoogle } from '../../@types/constant'
import Footer from '../../components/APP/Footer'
import Header from '../../components/APP/Header'
import Loader from '../../components/UI/Loader'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUser, setUser } from '../../redux/User/userSlice'
import {
  getRegisterUserGoogle,
  setCode,
} from '../../redux/SignUser/signUpSlice'
import styles from './Home.module.scss'

const Home = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const state = searchParams.get('state')
  const code = searchParams.get('code')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { statusRegisterUserGoogle } = useAppSelector(
    (state) => state.statusSlice
  )
  
  useEffect(() => {
    if (state != stateGoogle) {
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
    dispatch(getUser())
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

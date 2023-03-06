import styles from './Header.module.scss'
import { useState } from 'react'
import classNames from 'classnames'
import UserControl from '../UserControl'
import { useAppSelector } from '../../../redux/hooks'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ButtonNew, { ButtonNewTypes } from '../../UI/ButtonNew'
import { PathNames } from '../../../pages/Router/Router'

const Header = () => {
  const naw = [
    { title: 'Главная', link: PathNames.Home },
    { title: 'Платформы', link: PathNames.Platforms },
    { title: 'FAQ', link: '' },
    { title: 'Каталог', link: '' },
    { title: 'Блог', link: '' },
    { title: 'Контакты', link: '' },
  ]
  const navigate = useNavigate()
  const { registerUser } = useAppSelector((state) => state.signInSlice)
  const { userData } = useAppSelector((state) => state.userSlice)
  const [activeNaw, setActiveNaw] = useState('Главная')
  const [openPanel, setOpenPanel] = useState(false)
  const location = useLocation()
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logo}>LOGO</div>
        {registerUser ? (
          <div className={styles.UserPanel}>
            <div
              className={styles.userName}
              onClick={() => setOpenPanel(!openPanel)}
            >
              {userData?.given_name[0].toLocaleUpperCase()}
              {userData?.family_name[0].toLocaleUpperCase()}
            </div>
            <UserControl openPanel={openPanel} />
          </div>
        ) : (
          <div className={styles.innerControl}>
            <ButtonNew
              title={'Зарегистрироваться'}
              type={ButtonNewTypes.Primary}
              onClick={() => navigate(PathNames.SignUp)}
            />
            <ButtonNew
              title={'Войти'}
              type={ButtonNewTypes.Secondary}
              onClick={() => navigate(PathNames.SignIn)}
            />
          </div>
        )}
      </div>
      <nav className={styles.naw}>
        {naw.map((value, index) => (
          <Link to={value.link} key={index}>
            <div
              onClick={() => setActiveNaw(value.title)}
              className={classNames(styles.nawItem, {
                [styles.active]: value.link === location.pathname,
              })}
            >
              {value.title}
            </div>
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header

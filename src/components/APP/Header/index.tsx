import styles from './Header.module.scss'
import headerImg from '../../../assets/img/header.png'
import logo from '../../../assets/img/logo.svg'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useState } from 'react'
import classNames from 'classnames'
import UserControl from '../UserControl'
import { useAppSelector } from '../../../redux/hooks'
import { useNavigate } from 'react-router-dom'
const naw = [
  'Сервис по подбору решений',
  'Поиск по параметрам',
  'Готовые решения',
  'Блог',
]
const Header = () => {
  const navigate = useNavigate()
  const { registerUser } = useAppSelector((state) => state.signInSlice)
  const { userData } = useAppSelector((state) => state.userSlice)
  const [activeNaw, setActiveNaw] = useState('')
  const [openPanel, setOpenPanel] = useState(false)
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        {registerUser ? (
          <div className={styles.UserPanel}>
            <div className={styles.userName}>
              {userData?.given_name[0].toLocaleUpperCase()}
            </div>
            <div
              className={styles.arrow}
              onClick={() => setOpenPanel(!openPanel)}
            >
              {openPanel ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
            <UserControl openPanel={openPanel} />
          </div>
        ) : (
          <div className={styles.innerControl}>
            <button
              className={styles.registerBtn}
              onClick={() => navigate('/signup')}
            >
              Зарегистрироваться
            </button>
            <button
              className={styles.loginBtn}
              onClick={() => navigate('/signin')}
            >
              Войти
            </button>
          </div>
        )}
      </div>
      <nav className={styles.naw}>
        {naw.map((value, index) => (
          <div
            onClick={() => setActiveNaw(value)}
            key={index}
            className={classNames(styles.nawItem, {
              [styles.active]: value === activeNaw,
            })}
          >
            {value}
          </div>
        ))}
      </nav>
      <div className={styles.hr}></div>
      <div className={styles.headerButtom}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Сервис подбора, настройки чат-ботов и сценариев их использования
          </h1>
          <div className={styles.innerItem}>
            <div>Готовые решения по сферам и задачам бизнеса</div>
            <div>Самостоятельный подбор чат-ботов по параметрам</div>
            <div>Подберем и настроим чат-ботов под ваши задачи</div>
          </div>
          <button className={styles.btn}>Выбрать шаблон</button>
        </div>
        <img src={headerImg} alt="images" />
      </div>
    </header>
  )
}

export default Header

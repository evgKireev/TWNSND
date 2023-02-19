import styles from './Account.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { NavLink, useNavigate } from 'react-router-dom'
import avatar from '../../assets/img/avatar.png'
import { Edit } from '../../assets/AccountIcons/Edit'
import classNames from 'classnames'
import { useState } from 'react'
import { Close } from '../../assets/AccountIcons/Close'

let badgesArr = [
  'Маркетинг',
  'Реклама',
  'Продажи',
  'Продажи',
  'Маркетинг',
  'Маркетинг',
  'Маркетинг',
]

export const Account = () => {
  //TODO настроить правильный путь кнопки "изменить пароль"
  const navigate = useNavigate()
  const [badges, setBadges] = useState<string[]>(badgesArr)
  const [editName, setEditName] = useState<boolean>(false)
  const [editEmail, setEditEmail] = useState<boolean>(false)

  const [firstName, setFirstName] = useState('')
  const [errorFirstName, setErrorFirstName] = useState<boolean | undefined>(
    undefined
  )
  const [okFirstName, setOkFirstName] = useState<boolean | undefined>(undefined)

  const [lastName, setLastName] = useState('')
  const [errorLastName, setErrorLastName] = useState<boolean | undefined>(
    undefined
  )
  const [okLastName, setOkLastName] = useState<boolean | undefined>(undefined)

  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState<boolean | undefined>(undefined)
  const [okEmail, setOkEmail] = useState<boolean | undefined>(undefined)

  const [country, setCountry] = useState<string>('')

  const [business, setBusiness] = useState<string>('')

  const [role, setRole] = useState<string>('')

  const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
    const re = /^[а-яА-Я]{2}|[a-zA-Z]{2}$/
    if (!re.test(e.target.value)) {
      setErrorFirstName(true)
      setOkFirstName(false)

      if (e.target.value.length < 1) {
        setErrorFirstName(true)
        setOkFirstName(false)
      }
    } else {
      setErrorFirstName(false)
      setOkFirstName(true)
    }
  }

  const lastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
    const re = /^[а-яА-Я]{2}|[a-zA-Z]{2}$/
    if (!re.test(e.target.value)) {
      setErrorLastName(true)
      setOkLastName(false)

      if (e.target.value.length < 1) {
        setErrorLastName(true)
        setOkLastName(false)
      }
    } else {
      setErrorLastName(false)
      setOkLastName(true)
    }
  }

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(e.target.value).toLowerCase())) {
      setErrorEmail(true)
      setOkEmail(false)
    } else {
      setErrorEmail(false)
      setOkEmail(true)
    }
  }

  const removeBadge = (index: number) => {
    const newBadgesArr = [...badges.slice(0, index), ...badges.slice(index + 1)]
    setBadges(newBadgesArr)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>LOGO</div>

        <ul className={styles.menu}>
          <li>
            <a href="/">Главная</a>
          </li>
          <li>
            <a href="#">Сервисы</a>
          </li>
          <li>
            <a href="#">Выбрать шаблон</a>
          </li>
          <li>
            <a href="#">Блог</a>
          </li>
        </ul>

        <div className={styles.userLogo}>A</div>
      </div>

      <ul className={styles.navigation}>
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <li className={styles.item}>Персональные данные</li>
        </NavLink>

        <NavLink
          to="/connection"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <li className={styles.item}>Обратная связь</li>
        </NavLink>

        <NavLink
          to="/task"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <li className={styles.item}>Техническое задание</li>
        </NavLink>
        <NavLink
          to="/pay"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <li className={styles.item}>Оплата и счета</li>
        </NavLink>
        <NavLink
          to="/articles"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <li className={styles.item}>Сохраненные статьи</li>
        </NavLink>
        <NavLink
          to="/templates"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <li className={styles.item}>Мои шаблоны</li>
        </NavLink>
      </ul>

      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={avatar} alt="avatar" />

        <div className={styles.info}>
          <button className={styles.avatarButton}>Загрузить</button>

          <div className={styles.editContainer}>
            <p className={styles.text}>Изменить пароль</p>

            <button onClick={() => navigate('recovery/passord')}>
              <Edit />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.informationContainer}>
        <div className={styles.row}>
          <p className={styles.title}>Имя / Фамилия</p>
          <div className={styles.inputsWrapper}>
            <input
              type="text"
              name="Имя"
              value={firstName}
              onChange={(e) => firstNameHandler(e)}
              className={classNames(styles.inputName, styles.inputsGeneral, {
                [styles.inputError]: editName && errorFirstName,
                [styles.inputOk]: editName && okFirstName,
              })}
            />
            <input
              type="text"
              name="Фамилия"
              value={lastName}
              onChange={(e) => lastNameHandler(e)}
              className={classNames(styles.inputName, styles.inputsGeneral, {
                [styles.inputError]: editName && errorLastName,
                [styles.inputOk]: editName && okLastName,
              })}
            />
          </div>
          <button onClick={() => setEditName(!editName)}>
            <Edit width={52} height={52} />
          </button>
        </div>

        <div className={styles.row}>
          <p className={styles.title}>E-mail</p>
          <div className={styles.inputsWrapper}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => emailHandler(e)}
              className={classNames(styles.inputEmail, styles.inputsGeneral, {
                [styles.inputError]: editEmail && errorEmail,
                [styles.inputOk]: editEmail && okEmail,
              })}
            />
          </div>
          <button onClick={() => setEditEmail(!editEmail)}>
            <Edit width={52} height={52} />
          </button>
        </div>

        <div className={styles.row}>
          <p className={styles.title}>Страна</p>
          <select
            className={styles.select}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="Россия">Россия</option>
            <option value="Россия">Россия</option>
            <option value="Россия">Россия</option>
          </select>
        </div>

        <div className={styles.row}>
          <p className={styles.title}>Сфера бизнеса</p>
          <select
            className={styles.select}
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
          >
            <option value="Онлайн курсы">Онлайн курсы</option>
            <option value="Онлайн курсы">Онлайн курсы</option>
            <option value="Онлайн курсы">Онлайн курсы</option>
          </select>
        </div>

        <div className={styles.row}>
          <p className={styles.title}>Ваша роль</p>
          <select
            className={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Собственник бизнеса">Собственник бизнеса</option>
            <option value="Собственник бизнеса">Собственник бизнеса</option>
            <option value="Собственник бизнеса">Собственник бизнеса</option>
          </select>
        </div>
      </div>

      <p className={styles.title}>Мне интересно</p>

      <div className={styles.badgesContainer}>
        {badges.map((badge, index) => {
          return (
            <div className={styles.badgeWrapper} key={uuidv4()}>
              <div className={styles.badge}>{badge}</div>
              <button
                onClick={() => {
                  removeBadge(index)
                }}
              >
                <Close />
              </button>
            </div>
          )
        })}

        <button className={styles.addBadge}>Добавить</button>
      </div>

      <button className={styles.save}>Сохранить </button>
    </div>
  )
}

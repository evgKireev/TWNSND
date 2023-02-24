import classNames from 'classnames'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import Arrow from '../../assets/img/arow'
import styles from './FormContainer.module.scss'

type FormContainerType = {
  logo: string
  title: string
  link: string
  textLink: string
  text?: string
  children: ReactElement
  className?: string
}

const FormContainer: React.FC<FormContainerType> = ({
  logo,
  title,
  children,
  link,
  textLink,
  text,
  className,
}) => {
  const navigate = useNavigate()

  return (
    <div className={styles.wrap}>
      <div className={classNames(styles.inner, className)}>
        <div className={styles.logo}>{logo}</div>
        <h1 className={styles.title}>{title}</h1>
        <div
          className={classNames(styles.innerLink, {
            [styles.innerLinkNon]: !text,
          })}
          onClick={() => navigate(link)}
        >
          {textLink === 'Войти' || 'Зарегистрироваться' ? (
            <p className={styles.text}>{text}</p>
          ) : null}
          <a className={styles.link} href={link}>
            <div className={styles.linkInner}>
              {textLink === 'Назад' ? <Arrow /> : null}
              {textLink}
            </div>
          </a>
        </div>
        <div>{children}</div>
        {/* <div className={styles.polis}>
        Создавая аккаунт, вы соглашаетесь с
        <span>политикой конфиденциальности и условиями использования LOGO</span>
      </div> */}
      </div>
    </div>
  )
}

export default FormContainer

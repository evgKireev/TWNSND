import { ReactElement } from 'react'
import styles from './FormContainer.module.scss'

type FormContainerType = {
  logo: string
  title: string
  link: string
  textLink: string
  text: string
  children: ReactElement
}

const FormContainer: React.FC<FormContainerType> = ({
  logo,
  title,
  children,
  link,
  textLink,
  text,
}) => {
  console.log(styles)
  return (
    <div className={styles.inner}>
      <div className={styles.logo}>{logo}</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.innerLink}>
        {title === 'Войти' ? <p className={styles.text}>{text}</p> : null}
        <a
          className={styles.link}
          href={link}
        >
          {textLink}
        </a>
      </div>
      <div>{children}</div>
      <div className={styles.polis}>
        Создавая аккаунт, вы соглашаетесь с
        <span>
          политикой конфиденциальности и условиями использования LOGO
        </span>
      </div>
    </div>
  )
}

export default FormContainer

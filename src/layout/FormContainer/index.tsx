import classNames from 'classnames'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
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
  return (
    <div className={styles.wrap}>
      <div className={classNames(styles.inner, className)}>
        <div className={styles.logo}>{logo}</div>
        <h1 className={styles.title}>{title}</h1>
        <div
          className={classNames(styles.innerLink, {
            [styles.innerLinkNon]: !text,
          })}
        >
          {textLink === 'Войти' || 'Зарегистрироваться' ? (
            <p className={styles.text}>{text}</p>
          ) : null}
          <div className={styles.link}>
            <Link
              to={textLink === 'Назад' ? '..' : link}
              className={styles.linkInner}
              relative="path"
            >
              {textLink === 'Назад' ? <Arrow /> : null}
              {textLink}
            </Link>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default FormContainer

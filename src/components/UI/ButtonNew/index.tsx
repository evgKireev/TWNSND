import { FC } from 'react'
import classNames from 'classnames'
import styles from './ButtonNew.module.scss'

export enum ButtonNewTypes {
  Primary = 'primary',
  Secondary = 'secondary',
}

type ButtonNewProps = {
  title: string
  type: ButtonNewTypes
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const ButtonNew: FC<ButtonNewProps> = (props) => {
  const { type, title, onClick, className } = props
  const buttonClassName = styles[type]
  return (
    <button
      className={classNames(styles.button, buttonClassName, className)}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default ButtonNew

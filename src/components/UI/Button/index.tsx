import { FC, ReactElement } from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'

export enum ButtonTypes {
  Primary = 'primary',
  Secondary = 'secondary',
  Icons = 'icons',
}

type ButtonProps = {
  title: string | ReactElement
  type: ButtonTypes
  onClick?: () => void
  className?: string
  disabled?: boolean
  icon?: JSX.Element
}

const Button: FC<ButtonProps> = (props) => {
  const { type, title, onClick, className, disabled, icon } = props
  const buttonClassName = styles[type]
  return (
    <button
      className={classNames(styles.button, buttonClassName, className, {
        [styles.disabled]: !!disabled,
      })}
      onClick={onClick}
    >
      {icon}
      {title}
    </button>
  )
}

export default Button

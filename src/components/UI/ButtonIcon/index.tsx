import { FC } from 'react'
import classNames from 'classnames'
import styles from './ButtonIcon.module.scss'

export enum ButtonTypesIcon {
  FB = 'facebook',
  G = 'google',
  VK = 'vkontakte',
}

type ButtonPropsIcon = {
  type: ButtonTypesIcon
  onClick?: () => void
  disabled: boolean
  icon: JSX.Element
}

const ButtonIcon: FC<ButtonPropsIcon> = (props) => {
  const { type, onClick, disabled, icon } = props

  const buttonClassName = styles[type]

  return (
    <div
      className={classNames(styles.button, buttonClassName, {
        [styles.disabled]: !!disabled,
      })}
      onClick={onClick}
    >
      <div> {icon}</div>
    </div>
  )
}

export default ButtonIcon

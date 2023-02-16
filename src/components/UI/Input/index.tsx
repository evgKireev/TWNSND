import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import classNames from 'classnames'
import styles from './Input.module.scss'
import { useState } from 'react'

type InputType = {
  typeInput: InputTypeEnum
  disabled: boolean
  name: string
  labelText: string
  type?: string
  className?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

export enum InputTypeEnum {
  Password = 'password',
  Email = 'email',
  LastName = 'lastname',
  FirstName = 'firstname',
}

const Input: React.FC<InputType> = ({
  type,
  labelText,
  className,
  disabled,
  typeInput,
  value,
  name,
  onChange,
  onBlur,
}) => {
  const inputStyles = styles[typeInput]
  const [checkPassword, setCheckPassword] = useState(false)

  return (
    <div className={styles.wrap}>
      <input
        id="text1"
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        name={name}
        type={checkPassword ? 'text' : type}
        className={classNames(styles.input, inputStyles, className, {
          [styles.disabled]: disabled,
        })}
      >
        
      </input>

      <label
        className={classNames(styles.label, {
          [styles.setlabel]: value,
          [styles.eldiz]: typeInput === 'lastname',
        })}
        htmlFor="text1"
      >
        {labelText}
      </label>
      {typeInput === 'password' && (
        <div
          className={styles.eye}
          onClick={() => setCheckPassword(!checkPassword)}
        >
          {checkPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </div>
      )}
      {typeInput === 'password' && (
        <span className={styles.infoPassword}>
          *Пароль должен содержать минимум 8 символов
        </span>
      )}
    </div>
  )
}

export default Input

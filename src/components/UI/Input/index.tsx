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
  error?: boolean | undefined
  okValidat?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

export enum InputTypeEnum {
  Password = 'password',
  ConfirmPassword = 'confirm',
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
  error,
  okValidat,
  onChange,
  onBlur,
}) => {
  const inputStyles = styles[typeInput]
  const [checkPassword, setCheckPassword] = useState(false)

  return (
    <div className={styles.wrap}>
      <input
        id={typeInput}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        name={name}
        type={checkPassword ? 'text' : type}
        className={classNames(styles.input, inputStyles, className, {
          [styles.disabled]: disabled,
          [styles.errorInput]: error,
          [styles.okInput]: okValidat,
        })}
      >
        
      </input>

      <label
        className={classNames(styles.label, {
          [styles.setlabel]: value,
          [styles.errorLabel]: error,
          [styles.eldiz]: typeInput === 'lastname',
          [styles.setlabelPassword]:
            (typeInput === 'password' || typeInput === 'confirm') && value,
          [styles.setlabelName]:
            (typeInput === 'lastname' || typeInput === 'ferstname') && value,
        })}
        htmlFor="text1"
      >
        {labelText}
      </label>
      {(typeInput === 'password' || typeInput === 'confirm') && (
        <div
          className={styles.eye}
          onClick={() => setCheckPassword(!checkPassword)}
        >
          {checkPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </div>
      )}
    </div>
  )
}

export default Input

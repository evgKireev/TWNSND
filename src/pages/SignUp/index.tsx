import { useState } from 'react'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import styles from './SignUp.module.scss'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ferstName, setFerstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [ferstNameDirty, setFerstNameDirty] = useState(false)
  const [emailError, setEmailError] = useState('E-mail не может быть пустым')
  const [passwordError, setPasswordError] = useState(
    '*Пароль должен содержать минимум 8 символов'
  )
  const [ferstNameError, setFerstNameError] = useState(
    '*Это поле обязательно к заполнению'
  )

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'Пароль':
        setPasswordDirty(true)
        break
      case 'E-mail':
        setEmailDirty(true)
        break
      case 'Имя':
        setFerstNameDirty(true)
    }
  }

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError(
        '*Электронная почта должна быть в допустимом формате электронной почты (например, username@coolexample.com). Пожалуйста, попробуйте еще раз.'
      )
    } else {
      setEmailError('')
    }
  }

  const passworwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.length < 8) {
      setPasswordError('*Пароль должен содержать минимум 8 символов')
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
      }
    } else {
      setPasswordError('')
    }
  }

  const ferstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFerstName(e.target.value)
    if (!e.target.value) {
      setPasswordError('Имя не может быть пустым')
    } else {
      setPasswordError('')
    }
  }
  return (
    <div>
      <Input
        onBlur={blurHandler}
        type="password"
        labelText={'Пароль'}
        name={'Пароль'}
        disabled={false}
        typeInput={InputTypeEnum.Password}
        value={password}
        onChange={(e) => passworwHandler(e)}
      />
      {passwordDirty && passwordError && (
        <div className={styles.errorMessage}>{passwordError}</div>
      )}
      <Input
        onBlur={blurHandler}
        type="text"
        labelText={'E-mail'}
        name={'E-mail'}
        disabled={false}
        typeInput={InputTypeEnum.Email}
        value={email}
        onChange={(e) => emailHandler(e)}
      />
      {emailDirty && emailError && (
        <div className={styles.errorMessage}>{emailError}</div>
      )}
      <Input
        onBlur={blurHandler}
        type="text"
        labelText={'Имя'}
        name={'Имя'}
        disabled={false}
        typeInput={InputTypeEnum.FerstName}
        value={ferstName}
        onChange={(e) => ferstNameHandler(e)}
      />
      {ferstNameDirty && ferstNameError && (
        <div className={styles.errorMessage}>{ferstNameError}</div>
      )}

      <Input
        onBlur={() => {}}
        type="text"
        labelText={'Фамилия'}
        name={'Фамилия'}
        disabled={false}
        typeInput={InputTypeEnum.LastName}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
  )
}

export default SignUp

import { useEffect, useState } from 'react'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import FormContainer from '../../layout/FormContainer/index'
import styles from './SignUp.module.scss'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [ferstName, setFerstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [passworConfirmdDirty, setPasswordConfirmDirty] = useState(false)
  const [ferstNameDirty, setFerstNameDirty] = useState(false)
  const [okPassword, setOkPassword] = useState<boolean | undefined>(undefined)
  const [okPasswordConfirm, setOkPasswordConfirm] = useState<
    boolean | undefined
  >(undefined)
  const [okMail, setOkMail] = useState<boolean | undefined>(undefined)
  const [okName, setOkName] = useState<boolean | undefined>(undefined)
  const [emailError, setEmailError] = useState('*E-mail не может быть пустым')
  const [passwordError, setPasswordError] = useState(
    '*Пароль должен содержать минимум 8 символов'
  )
  const [passwordConfirmError, setPasswordConfirmError] = useState(
    '*Пароль должен содержать минимум 8 символов'
  )
  const [ferstNameError, setFerstNameError] = useState(
    '*Это поле обязательно к заполнению'
  )
  const [validForm, setValidForm] = useState(false)
  useEffect(() => {
    if (emailError || passwordError || passwordConfirmError || ferstNameError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [emailError, passwordError, passwordConfirmError, ferstNameError])

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'Пароль':
        setPasswordDirty(true)
        break
      case 'Подтвердите пароль':
        setPasswordConfirmDirty(true)
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
      setOkMail(false)
    } else {
      setEmailError('')
      setOkMail(true)
    }
  }

  const passworwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.length < 8) {
      setPasswordError('*Пароль должен содержать минимум 8 символов')
      setOkPassword(false)
      if (!e.target.value) {
        setPasswordError('*Пароль не может быть пустым')
        setOkPassword(false)
      }
    } else {
      setPasswordError('')
      setOkPassword(true)
    }
  }

  const passworwConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value)
    if (e.target.value.length < 8) {
      setPasswordConfirmError('*Пароль должен содержать минимум 8 символов')
      setOkPasswordConfirm(false)
      if (!e.target.value) {
        setPasswordConfirmError('*Пароль не может быть пустым')
        setOkPasswordConfirm(false)
      }
      if (e.target.value !== password) {
        setPasswordConfirmError('*Пароль не совпадает')
        setOkPasswordConfirm(false)
      }
    } else {
      setPasswordConfirmError('')
      setOkPasswordConfirm(true)
    }
  }

  const ferstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFerstName(e.target.value)
    if (!e.target.value) {
      setFerstNameError('*Имя не может быть пустым')
      setOkName(false)
    } else {
      setFerstNameError('')
      setOkName(true)
    }
  }

  return (
    <FormContainer
      logo={'LOGO'}
      title={'Создать аккаунт'}
      link={'/signup'}
      textLink={'< Назад'}
      text={''}
    >
      <div className={styles.innerInput}>
        <div className={styles.innerName}>
          <div className={styles.label}>
            <Input
              onBlur={blurHandler}
              type="text"
              labelText={'Имя'}
              name={'Имя'}
              disabled={false}
              typeInput={InputTypeEnum.FerstName}
              value={ferstName}
              onChange={(e) => ferstNameHandler(e)}
              error={Boolean(ferstNameDirty && ferstNameError)}
              okValidat={okName}
            />
            {ferstNameDirty && ferstNameError && (
              <div className={styles.errorMessage}>{ferstNameError}</div>
            )}
          </div>
          <div className={styles.label}>
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
        </div>
        <div className={styles.label}>
          <Input
            onBlur={blurHandler}
            type="text"
            labelText={'E-mail'}
            name={'E-mail'}
            disabled={false}
            typeInput={InputTypeEnum.Email}
            value={email}
            onChange={(e) => emailHandler(e)}
            error={Boolean(emailDirty && emailError)}
            okValidat={okMail}
          />
          {emailDirty && emailError && (
            <div className={styles.errorMessage}>{emailError}</div>
          )}
        </div>
        <div className={styles.label}>
          <Input
            onBlur={blurHandler}
            type="password"
            labelText={'Пароль'}
            name={'Пароль'}
            disabled={false}
            typeInput={InputTypeEnum.Password}
            value={password}
            onChange={(e) => passworwHandler(e)}
            error={Boolean(passwordDirty && passwordError)}
            okValidat={okPassword}
          />
          {passwordDirty && passwordError ? (
            <div className={styles.errorMessage}>{passwordError}</div>
          ) : (
            <div className={styles.passwordInfo}>
              *Пароль должен содержать минимум 8 символов
            </div>
          )}
        </div>
        <div className={styles.label}>
          <Input
            onBlur={blurHandler}
            type="password"
            labelText={'Подтвердите пароль'}
            name={'Подтвердите пароль'}
            disabled={false}
            typeInput={InputTypeEnum.ConfirmPassword}
            value={passwordConfirm}
            onChange={(e) => passworwConfirmHandler(e)}
            error={Boolean(passworConfirmdDirty && passwordConfirmError)}
            okValidat={okPasswordConfirm}
          />
          {passworConfirmdDirty && passwordConfirmError && (
            <div className={styles.errorMessage}>{passwordConfirmError}</div>
          )}
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" />
          <span>Запомнить пароль</span>
        </div>
        <Button
          disabled={!validForm}
          title={'Создать аккаунт'}
          type={ButtonTypes.Secondary}
        />
      </div>
    </FormContainer>
  )
}

export default SignUp
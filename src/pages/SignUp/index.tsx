import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer/index'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getRegisterUser, setEmail } from '../../redux/SignUser/signUpSlice'
import styles from './SignUp.module.scss'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { email } = useAppSelector((state) => state.signUpSlice)
  const { errorMessagesRegistration } = useAppSelector(
    (state) => state.signUpSlice
  )
  const { statusRegisterUser } = useAppSelector((state) => state.statusSlice)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [passwordConfirmDirty, setPasswordConfirmDirty] = useState(false)
  const [firstNameDirty, setFirstNameDirty] = useState(false)
  const [okPassword, setOkPassword] = useState<boolean | undefined>(undefined)
  const [okPasswordConfirm, setOkPasswordConfirm] = useState<
    boolean | undefined
  >(undefined)
  const [okMail, setOkMail] = useState<boolean | undefined>(undefined)
  const [okName, setOkName] = useState<boolean | undefined>(undefined)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')
  const [ferstNameError, setFerstNameError] = useState('')

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
        setFirstNameDirty(true)
    }
  }

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value))
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
    const re =
      /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[A-ZА-Я])[0-9a-zA-Z!@#$%^&*_]{8,}/g
    if (!re.test(e.target.value)) {
      setPasswordError(
        '*Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 спецсимвол, 1 цифру'
      )
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
    const re =
      /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[A-ZА-Я])[0-9a-zA-Z!@#$%^&*_]{8,}/g
    if (!re.test(e.target.value)) {
      setPasswordConfirmError(
        '*Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 спецсимвол, 1 цифру'
      )
      setOkPasswordConfirm(false)
      if (!e.target.value) {
        setPasswordConfirmError('*Пароль не может быть пустым')
        setOkPasswordConfirm(false)
      }
    } else if (e.target.value !== password) {
      setPasswordConfirmError('*Пароль не совпадает')
      setOkPasswordConfirm(false)
    } else {
      setPasswordConfirmError('')
      setOkPasswordConfirm(true)
    }
  }

  const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
    const re = /^[а-яА-Я]{2}|[a-zA-Z]{2}$/
    if (!re.test(e.target.value)) {
      setFerstNameError('*Имя должно содержать минимум 2 символа')
      setOkName(false)
      if (e.target.value.length < 1) {
        setFerstNameError('*Имя должно содержать минимум 2 символа')
        setOkName(false)
      }
    } else {
      setFerstNameError('')
      setOkName(true)
    }
  }

  const registerUserHandler = () => {
    if (firstName && email && password && passwordConfirm) {
      dispatch(
        getRegisterUser({
          data: {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password,
            ConfirmPassword: passwordConfirm,
          },
          callback: () => {
            navigate('/confirm/password')
          },
        })
      )
    } else {
      if (!firstName && !email && !password && !passwordConfirm) {
        setPasswordError('*Пароль не может быть пустым')
        setPasswordConfirmError('*Пароль не может быть пустым')
        setEmailError('*Введите электронную почту')
        setFerstNameError('*Имя должно содержать минимум 2 символа')
        setOkPasswordConfirm(false)
        setOkPassword(false)
        setOkMail(false)
        setOkName(false)
        setPasswordDirty(true)
        setPasswordConfirmDirty(true)
        setFirstNameDirty(true)
        setEmailDirty(true)
      }
      if (!email) {
        setEmailError('*Введите электронную почту')
        setOkMail(false)
        setEmailDirty(true)
      }
      if (!password) {
        setPasswordError('*Пароль не может быть пустым')
        setOkPassword(false)
        setPasswordDirty(true)
      }
      if (!passwordConfirm) {
        setPasswordConfirmError('*Пароль не может быть пустым')
        setOkPasswordConfirm(false)
        setPasswordConfirmDirty(true)
      }
      if (!firstName) {
        setFerstNameError('*Имя должно содержать минимум 2 символа')
        setOkName(false)
        setFirstNameDirty(true)
      }
    }
  }

  const validForm = useMemo(() => {
    return okPassword && okPasswordConfirm && okMail && okName
  }, [okPassword, okPasswordConfirm, okMail, okName])
  return statusRegisterUser === 'pending' ? (
    <Loader />
  ) : (
    <FormContainer
      logo={'LOGO'}
      title={'Создать аккаунт'}
      link={'/signup'}
      textLink={'Назад'}
      text={''}
    >
      <div>
        <div className={styles.innerInput}>
          <div className={styles.innerName}>
            <div className={styles.label}>
              <Input
                onBlur={blurHandler}
                type="text"
                labelText={'Имя'}
                name={'Имя'}
                disabled={false}
                typeInput={InputTypeEnum.FirstName}
                value={firstName}
                onChange={(e) => firstNameHandler(e)}
                error={Boolean(firstNameDirty && ferstNameError)}
                okValidat={okName}
              />
              {firstNameDirty && ferstNameError && (
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
            {!!errorMessagesRegistration ? (
              <div className={styles.errorMessage}>
                {errorMessagesRegistration}
              </div>
            ) : null}
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
            {passwordDirty && passwordError && (
              <div className={styles.errorMessage}>{passwordError}</div>
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
              error={Boolean(passwordConfirmDirty && passwordConfirmError)}
              okValidat={okPasswordConfirm}
            />
            {passwordConfirmDirty && passwordConfirmError && (
              <div className={styles.errorMessage}>{passwordConfirmError}</div>
            )}
          </div>
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" />
          <span>Запомнить пароль</span>
        </div>
        <Button
          disabled={!validForm}
          title={'Создать аккаунт'}
          type={ButtonTypes.Secondary}
          onClick={registerUserHandler}
        />
      </div>
    </FormContainer>
  )
}

export default SignUp

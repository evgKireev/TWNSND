import { divide } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer/index'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  getMailRegisterUser,
  getRegisterUser,
  setEmail,
} from '../../redux/SignUser/signUpSlice'
import API from '../../redux/utils/API'
import styles from './SignUp.module.scss'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { email } = useAppSelector((state) => state.signUpSlice)
  const { errorMessagesRegistration } = useAppSelector(
    (state) => state.signUpSlice
  )
  const { statusRegisterUser } = useAppSelector((state) => state.statusSlice)
  const { userId } = useAppSelector((state) => state.signUpSlice)
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
      /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{8,}/g
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
      /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{8,}/g
    if (!re.test(e.target.value)) {
      setPasswordConfirmError(
        '*Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 спецсимвол, 1 цифру'
      )
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
          navigate(`${API}/confirm/password`)
        },
      })
    )
  }

  useEffect(() => {}, [statusRegisterUser])

  return statusRegisterUser === 'pending' ? (
    <Loader />
  ) : (
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
            error={Boolean(passwordConfirmDirty && passwordConfirmError)}
            okValidat={okPasswordConfirm}
          />
          {passwordConfirmDirty && passwordConfirmError && (
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
          onClick={registerUserHandler}
        />
      </div>
    </FormContainer>
  )
}

export default SignUp

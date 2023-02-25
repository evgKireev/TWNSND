import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { linkGoogle } from '../../@types/constant'
import Facebook from '../../assets/SocialMediaIcons/Facebook'
import { GoogleIcon } from '../../assets/SocialMediaIcons/GoogleIcon'
import Vk from '../../assets/SocialMediaIcons/Vk'
import Button, { ButtonTypes } from '../../components/UI/Button'
import ButtonIcon, { ButtonTypesIcon } from '../../components/UI/ButtonIcon'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import { useWindowSize } from '../../hooks/useWindowsSize'
import FormContainer from '../../layout/FormContainer/index'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  getSignInUser,
  setRememberPassword,
} from '../../redux/SignUser/signInSlice'
import styles from './SignIn.module.scss'

const SignIn = () => {
  const { width = 0 } = useWindowSize()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [okPassword, setOkPassword] = useState<boolean | undefined>(undefined)
  const [okMail, setOkMail] = useState<boolean | undefined>(undefined)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const { rememberPassword } = useAppSelector((state) => state.signInSlice)

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'Пароль':
        setPasswordDirty(true)
        break

      case 'E-mail':
        setEmailDirty(true)
        break
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
    if (!e.target.value) {
      setPasswordError('*Пароль не может быть пустым')
      setOkPassword(false)
    } else {
      setPasswordError('')
      setOkPassword(true)
    }
  }

  const onSubmit = () => {
    if (email && password) {
      dispatch(
        getSignInUser({
          data: { email, password },
          rememberPassword,
          callback: (link) => {
            navigate(link)
          },
        })
      )
      dispatch(setRememberPassword(true))
    } else {
      if (!email && !password) {
        setPasswordError('*Пароль не может быть пустым')
        setEmailError('*Введите электронную почту')
        setOkPassword(false)
        setOkMail(false)
        setPasswordDirty(true)
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
    }
  }

  useEffect(() => {
    if (emailError && passwordError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [emailError, passwordError])

  return (
    <FormContainer
      logo={'LOGO'}
      title={'Войти'}
      link={'/signup/mail'}
      textLink={'Зарегистрироваться'}
      text={'Нет аккаунта?'}
    >
      <div className={styles.innerContainer}>
        <div className={styles.innerInput}>
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
            {passwordDirty && passwordError && (
              <div className={styles.errorMessage}>{passwordError}</div>
            )}
          </div>
        </div>

        <div
          className={styles.checkbox}
          onChange={() => dispatch(setRememberPassword(!rememberPassword))}
        >
          <input type="checkbox" />
          <span>Запомнить пароль</span>
        </div>

        <Button
          disabled={!validForm}
          title={' Войти'}
          type={ButtonTypes.Secondary}
          onClick={onSubmit}
        />

        <p className={styles.text}>
          {width > 320 ? 'или войдите с помощью' : 'Или'}
        </p>

        <div className={styles.iconsContainer}>
          <ButtonIcon
            type={ButtonTypesIcon.FB}
            onClick={() => {}}
            disabled={false}
            icon={<Facebook />}
          />
          <a href={linkGoogle}>
            <ButtonIcon
              type={ButtonTypesIcon.G}
              onClick={() => {}}
              disabled={false}
              icon={<GoogleIcon />}
            />
          </a>
          <ButtonIcon
            type={ButtonTypesIcon.VK}
            onClick={() => {}}
            disabled={false}
            icon={<Vk />}
          />
        </div>
        <div className={styles.innerLink}>
          <p className={styles.textLink}>Забыли пароль?</p>
          <div
            className={styles.link}
            onClick={() => navigate('/signin/restore/passord')}
          >
            Восстановить пароль
          </div>
        </div>
      </div>
    </FormContainer>
  )
}

export default SignIn

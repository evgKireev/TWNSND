import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getRegisterUserGoogle } from '../../redux/SignUser/signUpSlice'
import styles from './CheckPasswordSocial.module.scss'

const CheckPasswordSocial = () => {
  const redirectUriGoogle = 'http://localhost:3000'
  const { email } = useAppSelector((state) => state.signUpSlice)
  const { code } = useAppSelector((state) => state.signUpSlice)
  const { statusRegisterUserGoogle } = useAppSelector(
    (state) => state.statusSlice
  )
  const [password, setPassword] = useState('')
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [okPassword, setOkPassword] = useState<boolean | undefined>(undefined)
  const [passwordError, setPasswordError] = useState('')
  const [validForm, setValidForm] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'Пароль':
        setPasswordDirty(true)
        break
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
    if (password) {
      dispatch(
        getRegisterUserGoogle({
          data: {
            redirectUriGoogle,
            code,
            localEmail: email,
            localPassword: password,
          },
          callback: (link) => {
            navigate(link)
          },
        })
      )
    } else {
      if (!password) {
        setPasswordError('*Пароль не может быть пустым')
        setOkPassword(false)
        setPasswordDirty(true)
      }
    }
  }

  useEffect(() => {
    if (passwordError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [passwordError])
  return statusRegisterUserGoogle === 'pending' ? (
    <Loader />
  ) : (
    <FormContainer
      logo={'Logo'}
      title={'Проверка пароля'}
      link={'/'}
      textLink={'Домой'}
    >
      <div className={styles.inner}>
        <div>
          Аккаунт с email {email} уже существует. Войдите в него, чтобы
          привязать Google.
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
        <Button
          disabled={!validForm}
          title={' Войти'}
          type={ButtonTypes.Secondary}
          onClick={onSubmit}
        />
      </div>
    </FormContainer>
  )
}

export default CheckPasswordSocial

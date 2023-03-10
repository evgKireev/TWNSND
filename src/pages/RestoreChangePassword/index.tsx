import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button, { ButtonTypes } from '../../components/UI/Button'
import ErrorInput from '../../components/UI/ErrorInput'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer/index'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getRestoreChangePassword } from '../../redux/SignUser/signInSlice'
import { PathNames } from '../Router/Router'
import styles from './RestoreChangePassword.module.scss'

const RestoreChangePassword = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPasswordDirty, setNewPasswordDirty] = useState(false)
  const [passwordConfirmDirty, setPasswordConfirmDirty] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')
  const [okPassword, setOkPassword] = useState<boolean | undefined>(undefined)
  const [okPasswordConfirm, setOkPasswordConfirm] = useState<
    boolean | undefined
  >(undefined)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const email = searchParams.get('email')
  const code = searchParams.get('code')
  const formattedCode = code ? code.replace(/\s/g, '+') : null
  const dispatch = useAppDispatch()
  const { statusRestoreChangePassword } = useAppSelector(
    (state) => state.statusSlice
  )
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'Пароль':
        setNewPasswordDirty(true)
        break
      case 'Подтвердите пароль':
        setPasswordConfirmDirty(true)
    }
  }

  const passworwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
    const re =
      /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[A-Za-zА-Яа-я])[0-9а-яА-ЯёЁa-zA-Z!@#$%^&*_]{8,}/g
    if (!re.test(e.target.value)) {
      setPasswordError(
        '*Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 спецсимвол, 1 цифру.'
      )
      setOkPassword(false)
      if (!e.target.value) {
        setPasswordError('*Пароль не может быть пустым.')
        setOkPassword(false)
      }
    } else {
      setPasswordError('')
      setOkPassword(true)
    }
  }

  const passworwConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    const re =
      /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[A-Za-zА-Яа-я])[0-9а-яА-ЯёЁa-zA-Z!@#$%^&*_]{8,}/g
    if (!re.test(e.target.value)) {
      setPasswordConfirmError(
        '*Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 спецсимвол, 1 цифру.'
      )
      setOkPasswordConfirm(false)
      if (!e.target.value) {
        setPasswordConfirmError('*Пароль не может быть пустым.')
        setOkPasswordConfirm(false)
      }
    } else if (e.target.value !== newPassword) {
      setPasswordConfirmError('*Пароль не совпадает.')
      setOkPasswordConfirm(false)
    } else {
      setPasswordConfirmError('')
      setOkPasswordConfirm(true)
    }
  }

  const newPasswordHandler = () => {
    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordConfirmError('*Пароль не совпадает.')
        setOkPasswordConfirm(false)
      } else {
        dispatch(
          getRestoreChangePassword({
            data: {
              Email: email,
              Password: newPassword,
              ConfirmPassword: confirmPassword,
              Code: formattedCode,
            },
            callback: (link) => navigate(link),
          })
        )
      }
    } else {
      if (!newPassword && !confirmPassword) {
        setPasswordError('*Пароль не может быть пустым.')
        setPasswordConfirmError('*Пароль не может быть пустым.')
        setOkPasswordConfirm(false)
        setOkPassword(false)
        setPasswordConfirmDirty(true)
        setNewPasswordDirty(true)
      }
      if (!newPassword) {
        setPasswordError('*Пароль не может быть пустым.')
        setOkPassword(false)
        setNewPasswordDirty(true)
      }
      if (!confirmPassword) {
        setPasswordConfirmError('*Пароль не может быть пустым.')
        setOkPasswordConfirm(false)
        setPasswordConfirmDirty(true)
      }
    }
  }

  const validForm = useMemo(() => {
    return okPassword && okPasswordConfirm
  }, [okPassword, okPasswordConfirm])

  return statusRestoreChangePassword === 'pending' ? (
    <Loader />
  ) : (
    <FormContainer
      logo={'LOGO'}
      title={'Восстановление пароля'}
      link={PathNames.RestorePassword}
      textLink={'Назад'}
    >
      {statusRestoreChangePassword === 'fullfilled' ? (
        <div className={styles.messageOk}>Ваш пароль был успешно изменен</div>
      ) : (
        <div className={styles.innerContainer}>
          <div className={styles.innerInput}>
            <div className={styles.label}>
              <div className={styles.innerText}>Введите новый пароль</div>
              <Input
                onBlur={blurHandler}
                type="password"
                labelText={'Пароль'}
                name={'Пароль'}
                disabled={false}
                typeInput={InputTypeEnum.Password}
                value={newPassword}
                onChange={(e) => passworwHandler(e)}
                error={Boolean(newPasswordDirty && passwordError)}
                okValidat={okPassword}
              />
              {newPasswordDirty && passwordError && (
                <ErrorInput errorMessage={passwordError} />
              )}
            </div>
            <div className={styles.label}>
              <Input
                onBlur={blurHandler}
                type="password"
                labelText={'Подтвердите пароль'}
                name={'Подтвердите пароль'}
                disabled={false}
                typeInput={InputTypeEnum.Password}
                value={confirmPassword}
                onChange={(e) => passworwConfirmHandler(e)}
                error={Boolean(passwordConfirmDirty && passwordError)}
                okValidat={okPasswordConfirm}
              />
              {passwordConfirmDirty && passwordConfirmError && (
                <ErrorInput errorMessage={passwordConfirmError} />
              )}
            </div>
          </div>
          <Button
            disabled={!validForm}
            title={'Сохранить новый пароль'}
            type={ButtonTypes.Secondary}
            onClick={newPasswordHandler}
          />
        </div>
      )}
    </FormContainer>
  )
}

export default RestoreChangePassword

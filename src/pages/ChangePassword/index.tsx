import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer/index'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getChangePassword } from '../../redux/SignUser/signInSlice'
import styles from './ChangePassword.module.scss'

const ChangePassword = () => {
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPasswordDirty, setNewPasswordDirty] = useState(false)
  const [passwordConfirmDirty, setPasswordConfirmDirty] = useState(false)
  const [oldPasswordDirty, setOldPasswordDirty] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')
  const [oldPasswordError, setOldPasswordError] = useState('')
  const [okPassword, setOkPassword] = useState<boolean | undefined>(undefined)
  const [okPasswordConfirm, setOkPasswordConfirm] = useState<
    boolean | undefined
  >(undefined)
  const [okOldPassword, setOldOkPassword] = useState<boolean | undefined>(
    undefined
  )
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
        break
      case 'Текущий пароль':
        setPasswordConfirmDirty(true)
    }
  }

  const oldPassworwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value)
    if (!e.target.value) {
      setOldPasswordError('*Пароль не может быть пустым')
      setOldOkPassword(false)
    } else {
      setOldPasswordError('')
      setOldOkPassword(true)
    }
  }

  const passworwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
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
    setConfirmPassword(e.target.value)
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
    } else if (e.target.value !== newPassword) {
      setPasswordConfirmError('*Пароль не совпадает')
      setOkPasswordConfirm(false)
    } else {
      setPasswordConfirmError('')
      setOkPasswordConfirm(true)
    }
  }

  const newPasswordHandler = () => {
    if (newPassword && confirmPassword && oldPassword) {
      dispatch(
        getChangePassword({
          data: {
            OldPassword: oldPassword,
            NewPassword: newPassword,
            NewPasswordConfirmation: confirmPassword,
          },
          callback: (link) => navigate(link),
        })
      )
    } else {
      if (!newPassword && !confirmPassword && !oldPassword) {
        setPasswordError('*Пароль не может быть пустым')
        setPasswordConfirmError('*Пароль не может быть пустым')
        setOldPasswordError('*Пароль не может быть пустым')
        setOkPasswordConfirm(false)
        setOkPassword(false)
        setOldOkPassword(false)
        setPasswordConfirmDirty(true)
        setNewPasswordDirty(true)
        setOldPasswordDirty(true)
      }
      if (!newPassword) {
        setPasswordError('*Пароль не может быть пустым')
        setOkPassword(false)
        setNewPasswordDirty(true)
      }
      if (!confirmPassword) {
        setPasswordConfirmError('*Пароль не может быть пустым')
        setOkPasswordConfirm(false)
        setPasswordConfirmDirty(true)
      }
      if (!oldPassword) {
        setOldPasswordError('*Пароль не может быть пустым')
        setOldOkPassword(false)
        setOldPasswordDirty(true)
      }
    }
  }

  const validForm = useMemo(() => {
    return okPassword && okPasswordConfirm && okOldPassword
  }, [okPassword, okPasswordConfirm, okOldPassword])

  return statusRestoreChangePassword === 'pending' ? (
    <Loader />
  ) : (
    <FormContainer
      logo={'LOGO'}
      title={'Восстановление пароля'}
      link={'/signin/restore/passord'}
      textLink={'Назад'}
    >
      {statusRestoreChangePassword === 'fullfilled' ? (
        <div className={styles.messageOk}>Ваш пароль был успешно изменен</div>
      ) : (
        <div className={styles.innerContainer}>
          <div className={styles.innerInput}>
            <div className={styles.label}>
              <div className={styles.innerText}>Введите ваш текущий пароль</div>
              <Input
                onBlur={blurHandler}
                type="password"
                labelText={'Пароль'}
                name={'Текущий пароль'}
                disabled={false}
                typeInput={InputTypeEnum.Password}
                value={oldPassword}
                onChange={(e) => oldPassworwHandler(e)}
                error={Boolean(oldPasswordDirty && oldPasswordError)}
                okValidat={okOldPassword}
              />
              {oldPasswordDirty && oldPasswordError && (
                <div className={styles.errorMessage}>{oldPasswordError}</div>
              )}
            </div>
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
                typeInput={InputTypeEnum.Password}
                value={confirmPassword}
                onChange={(e) => passworwConfirmHandler(e)}
                error={Boolean(passwordConfirmDirty && passwordError)}
                okValidat={okPasswordConfirm}
              />
              {passwordConfirmDirty && passwordConfirmError && (
                <div className={styles.errorMessage}>
                  {passwordConfirmError}
                </div>
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

export default ChangePassword

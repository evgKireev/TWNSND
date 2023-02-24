import { useEffect, useState } from 'react'
import { MY_URL } from '../../@types/constant'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getRestorePassword } from '../../redux/SignUser/signInSlice'
import styles from './RestorePassword.module.scss'

const RestorePassword = () => {
  const [email, setEmail] = useState('')
  const dispatch = useAppDispatch()
  const [emailDirty, setEmailDirty] = useState(false)
  const [okMail, setOkMail] = useState<boolean | undefined>(undefined)
  const [emailError, setEmailError] = useState('')
  const [validForm, setValidForm] = useState(false)
  const { statusRestorePassword } = useAppSelector((state) => state.statusSlice)
  useEffect(() => {
    if (emailError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [emailError])
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
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

  const recoveryPasswordHandler = () => {
    if (email) {
      dispatch(
        getRestorePassword({
          Email: email,
          ReturnUrl: `${MY_URL}/signin/restore/passord/change`,
        })
      )
    } else {
      if (!email) {
        setEmailError('*Введите электронную почту')
        setOkMail(false)
        setEmailDirty(true)
        setValidForm(false)
      }
    }
  }
  return statusRestorePassword === 'pending' ? (
    <Loader />
  ) : (
    <FormContainer
      logo={'LOGO'}
      title={'Восстановление пароля'}
      textLink={'Назад'}
      link={'/signin'}
    >
      {statusRestorePassword === 'fullfilled' ? (
        <div>
          На {email} отправлено письмо с инструкцией по восстановлению пароля.
          Если вы не получили письмо, то проверьте спам.
        </div>
      ) : (
        <>
          <div className={styles.text}>
            Для восстановления доступа укажите электронную почту, привязанную к
            вашему профилю
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
          <Button
            title={'Далее'}
            type={ButtonTypes.Secondary}
            onClick={recoveryPasswordHandler}
            disabled={!validForm}
          />
        </>
      )}
    </FormContainer>
  )
}

export default RestorePassword

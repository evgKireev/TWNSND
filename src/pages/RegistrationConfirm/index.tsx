import { useEffect } from 'react'
import { API } from '../../@types/constant'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getMailRegisterUser } from '../../redux/SignUser/signUpSlice'
import styles from './RegistrationConfirm.module.scss'

const RegistrationConfirm = () => {
  const { email, userId } = useAppSelector((state) => state.signUpSlice)
  const { statusRegisterUser } = useAppSelector((state) => state.statusSlice)
  const dispatch = useAppDispatch()
  const regisrtationConfirmation = () => {
    dispatch(
      getMailRegisterUser({
        Email: email,
        UserId: userId,
        ReturnUrl: `${API}/confirm/password`,
      })
    )
  }
  if (statusRegisterUser === 'pending') {
    return <Loader />
  }


  return (
    <FormContainer
      logo={''}
      title={'Подтверждение регистрации'}
      link={'/'}
      textLink={'Главная'}
    >
      {statusRegisterUser === 'fullfilled' ? (
        <div className={styles.title}>
          Пожалуйста, активируйте свою учетную запись, с помощью активации
          ссылки в письме {email}. Пожалуйста, проверьте свою электронную почту.
        </div>
      ) : (
        <div>
          <div className={styles.title}>
            Для дальнейшей регистрации, Вам необходимо активировать ссылку,
            которая будет отправлена на Вашу эоектронную почту:{email}.
          </div>
          <Button
            title={'Активировать'}
            type={ButtonTypes.Secondary}
            onClick={regisrtationConfirmation}
          />
        </div>
      )}
    </FormContainer>
  )
}

export default RegistrationConfirm

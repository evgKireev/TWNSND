import { MY_URL } from '../../@types/constant'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getMailRegisterUser } from '../../redux/SignUser/signUpSlice'
import styles from './RegistrationConfirm.module.scss'

const RegistrationConfirm = () => {
  const { email, userId } = useAppSelector((state) => state.signUpSlice)
  const { statusConfirmUser } = useAppSelector((state) => state.statusSlice)
  const dispatch = useAppDispatch()
  const regisrtationConfirmation = () => {
    dispatch(
      getMailRegisterUser({
        Email: email,
        UserId: userId,
        ReturnUrl: `${MY_URL}/success`,
      })
    )
  }
  if (statusConfirmUser === 'pending') {
    return <Loader />
  }
  return (
    <FormContainer
      logo={''}
      title={'Подтверждение регистрации'}
      link={'/'}
      textLink={'Главная'}
    >
      {statusConfirmUser === 'fullfilled' ? (
        <div className={styles.text}>
          Пожалуйста, активируйте свою учетную запись, с помощью активации
          ссылки в письме {email}. Пожалуйста, проверьте свою электронную почту.
        </div>
      ) : (
        <div>
          <div className={styles.text}>
            Для дальнейшей регистрации вам необходимо перейти по ссылке, которая
            будет отправлена на вашу электронную почту {email}. Чтобы получить
            ссылку, нажмите "Активировать".
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

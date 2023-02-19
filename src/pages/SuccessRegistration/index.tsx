import { useNavigate, useParams } from 'react-router-dom'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getRegistrationConfirmUser } from '../../redux/SignUser/signUpSlice'
import styles from './SuccessRegistration.module.scss'

const SuccessRegistration = () => {
  const { statusSuccessUser } = useAppSelector((state) => state.statusSlice)
  const dispatch = useAppDispatch()
  const { id, email, code } = useParams()
  const navigate = useNavigate()
  const regisrtationConfirmation = () => {
    dispatch(
      getRegistrationConfirmUser({
        data: { id, email, code },
        callback: () => navigate('/'),
      })
    )
  }
  return statusSuccessUser === 'pending' ? (
    <Loader />
  ) : (
    <FormContainer
      logo={''}
      title={'Завершение регистрации'}
      link={'/'}
      textLink={''}
      className={styles.comtainer}
    >
      <div>
        <div>
          <Button
            title={'Зарегистрироваться'}
            type={ButtonTypes.Secondary}
            onClick={regisrtationConfirmation}
          />
        </div>
      </div>
    </FormContainer>
  )
}

export default SuccessRegistration

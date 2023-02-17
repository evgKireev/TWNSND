import FormContainer from '../../layout/FormContainer'
import { useAppSelector } from '../../redux/hooks'
import styles from './CheckMail.module.scss'

const CheckMail = () => {
  const { email } = useAppSelector((state) => state.signUpSlice)

  return (
    <FormContainer
      logo={'LOGO'}
      title={'Проверьте вашу почту'}
      textLink={'< Назад'}
      link={'.'}
    >
      <div className={styles.text}>
        На {email} отправлено письмо с инструкцией по восстановлению пароля.
        <br /> Если вы не получили письмо, то проверьте спам.
      </div>
    </FormContainer>
  )
}

export default CheckMail

import FormContainer from '../../layout/FormContainer'
import styles from './CheckMail.module.scss'

const CheckMail = () => {
  return (
    <FormContainer
      logo={'LOGO'}
      title={'Проверьте вашу почту'}
      textLink={'< Назад'}
      link={'/signin'}
    >
      <div className={styles.text}>
        На {'username@coolexample.com'} отправлено письмо с инструкцией по
        восстановлению пароля. <br /> Если вы не получили письмо, то проверьте
        спам.
      </div>
    </FormContainer>
  )
}

export default CheckMail

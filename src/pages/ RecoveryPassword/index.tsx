import { ChangeEvent, FocusEvent, useState } from 'react'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import FormContainer from '../../layout/FormContainer'
import styles from './RecovertPassword.module.scss'

const RecoveryPassword = () => {
  const [email, setEmail] = useState('')
  return (
    <FormContainer
      logo={'LOGO'}
      title={'Восстановление пароля'}
      textLink={'Назад'}
      link={'/signin'}
    >
      <>
        <div className={styles.text}>
          Для восстановления доступа укажите электронную почту, привязанную к
          вашему профилю
        </div>
        <div className={styles.inner}>
          <Input
            typeInput={InputTypeEnum.Email}
            disabled={false}
            name={'E-mail'}
            labelText={'E-mail'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {}}
          />
          <Button
            title={'Далее'}
            type={ButtonTypes.Secondary}
          />
        </div>
      </>
    </FormContainer>
  )
}

export default RecoveryPassword

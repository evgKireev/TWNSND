import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button, { ButtonTypes } from '../../components/UI/Button'
import Input, { InputTypeEnum } from '../../components/UI/Input'
import FormContainer from '../../layout/FormContainer/index'
import styles from './ChangePassword.module.scss'

const ChangePassword = () => {
   const navigate = useNavigate()
   const [password, setPassword] = useState('')
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [okPassword, setOkPassword] = useState<boolean | undefined>(undefined)
   const [passwordError, setPasswordError] = useState('')
   const [passwordDirty, setPasswordDirty] = useState(false)
   const [validForm, setValidForm] = useState(false)
   const [isSent, setSent] = useState(false)

   useEffect(() => {
      if (passwordError) {
         setValidForm(false)
      } else {
         setValidForm(true)
      }
   }, [passwordError])
   
   const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      switch (e.target.name) {
         case 'Пароль':
            setPasswordDirty(true)
         break
      }
   }

   const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
      if (!e.target.value) {
      setPasswordError('*Пароль не может быть пустым')
      setOkPassword(false)
      } else {
      setPasswordError('')
      setOkPassword(true)
      }
   }

   const newPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value)
      if (!e.target.value) {
      setPasswordError('*Пароль не может быть пустым')
      setOkPassword(false)
      } else {
      setPasswordError('')
      setOkPassword(true)
      }
   }

   const confirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value)
      if (!e.target.value) {
      setPasswordError('*Пароль не может быть пустым')
      setOkPassword(false)
      } else {
      setPasswordError('')
      setOkPassword(true)
      }
   }

   const isValid = useMemo( () => {
      return password.length > 0 && newPassword.length > 0 && confirmPassword.length > 0 && newPassword === confirmPassword
   }, [ password, newPassword, confirmPassword ])

   const onSubmit = () => {
      if (password) {
      // TODO: отправляем данные
      } else {
      if (!password) {
         setPasswordError('*Пароль не может быть пустым')
         setOkPassword(false)
         setPasswordDirty(true)
      }
   }
   }

   return (
      <>
         {!isSent ? (

            <FormContainer
            logo={'LOGO'}
            title={'Изменение пароля'}
            link={'/signin/recovery/passord'}
            textLink={'< Назад'}
            >
         <div className={styles.innerContainer}>
            <div className={styles.innerInput}>
               <div className={styles.label}>
                  <div className={styles.innerText}>Введите ваш текущий пароль</div>
                  <Input
                     onBlur={blurHandler}
                     type="password"
                     labelText={'Пароль'}
                     name={'Пароль'}
                     disabled={false}
                     typeInput={InputTypeEnum.Password}
                     value={password}
                     onChange={(e) => passwordHandler(e)}
                     error={Boolean(passwordDirty && passwordError)}
                     okValidat={okPassword}
                  />
                  {passwordDirty && passwordDirty && (
                  <div className={styles.errorMessage}>{passwordError}</div>
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
                     onChange={(e) => newPasswordHandler(e)}
                     error={Boolean(passwordDirty && passwordError)}
                     okValidat={okPassword}
                  />
                     {passwordDirty && passwordError && (
                        <div className={styles.errorMessage}>{passwordError}</div>
                     )}
               </div>
   
               <div className={styles.label}>
                  <Input
                     onBlur={blurHandler}
                     type="password"
                     labelText={'Подтвердите пароль'}
                     name={'Пароль'}
                     disabled={false}
                     typeInput={InputTypeEnum.Password}
                     value={confirmPassword}
                     onChange={(e) => confirmPasswordHandler(e)}
                     error={Boolean(passwordDirty && passwordError)}
                     okValidat={okPassword}
                  />
                     {passwordDirty && passwordError && (
                        <div className={styles.errorMessage}>{passwordError}</div>
                     )}
               </div>
            </div>
   
               <div className={styles.checkbox}>
                  <input type="checkbox" />
                  <span>Запомнить пароль</span>
               </div>
   
            <Button
               disabled={!isValid}
               title={'Сохранить новый пароль'}
               type={ButtonTypes.Secondary}
               onClick={onSubmit}
            />
   
         </div>
      </FormContainer>)
         :
      (<FormContainer
         logo={'LOGO'}
         title={'Ваш пароль был успешно изменен'}
         link={'/signin/recovery/passord'}
         textLink={'< Назад'}
      >
         <span></span>
      </FormContainer>)
}
      </>   
)
}

export default ChangePassword;

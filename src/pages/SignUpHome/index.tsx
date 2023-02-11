import { useNavigate } from 'react-router-dom'
import { FacebookIcon } from '../../assets/SocialMediaIcons/FacebookIcon'
import { GoogleIcon } from '../../assets/SocialMediaIcons/GoogleIcon'
import { MailIcon } from '../../assets/SocialMediaIcons/MailIcon'
import { VKIcon } from '../../assets/SocialMediaIcons/VKIcon'
import Button, { ButtonTypes } from '../../components/UI/Button'
import FormContainer from '../../layout/FormContainer'
import styles from './SignUpHome.module.scss'

const regUser = [
  { title: 'Зарегистрироваться через Google', icon: <GoogleIcon /> },
  { title: 'Зарегистрироваться через Facebook', icon: <FacebookIcon /> },
  { title: 'Зарегистрироваться через Вконтакте', icon: <VKIcon /> },
  {
    title: 'Зарегистрироваться через почту',
    icon: <MailIcon />,
  },
]

const SignUpHome = () => {
  const navigate = useNavigate()
  return (
    <FormContainer
      logo={'Logo'}
      title={'Создать аккаунт'}
      link={''}
      textLink={'Войти'}
      text={'Уже есть аккаунт?'}
    >
      <div className={styles.inner}>
        {regUser.map((value, index) => (
          <Button
            key={index + 1}
            title={value.title}
            type={ButtonTypes.Primary}
            icon={value.icon}
            onClick={() =>
              value.title === 'Зарегистрироваться через почту' &&
              navigate('/signup/mail')
            }
          />
        ))}
      </div>
    </FormContainer>
  )
}

export default SignUpHome

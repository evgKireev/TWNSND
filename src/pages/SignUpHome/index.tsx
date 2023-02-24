import { useNavigate } from 'react-router-dom'
import { MY_URL } from '../../@types/constant'
import { FacebookIcon } from '../../assets/SocialMediaIcons/FacebookIcon'
import { GoogleIcon } from '../../assets/SocialMediaIcons/GoogleIcon'
import { MailIcon } from '../../assets/SocialMediaIcons/MailIcon'
import { VKIcon } from '../../assets/SocialMediaIcons/VKIcon'
import Button, { ButtonTypes } from '../../components/UI/Button'
import FormContainer from '../../layout/FormContainer'
import styles from './SignUpHome.module.scss'

const redirectUriGoogle = MY_URL
const stateGoogle = '1234567890'
const googleId =
  '923826205735-l644r1ke16c87a4agdbs97ceqdmlesb6.apps.googleusercontent.com'
const regUser = [
  {
    title: 'Зарегистрироваться через Google',
    icon: <GoogleIcon />,
    link: `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUriGoogle}&client_id=${googleId}&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=${stateGoogle}`,
  },
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
      link={'/signin'}
      textLink={'Войти'}
      text={'Уже есть аккаунт?'}
    >
      <div className={styles.inner}>
        {regUser.map((value, index) => (
          <a href={value.link} key={index + 1}>
            <Button
              title={value.title}
              type={ButtonTypes.Primary}
              icon={value.icon}
              onClick={() =>
                value.title === 'Зарегистрироваться через почту' &&
                navigate('/signup/mail')
              }
            />
          </a>
        ))}
      </div>
    </FormContainer>
  )
}

export default SignUpHome

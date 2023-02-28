import { useNavigate } from 'react-router-dom'
import { linkGoogle } from '../../@types/constant'
import Facebook from '../../assets/SocialMediaIcons/Facebook'
import { FacebookIcon } from '../../assets/SocialMediaIcons/FacebookIcon'
import { GoogleIcon } from '../../assets/SocialMediaIcons/GoogleIcon'
import { MailIcon } from '../../assets/SocialMediaIcons/MailIcon'
import Vk from '../../assets/SocialMediaIcons/Vk'
import { VKIcon } from '../../assets/SocialMediaIcons/VKIcon'
import Button, { ButtonTypes } from '../../components/UI/Button'
import ButtonIcon, { ButtonTypesIcon } from '../../components/UI/ButtonIcon'
import { useWindowSize } from '../../hooks/useWindowsSize'
import FormContainer from '../../layout/FormContainer'
import styles from './SignUpHome.module.scss'

const regUser = [
  {
    title: 'Зарегистрироваться через Google',
    icon: <GoogleIcon />,
    link: linkGoogle,
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
  const { width = 0 } = useWindowSize()

  return (
    <FormContainer
      logo={'Logo'}
      title={'Создать аккаунт'}
      link={'/signin'}
      textLink={'Войти'}
      text={'Уже есть аккаунт?'}
    >
      {width > 480 ? (
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
      ) : (
        <div className={styles.innerMobile}>
          <a href="/signup/mail">
            <button type="button" className={styles.buttonMailMobile}>
              <MailIcon width="26.67" height="21.33" /> регистрация через E-mail
            </button>
          </a>

          <p className={styles.text}>Или</p>

          <div className={styles.iconsContainer}>
            <ButtonIcon
              type={ButtonTypesIcon.FB}
              disabled={false}
              icon={<Facebook />}
            />
            <a href={linkGoogle}>
              <ButtonIcon
                type={ButtonTypesIcon.G}
                disabled={false}
                icon={<GoogleIcon />}
              />
            </a>
            <ButtonIcon
              type={ButtonTypesIcon.VK}
              disabled={false}
              icon={<Vk />}
            />
          </div>
          <div className={styles.innerLink}>
            <p>Уже есть аккаунт?</p>
            <div className={styles.link} onClick={() => navigate('/signin')}>
              Войти
            </div>
          </div>
        </div>
      )}
    </FormContainer>
  )
}

export default SignUpHome

import React, { useState } from 'react'
import { TelegramFooter } from '../../../assets/FooterIcons/TelegramFooter'
import { VKFooter } from '../../../assets/FooterIcons/VKFooter'
import { WhatsAppFooter } from '../../../assets/FooterIcons/WhatsAppFooter'
import LogoWhite from '../../../assets/img/logoWhite'
import Button, { ButtonTypes } from '../../UI/Button'
import styles from './Footer.module.scss'

const Footer = () => {
  const [email, setEmail] = useState('')
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.textTitle}>Давайте оставаться на связи!</div>
          <div className={styles.textDesc}>
            Подпишитесь на новости и специальные предложения
          </div>
          <div className={styles.containerInput}>
            <input
              value={email}
              onChange={(value) => setEmail('value')}
              placeholder={'Ваш Email'}
              className={styles.input}
            ></input>
            <Button
              title={'Подписаться'}
              type={ButtonTypes.Primary}
              onClick={() => {}}
              className={styles.button}
            />
          </div>
          <div className={styles.lists}>
            <ul className={styles.list}>
              <div className={styles.textTitle}>О LOGO</div>
              <li className={styles.textDesc}>О компании</li>
              <li className={styles.textDesc}>Контакты</li>
              <li className={styles.textDesc}>Карта сайта</li>
            </ul>
            <ul className={styles.list}>
              <div className={styles.textTitle}>Продукт</div>
              <li className={styles.textDesc}>Готовые решения</li>
              <li className={styles.textDesc}>Подбор решений</li>
              <li className={styles.textDesc}>Сервис подбора</li>
            </ul>
            <ul className={styles.list}>
              <div className={styles.textTitle}>Шаблоны</div>
              <li className={styles.textDesc}>E-commerce</li>
              <li className={styles.textDesc}>Онлайн-курсы</li>
              <li className={styles.textDesc}>Услуги</li>
            </ul>
            <ul className={styles.list}>
              <div className={styles.textTitle}>Ресурсы</div>
              <li className={styles.textDesc}>Блог</li>
              <li className={styles.textDesc}>Новости</li>
              <li className={styles.textDesc}>Обучающие ресурсы</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div>
            <LogoWhite />
          </div>
          <div className={styles.containerIcons}>
            <div className={styles.icon}>
              <VKFooter />
            </div>
            <div className={styles.icon}>
              <TelegramFooter />
            </div>
            <div className={styles.icon}>
              <WhatsAppFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

import React from 'react'
import { TelegramFooter } from '../../../assets/FooterIcons/TelegramFooter'
import { VKFooter } from '../../../assets/FooterIcons/VKFooter'
import { WhatsAppFooter } from '../../../assets/FooterIcons/WhatsAppFooter'
import styles from './Footer.module.scss'


const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>LOGO</div>
      <div className={styles.icons}>
        <VKFooter />
        <TelegramFooter />
        <WhatsAppFooter />
      </div>
    </div>
  )
}

export default Footer

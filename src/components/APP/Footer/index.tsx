import React from 'react'
import { TelegramFooter } from '../../../assets/FooterIcons/TelegramFooter'
import { VKFooter } from '../../../assets/FooterIcons/VKFooter'
import { WhatsAppFooter } from '../../../assets/FooterIcons/WhatsAppFooter'
import LogoWhite from '../../../assets/img/logoWhite'
import styles from './Footer.module.scss'


const Footer = () => {
  return (
    <div className={styles.footer}>
      <div><LogoWhite /></div>
      <div className={styles.containerIcons}>
        <div className={styles.icon}><VKFooter /></div>
        <div className={styles.icon}><TelegramFooter /></div>
        <div className={styles.icon}><WhatsAppFooter /></div>
      </div>
    </div>
  )
}

export default Footer

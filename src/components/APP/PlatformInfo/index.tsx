import React from 'react'
import platformInfo from '../../../assets/img/platformInfo.png'
import { PathNames } from '../../../pages/Router/Router'
import { useNavigate } from 'react-router-dom'
import ButtonNew, { ButtonNewTypes } from '../../UI/ButtonNew'

import styles from './PlatformInfo.module.scss'

const PlatformInfo = () => {
   const navigate = useNavigate()

   return (
      <div className={styles.container}>
         <div className={styles.containerImage}>
         <img className={styles.image} src={platformInfo} alt="PlatformInfo" />
         </div>
         <div className={styles.containerInfo}>
            <div className={styles.title}>Как подобрать платформу для работы с мессенджерами?</div>
            <div className={styles.description}>Каждая из них отличается друг от друга по множеству параметров, поэтому, прежде чем переходить к выбору, необходимо определиться с задачами, которые вы будете решать. Узнайте как это делать из нашего блога.</div>
            <ButtonNew
               title={'Читать Блог'}
               type={ButtonNewTypes.Primary}
               onClick={() => navigate(PathNames.Home)}
               className={styles.button}
            />
         </div>
      </div>
   )
}

export default PlatformInfo

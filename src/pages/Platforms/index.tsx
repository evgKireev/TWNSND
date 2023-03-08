import PlatformInfo from '../../components/APP/PlatformInfo'
import Baner from '../../components/UI/Baner'
import Search from '../../components/UI/Search'
import styles from './Platforms.module.scss'
import platforms from '../../platforms.json'
import PlatformCard from '../../components/APP/PlatformCard'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'

const Platforms = () => {
  return (
    <div className={styles.platformWrap}>
      <Baner />
      <Search />
      <div className={styles.platformInner}>
        <div className={styles.sort}>Sort</div>
        <div className={styles.platformsCards}>
          {platforms.map((platform) => {
            return <PlatformCard platform={platform} key={platform.id} />
          })}
        </div>
      </div>
      <ButtonNew
        title={'Показать больше'}
        type={ButtonNewTypes.Primary}
        className={styles.btn}
      />
      <PlatformInfo />
    </div>
  )
}

export default Platforms

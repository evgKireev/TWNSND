import PlatformInfo from '../../components/APP/PlatformInfo'
import Baner from '../../components/UI/Baner'
import Search from '../../components/UI/Search'
import styles from './Platforms.module.scss'
import platforms from '../../platforms.json'
import PlatformCard from '../../components/APP/PlatformCard'

const Platforms = () => {
  return (
    <div className={styles.wrap}>
      <Baner />
      <Search />

      <div className={styles.platformsCardsWrapper}>
        {platforms.map((platform) => {
          return <PlatformCard platform={platform} key={platform.id} />
        })}
      </div>

      <PlatformInfo />
    </div>
  )
}

export default Platforms

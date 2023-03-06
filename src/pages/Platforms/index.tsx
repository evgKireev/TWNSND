import PlatformInfo from '../../components/APP/PlatformInfo'
import Baner from '../../components/UI/Baner'
import Search from '../../components/UI/Search'
import styles from './Platforms.module.scss'
const Platforms = () => {
  return (
    <div className={styles.wrap}>
      <Baner />
      <Search />
      <PlatformInfo />
    </div>
  )
}

export default Platforms

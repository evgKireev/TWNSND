import SearchIcons from '../../../assets/img/SearchIcons'
import ButtonNew, { ButtonNewTypes } from '../ButtonNew'
import styles from './Search.module.scss'
const Search = () => {
  return (
    <div className={styles.wrap}>
      <SearchIcons />
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск по названию"
      />
      <ButtonNew
        title={'Поиск'}
        type={ButtonNewTypes.Primary}
        className={styles.btn}
      />
    </div>
  )
}

export default Search

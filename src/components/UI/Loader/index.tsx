import styles from './Loader.module.scss'
const Loader = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.ldsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
export default Loader

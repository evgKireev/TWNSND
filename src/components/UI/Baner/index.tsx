import styles from './Baner.module.scss'

const Baner = () => {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>
        <span> 60+</span> сервисов для создания чат-ботов и
        мессенджер-маркетинга
      </h3>
    </div>
  )
}

export default Baner

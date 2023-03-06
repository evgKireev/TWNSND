import headerImg from '../../../assets/img/header.png'
import styles from './Main.module.scss'
const Main = () => {
  return (
    <div>
      <div className={styles.hr}></div>
      <div className={styles.headerButtom}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Сервис подбора, настройки чат-ботов и сценариев их использования
          </h1>
          <div className={styles.innerItem}>
            <div>Готовые решения по сферам и задачам бизнеса</div>
            <div>Самостоятельный подбор чат-ботов по параметрам</div>
            <div>Подберем и настроим чат-ботов под ваши задачи</div>
          </div>
          <button className={styles.btn}>Выбрать шаблон</button>
        </div>
        <img src={headerImg} alt="images" />
      </div>
    </div>
  )
}

export default Main

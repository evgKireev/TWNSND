import Footer from '../../components/APP/Footer'
import Header from '../../components/APP/Header'
import styles from './Home.module.scss'
const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <Header />
      </div>
      <Footer />
    </>
  )
}

export default Home

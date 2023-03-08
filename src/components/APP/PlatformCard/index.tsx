/* eslint-disable indent */
import { Link } from 'react-router-dom'
import { PlatformType } from '../../../@types/types/platforms'
import { PathNames } from '../../../pages/Router/Router'
import platform1 from '../../../assets/img/platforms/platform1.png'
import { v4 as uuidv4 } from 'uuid'
import styles from './PlatformCard.module.scss'
import Star from '../../../assets/img/Star'
import { setHight } from '../../../utils/setHeight'
import { useEffect } from 'react'

interface IProps {
  platform: PlatformType
}

const PlatformCard = ({ platform }: IProps) => {
  const { id, name, rating, description, imageUrl, messengers, categories } =
    platform

  useEffect(() => {
    setHight('#categories')
    setHight('#info')
    setHight('#messengers')
  }, [])

  return (
    <Link to={`${PathNames.PlatformDetails}${id}`}>
      <div className={styles.wrapper}>
        <div className={styles.header} id="categories">
          <img src={platform1} alt={name} className={styles.image} />
          <div className={styles.categoriesWrapper}>
            {categories.map((category) => {
              return (
                <div key={uuidv4()} className={styles.category}>
                  {category.name}
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.mainInfo}>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.rating}>
            <Star />
            <span>
              {rating.toString().includes('.') ? rating : rating + '.0'}
            </span>
          </div>
        </div>

        <p className={styles.info} id="info">
          {description}
        </p>
        <div className={styles.messengers} id="messengers">
          {messengers.length > 1
            ? messengers.map((messenger, index) => {
                return index === messengers.length - 1
                  ? messenger.name
                  : `${messenger.name}, `
              })
            : messengers[0].name}
        </div>
      </div>
    </Link>
  )
}

export default PlatformCard

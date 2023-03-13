import PlatformInfo from '../../components/APP/PlatformInfo'
import Baner from '../../components/UI/Baner'
import Search from '../../components/UI/Search'
import styles from './Platforms.module.scss'
import PlatformCard from '../../components/APP/PlatformCard'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getPlatforms } from '../../redux/Platforms/platformsSlice'
import Loader from '../../components/UI/Loader'

const Platforms = () => {
  const dispatch = useAppDispatch()
  const { renderedPlatforms } = useAppSelector((state) => state.platformsSlice)
  const { statusPlatforms } = useAppSelector(
    (state) => state.statusPlatformsSlice
  )
  const [page, setPage] = useState<number>(0)
  // TODO: Реализовать логику заканчивающихся карточек (передаваемый skip,  take и page)

  useEffect(() => {
    dispatch(
      getPlatforms({
        data: {
          skip: page * 9,
          take: 9,
        },
      })
    )
  }, [dispatch, page])

  return statusPlatforms === 'pending' ? (
    <Loader />
  ) : (
    <div className={styles.platformWrap}>
      <Baner />
      <Search />
      <div className={styles.platformInner}>
        <div className={styles.sort}>Sort</div>
        {renderedPlatforms && (
          <div className={styles.platformsCards}>
            {renderedPlatforms.map((platform, index) => {
              return (
                <PlatformCard
                  platform={platform}
                  key={platform.id}
                  index={index}
                />
              )
            })}
          </div>
        )}
      </div>
      <ButtonNew
        title={'Показать больше'}
        type={ButtonNewTypes.Primary}
        className={styles.btn}
        onClick={() => {
          setPage(page + 1)
        }}
      />
      <PlatformInfo />
    </div>
  )
}

export default Platforms

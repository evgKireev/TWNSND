import classNames from 'classnames'
import { FiLogOut } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { logoutUser } from '../../../redux/SignUser/signInSlice'
import styles from './UserControl.module.scss'

type UserControlType = {
  openPanel: boolean
}
const UserControl: React.FC<UserControlType> = ({ openPanel }) => {
  const { userData } = useAppSelector((state) => state.userSlice)
  const dispatch = useAppDispatch()
  return (
    <div
      className={classNames(styles.userControl, {
        [styles.blockModal]: openPanel,
      })}
    >
      <div>
        <div className={styles.userName}>
          {`${userData?.given_name} ${userData?.family_name}`}
        </div>
        <div className={styles.userEmail}>{userData?.email}</div>
      </div>
      <div className={styles.logout} onClick={() => dispatch(logoutUser())}>
        <div className={styles.logoutIcon}>
          <FiLogOut />
        </div>
        <div className={styles.logoutText}>Выйти</div>
      </div>
    </div>
  )
}

export default UserControl

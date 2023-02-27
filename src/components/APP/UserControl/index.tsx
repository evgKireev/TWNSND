import classNames from 'classnames'
import { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { logoutUser } from '../../../redux/SignUser/signInSlice'
import styles from './UserControl.module.scss'

type UserControlType = {
  openPanel: boolean
}
const UserControl: React.FC<UserControlType> = ({ openPanel }) => {
  const { userData } = useAppSelector((state) => state.userSlice)
  const [logoutQuestion, setLogoutQuestion] = useState(false)
  const dispatch = useAppDispatch()
  return (
    <div
      className={classNames(styles.userControl, {
        [styles.blockModal]: openPanel,
      })}
    >
      <div className={styles.userInfo}>
        <div className={styles.userNameOne}>
          {userData?.given_name[0].toLocaleUpperCase()}
        </div>
        <div>
          <div className={styles.userName}>{userData?.given_name}</div>
          <div className={styles.userEmail}>{userData?.email}</div>
        </div>
      </div>
      {logoutQuestion ? (
        <div className={styles.logoutQuestion}>
          <div className={styles.logoutQuestionText}>Выйти из профиля?</div>
          <div className={styles.logoutBtn}>
            <button
              className={styles.btnLogout}
              onClick={() => dispatch(logoutUser())}
            >
              Выйти
            </button>
            <button
              className={styles.btnCancel}
              onClick={() => setLogoutQuestion(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.logout} onClick={() => setLogoutQuestion(true)}>
          <div className={styles.logoutIcon}>
            <FiLogOut />
          </div>
          <div className={styles.logoutText}>Выйти из профиля</div>
        </div>
      )}
    </div>
  )
}

export default UserControl

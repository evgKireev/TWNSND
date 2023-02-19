import classNames from 'classnames'
import { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useAppDispatch } from '../../../redux/hooks'
import { logoutUser } from '../../../redux/SignUser/signInSlice'
import styles from './UserControl.module.scss'

type UserControlType = {
  openPanel: boolean
}

const UserControl: React.FC<UserControlType> = ({ openPanel }) => {
  const [logautQuestion, setLogautQuestion] = useState(false)
  const dispatch = useAppDispatch()
  return (
    <div
      className={classNames(styles.userControl, {
        [styles.blockModal]: openPanel,
      })}
    >
      <div className={styles.userInfo}>
        <div className={styles.userNameOne}>{'A'}</div>
        <div>
          <div className={styles.userName}>{'Анна'}</div>
          <div className={styles.userEmail}>{'anna@coolexample.com'}</div>
        </div>
      </div>
      {logautQuestion ? (
        <div className={styles.logautQuestion}>
          <div className={styles.logautQuestionText}>Выйти из профиля?</div>
          <div className={styles.logautBtn}>
            <button
              className={styles.btnLogaut}
              onClick={() => dispatch(logoutUser())}
            >
              Выйти
            </button>
            <button
              className={styles.btnCancel}
              onClick={() => setLogautQuestion(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.logaut} onClick={() => setLogautQuestion(true)}>
          <div className={styles.logautIcon}>
            <FiLogOut />
          </div>
          <div className={styles.logautText}>Выйти из профиля</div>
        </div>
      )}
    </div>
  )
}

export default UserControl

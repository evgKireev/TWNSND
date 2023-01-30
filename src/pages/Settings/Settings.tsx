import classNames from 'classnames';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonTypeEnum } from '../../components/UI/Button';
import Input from '../../components/Input';
import Switch from '../../components/Switch';
import { setValueCategories } from '../../redux/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './Settings.module.scss';

const Settings = () => {
  const { valueTheme } = useAppSelector((state) => state.themeSlice);
  const { userInfo } = useAppSelector((state) => state.signInAuthSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(valueTheme));
  }, [valueTheme]);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.titile}>Profile</h2>
      <div
        className={classNames(styles.innerProfile, {
          [styles.ThemeWhite]: valueTheme,
        })}
      >
        <div className={styles.item}>
          <span>Name</span>
          <div
            className={classNames(styles.int, {
              [styles.ThemeWhite]: valueTheme,
            })}
          >
            {userInfo?.name}
          </div>
        </div>
        <div className={styles.item}>
          <span>Email</span>
          <div
            className={classNames(styles.int, {
              [styles.ThemeWhite]: valueTheme,
            })}
          >
            {userInfo?.mail}
          </div>
        </div>
      </div>
      <h2 className={styles.titile}>Password</h2>
      <div
        className={classNames(styles.innerPassword, {
          [styles.ThemeWhite]: valueTheme,
        })}
      >
        <div className={styles.item}>
          <span>Password</span>
          <Input
            disabled={true}
            error={false}
            placeholder={'Your password'}
            onChange={() => {}}
          />
        </div>
        <div className={styles.item}>
          <div style={{ marginBottom: '12px' }}>
            <span>New password</span>
            <Input
              onChange={() => {}}
              disabled={true}
              error={false}
              placeholder={'New password'}
            />
          </div>
          <div>
            <span>Confirm password</span>
            <Input
              onChange={() => {}}
              disabled={true}
              error={false}
              placeholder={'Confirm password'}
            />
          </div>
        </div>
      </div>
      <h2 className={styles.titile}>Color mode</h2>
      <div
        className={classNames(styles.ColorMode, {
          [styles.ThemeWhite]: valueTheme,
        })}
      >
        <div className={styles.itemTheme}>
          <span> {valueTheme ? 'White' : 'Dark'}</span>
          <span style={{ color: 'grey', fontWeight: '500' }}>
            {valueTheme ? 'Use white thema' : 'Use dark thema'}
          </span>
        </div>
        <Switch />
      </div>
      <div className={styles.buttonInner}>
        <Button
          title={'Cancel'}
          type={ButtonTypeEnum.Secondary}
          onClick={() => {
            navigate('/');
            dispatch(setValueCategories(0));
            window.scrollTo(0, 0);
          }}
          disabled={false}
          className={''}
        />
        <Button
          title={'Save'}
          type={ButtonTypeEnum.Primary}
          onClick={() => {}}
          disabled={false}
          className={''}
        />
      </div>
    </div>
  );
};

export default Settings;

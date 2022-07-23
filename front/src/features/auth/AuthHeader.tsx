import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsLoggedAuto } from '../auth/authSlice';
import styles from './authHeader.module.scss';

function AuthHeader() {
  const { isLogged } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoggedAuto());
  };

  return (
    <div className={styles.authHeader} onClick={handleClick}>
      auth
      {isLogged ? 'log' : ''}
    </div>
  );
}

export default AuthHeader;

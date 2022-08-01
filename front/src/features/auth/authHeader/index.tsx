import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setLoginModal } from '../../modals/modalSlice';
import { getAuthState } from '../authSlice';
import styles from './authHeader.module.scss';

function AuthHeader() {
  const { isLogged, userPseudo } = useAppSelector(getAuthState);

  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(setLoginModal(true));
  };

  return (
    <div className={styles.authHeader}>
      {!isLogged ? (
        <div className={styles.loginBloc}>
          <span onClick={handleLoginClick}>Login</span>
          <a href="#">Créer un compte</a>
        </div>
      ) : (
        <div className={styles.accountBloc}>
          <span>{userPseudo}</span>
          <a href="#">Se déconnecter</a>
        </div>
      )}
    </div>
  );
}

export default AuthHeader;

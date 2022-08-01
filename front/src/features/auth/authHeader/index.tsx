import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAuthState, logout, setLoginModal } from '../authSlice';
import styles from './authHeader.module.scss';

function AuthHeader() {
    const { isLogged, userPseudo } = useAppSelector(getAuthState);

    const dispatch = useAppDispatch();

    const handleLoginClick = () => {
        dispatch(setLoginModal(true));
    };

    const handleLogoutClick = () => {
        dispatch(logout());
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
                    <Link to="/" onClick={handleLogoutClick}>
                        Se déconnecter
                    </Link>
                </div>
            )}
        </div>
    );
}

export default AuthHeader;

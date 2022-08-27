import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAuthState, logout, setLoginModal } from '../authSlice';
import styles from './authHeader.module.scss';

function AuthHeader() {
    const { isLogged, userPseudo } = useAppSelector(getAuthState);

    const dispatch = useAppDispatch();

    const handleLoginClick = () => {
        dispatch(setLoginModal(true));
    };

    const handleAccountClick = () => {};

    const handleLogoutClick = () => {
        dispatch(logout());
    };

    return (
        <div className={styles.authHeader}>
            <div className={styles.accountBloc}>
                {!isLogged ? (
                    <>
                        <div
                            className={styles.userDisplay}
                            onClick={handleLoginClick}
                        >
                            Login
                        </div>
                        <div className={styles.buttons}>
                            <div className={styles.button}>Créer un compte</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.userDisplay}>{userPseudo}</div>
                        <div className={styles.buttons}>
                            <div
                                className={styles.button}
                                onClick={handleAccountClick}
                            >
                                Account
                            </div>
                            <div
                                className={styles.button}
                                onClick={handleLogoutClick}
                            >
                                Logout
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AuthHeader;

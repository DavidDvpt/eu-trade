import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import GenericModal from '../../../modals/genericModal';
import { getAuthState, setLoginModal } from '../../authSlice';
import LoginForm from '../loginForm';
import styles from './loginModal.module.scss';

function LoginModal() {
    const { loginModal } = useAppSelector(getAuthState);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setLoginModal(false));
    };
    return (
        <>
            {loginModal && (
                <GenericModal title="Login" onClose={handleClose}>
                    <div className={styles.loginModal}>
                        <LoginForm />
                    </div>
                </GenericModal>
            )}
        </>
    );
}

export default LoginModal;

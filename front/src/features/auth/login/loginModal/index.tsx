import { useAppDispatch } from '../../../../app/hooks';
import GenericModal from '../../../modals/genericModal';
import { setLoginModal } from '../../../modals/modalSlice';
import LoginForm from '../loginForm';
import styles from './loginModal.module.scss';

function LoginModal() {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setLoginModal(false));
    };

    return (
        <GenericModal title="Login" onClose={handleClose}>
            <div className={styles.loginModal}>
                <LoginForm />
            </div>
        </GenericModal>
    );
}

export default LoginModal;

import { useAppSelector } from '../../../App/reduxHooks';
import ModalDefaultLayer from '../../../components/modals/ModalDefaultLayer';
import { getModalsState } from '../../../redux/modalReducer';
import LoginForm from '../LoginForm';
import styles from './loginModal.module.scss';

function LoginModal() {
  const { loginModal } = useAppSelector(getModalsState);

  return (
    <>
      {loginModal && (
        <ModalDefaultLayer title="Login">
          <div className={styles.loginModal}>
            <LoginForm />
          </div>
        </ModalDefaultLayer>
      )}
    </>
  );
}

export default LoginModal;

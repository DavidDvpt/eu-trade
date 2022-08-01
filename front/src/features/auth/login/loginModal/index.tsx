import GenericModal from '../../../modals/genericModal';
import LoginForm from '../loginForm';
import styles from './loginModal.module.scss';

function LoginModal() {
  return (
    <GenericModal title="Login">
      <div className={styles.loginModal}>
        <LoginForm />
      </div>
    </GenericModal>
  );
}

export default LoginModal;

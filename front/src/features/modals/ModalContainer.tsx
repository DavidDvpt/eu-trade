import { useAppSelector } from '../../app/hooks';
import { getAuthState } from '../auth/authSlice';
import LoginModal from '../auth/login/loginModal';

function ModalContainer() {
  const { loginModal } = useAppSelector(getAuthState);

  return <>{loginModal && <LoginModal />}</>;
}

export default ModalContainer;

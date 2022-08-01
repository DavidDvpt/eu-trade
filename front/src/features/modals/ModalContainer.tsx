import { useAppSelector } from '../../app/hooks';
import LoginModal from '../auth/login/loginModal';
import { getModalsState } from './modalSlice';

function ModalContainer() {
  const { loginModal } = useAppSelector(getModalsState);

  return <>{loginModal && <LoginModal />}</>;
}

export default ModalContainer;

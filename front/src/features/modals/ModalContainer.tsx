import { useAppSelector } from '../../app/hooks';
import AccountModal from '../account/accountModal';
import LoginModal from '../auth/login/loginModal';
import { getModalsState } from './modalSlice';

function ModalContainer() {
    const { accountModal, loginModal } = useAppSelector(getModalsState);
    return (
        <>
            {loginModal && <LoginModal />}
            {accountModal && <AccountModal />}
        </>
    );
}

export default ModalContainer;

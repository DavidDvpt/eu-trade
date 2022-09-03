import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import GenericModal from '../../modals/genericModal';
import { getModalsState, setAccountModal } from '../../modals/modalSlice';
import styles from './accountModal.module.scss';
import UserDataForm from './UserDataForm';
import UserForm from './UserForm';
function AccountModal() {
    const { accountModal } = useAppSelector(getModalsState);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setAccountModal(false));
    };

    return (
        <>
            {accountModal && (
                <div className={styles.accountModal}>
                    <GenericModal title="My Account" onClose={handleClose}>
                        <div className={styles.modalContent}>
                            <div className={styles.user}>
                                <UserForm />
                            </div>
                            <div className={styles.userDatas}>
                                <UserDataForm />
                            </div>
                        </div>
                    </GenericModal>
                </div>
            )}
        </>
    );
}

export default AccountModal;

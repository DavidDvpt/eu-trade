import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import GenericModal from '../../modals/genericModal';
import { getAccountState, setAccountModal } from '../accountSlice';
import styles from './accountModal.module.scss';
function AccountModal() {
    const { accountModal } = useAppSelector(getAccountState);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        console.log('close');
        dispatch(setAccountModal(false));
    };

    return (
        <>
            {accountModal && (
                <div className={styles.accountModal}>
                    <GenericModal title="My Account" onClose={handleClose}>
                        <div className={styles.modalContent}>blabla</div>
                    </GenericModal>
                </div>
            )}
        </>
    );
}

export default AccountModal;

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import GenericModal from '../../modals/genericModal';
import { setAccountModal } from '../../modals/modalSlice';
import { getAccountState } from '../accountSlice';
import styles from './accountModal.module.scss';
import { fetchAuthUser } from './thunks';
import UserDataForm from './UserDataForm';
import UserForm from './UserForm';
function AccountModal() {
    const { user, globalUserData } = useAppSelector(getAccountState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuthUser(null));
    }, []);

    const handleClose = () => {
        dispatch(setAccountModal(false));
    };

    return (
        <div className={styles.accountModal}>
            <GenericModal title="My Account" onClose={handleClose}>
                <div className={styles.modalContent}>
                    <div className={styles.user}>
                        <UserForm user={user} />
                    </div>
                    <div className={styles.userDatas}>
                        <UserDataForm globalDatas={globalUserData} />
                    </div>
                </div>
            </GenericModal>
        </div>
    );
}

export default AccountModal;

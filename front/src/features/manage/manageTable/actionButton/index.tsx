import { useAppDispatch } from '../../../../app/hooks';
import { setAddAction } from '../../manageSlice';
import styles from './actionButton.module.scss';
interface ActionButtonProps {
    disabled: boolean;
    handleUpdate: () => void;
    handleCancel: () => void;
    handleSave?: () => void;
}

function ActionButton({
    disabled,
    handleUpdate,
    handleCancel,
    handleSave,
}: ActionButtonProps) {
    const dispatch = useAppDispatch();

    const handleInternalCancel = () => {
        handleCancel();
        dispatch(setAddAction(false));
    };
    return (
        <div className={styles.actionButton}>
            {disabled ? (
                <span className={styles.updateButton} onClick={handleUpdate}>
                    Update
                </span>
            ) : (
                <>
                    <span className={styles.saveButton} onClick={handleSave}>
                        Save
                    </span>
                    <span
                        className={styles.cancelButton}
                        onClick={handleInternalCancel}
                    >
                        Cancel
                    </span>
                </>
            )}
        </div>
    );
}

export default ActionButton;

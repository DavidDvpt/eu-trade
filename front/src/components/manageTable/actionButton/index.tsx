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
                        onClick={handleCancel}
                    >
                        Cancel
                    </span>
                </>
            )}
        </div>
    );
}

export default ActionButton;

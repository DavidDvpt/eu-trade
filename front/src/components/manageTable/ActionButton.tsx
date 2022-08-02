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
        <td>
            {disabled ? (
                <span onClick={handleUpdate}>Update</span>
            ) : (
                <>
                    <span onClick={handleSave}>Save</span>
                    <span onClick={handleCancel}>Cancel</span>
                </>
            )}
        </td>
    );
}

export default ActionButton;

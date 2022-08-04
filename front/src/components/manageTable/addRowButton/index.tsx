import React, { useState } from 'react';

import styles from './addRowButton.module.scss';

interface AddRowButtonProps {
    children: React.ReactNode;
}
function AddRowButton({ children }: AddRowButtonProps) {
    const [onAdd, setOnAdd] = useState(false);

    const handleAddClick = () => {
        setOnAdd(true);
    };
    return (
        <>
            {!onAdd ? (
                <td className={styles.addRowButton}>
                    <span onClick={handleAddClick}>A new row</span>
                </td>
            ) : (
                { children }
            )}
        </>
    );
}

export default AddRowButton;

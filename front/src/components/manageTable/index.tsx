import { nanoid } from '@reduxjs/toolkit';
import { cloneElement, useState } from 'react';

import styles from '../../pages/styles/managePage.module.scss';

interface ManageTableProps<T> {
    titles: TitleDisplay[];
    rows: T[];
    children: React.ReactElement;
    addButton?: React.ReactNode;
}

function ManageTable<T>({ titles, rows, children }: ManageTableProps<T>) {
    const [onAdd, setOnAdd] = useState(false);

    const handleAddClick = () => {
        setOnAdd(!onAdd);
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {titles.map((title) => (
                            <th key={nanoid()}>{title.label}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) =>
                        cloneElement(children, { datas: r, key: nanoid() }),
                    )}
                    {onAdd && cloneElement(children, { key: nanoid() })}
                </tbody>
            </table>
            <div className={styles.addRowButton} onClick={handleAddClick}>
                {onAdd ? 'Cancel new row' : 'Add new row'}
            </div>
        </>
    );
}

export default ManageTable;

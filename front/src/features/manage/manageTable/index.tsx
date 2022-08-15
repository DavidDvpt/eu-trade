import { nanoid } from '@reduxjs/toolkit';
import { cloneElement, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from '../../../pages/styles/managePage.module.scss';
import { getManageState, setAddAction } from '../manageSlice';

interface ManageTableProps<T> {
    titles: TitleDisplay[];
    rows: T[];
    children: React.ReactElement;
}

function ManageTable<T>({ titles, rows, children }: ManageTableProps<T>) {
    const { addRowActionClicked } = useAppSelector(getManageState);
    const dispatch = useAppDispatch();

    const handleAddClick = () => {
        dispatch(setAddAction(!addRowActionClicked));
    };

    useEffect(() => {
        dispatch(setAddAction(false));
    }, [titles]);

    return (
        <div className={styles.tableContainer}>
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

                    {addRowActionClicked &&
                        cloneElement(children, { key: nanoid() })}
                </tbody>
            </table>
            <div className={styles.addRowButton} onClick={handleAddClick}>
                {addRowActionClicked ? 'Cancel new row' : 'Add new row'}
            </div>
        </div>
    );
}

export default ManageTable;

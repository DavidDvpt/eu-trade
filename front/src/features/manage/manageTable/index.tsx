import { nanoid } from '@reduxjs/toolkit';
import { cloneElement } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from '../../../pages/styles/managePage.module.scss';
import { getManageState, setAddAction } from '../manageSlice';

interface ManageTableProps<T> {
    title: string;
    titles: TitleDisplay[];
    rows: T[];
    children: React.ReactElement;
}

function ManageTable<T>({
    title,
    titles,
    rows,
    children,
}: ManageTableProps<T>) {
    const { addRowActionClicked } = useAppSelector(getManageState);
    const dispatch = useAppDispatch();

    const handleAddClick = () => {
        dispatch(setAddAction(!addRowActionClicked));
    };

    return (
        <div>
            <h1>{title}</h1>
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

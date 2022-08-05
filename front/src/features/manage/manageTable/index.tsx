import { nanoid } from '@reduxjs/toolkit';
import { cloneElement } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from '../../../pages/styles/managePage.module.scss';
import { getManageState, setAddAction } from '../manageSlice';

interface ManageTableProps<T> {
    titles: TitleDisplay[];
    rows: T[];
    children: React.ReactElement;
    addButton?: React.ReactNode;
}

function ManageTable<T>({ titles, rows, children }: ManageTableProps<T>) {
    const { addRowActionClicked } = useAppSelector(getManageState);
    const dispatch = useAppDispatch();

    const handleAddClick = () => {
        dispatch(setAddAction(!addRowActionClicked));
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

                    {addRowActionClicked &&
                        cloneElement(children, { key: nanoid() })}

                    <tr>
                        <td className={styles.addRowButtonCell}>
                            <div
                                className={styles.addRowButton}
                                onClick={handleAddClick}
                            >
                                {addRowActionClicked
                                    ? 'Cancel new row'
                                    : 'Add new row'}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default ManageTable;

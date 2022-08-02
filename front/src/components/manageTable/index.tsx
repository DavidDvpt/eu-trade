import { nanoid } from '@reduxjs/toolkit';
import { cloneElement } from 'react';

interface ManageTableProps<T> {
    titles: TitleDisplay[];
    rows: T[];
    children: React.ReactElement;
}

function ManageTable<T>({ titles, rows, children }: ManageTableProps<T>) {
    return (
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
            </tbody>
        </table>
    );
}

export default ManageTable;

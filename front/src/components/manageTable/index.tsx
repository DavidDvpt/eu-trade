import { nanoid } from '@reduxjs/toolkit';

import ManageRow from './ManageRow';

export interface TitleDisplay {
    label: string;
    display: string;
}

interface ManageTableProps<T> {
    titles: TitleDisplay[];
    rows: T[];
}

function ManageTable<T>({ titles, rows }: ManageTableProps<T>) {
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
                {rows.map((r) => (
                    <ManageRow
                        key={nanoid()}
                        datas={r}
                        displayed={titles.map((t) => t.display)}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default ManageTable;

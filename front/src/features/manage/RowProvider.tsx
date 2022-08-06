import { cloneElement } from 'react';

import createManageRowContext from './manageTable/manageContext';

interface RowProvider<T> {
    row: React.ReactElement;
    refetch: () => void;
    datas?: T;
}
function RowProvider<T>({ row, datas, refetch }: RowProvider<T>) {
    const [ctx, RowContext] = createManageRowContext<T>();
    return (
        <RowContext>{cloneElement(row, { refetch, datas, ctx })}</RowContext>
    );
}

export default RowProvider;

import { cloneElement } from 'react';

import createManageRowContext from './manageTable/manageContext';

interface RowProvider<T> {
    row: React.ReactElement;
    datas?: T;
}
function RowProvider<T>({ row, datas }: RowProvider<T>) {
    const [ctx, RowContext] = createManageRowContext<T>();
    return <RowContext>{cloneElement(row, { datas: datas, ctx })}</RowContext>;
}

export default RowProvider;

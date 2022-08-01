import { nanoid } from '@reduxjs/toolkit';
import { ChangeEvent, useState } from 'react';

import createManageRowContext from './manageContext';

interface ManageRowProps<T> {
    datas: T;
    displayed: string[];
}

const [ctx, RowContext] = createManageRowContext();
export const RowCtx = ctx;
function ManageRow<T>({ datas, displayed }: ManageRowProps<T>) {
    const [disabled, setDisabled] = useState(true);
    const [updated, setUpdated] = useState<T>(datas);

    const handleDataChange = (
        name: string,
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        console.log(name, e.target.value);
        setUpdated({ ...updated, [name]: e.target.value });
    };

    const handleSave = () => {
        console.log(updated);
    };

    return (
        <tr>
            {Object.keys(datas)
                .filter((f) => {
                    return displayed.includes(f);
                })
                .map((d) => {
                    return (
                        <td key={nanoid()}>
                            {typeof datas[d] !== 'boolean' ? (
                                <input
                                    type="text"
                                    name={d}
                                    value={updated[d]}
                                    onChange={(e) => handleDataChange(d, e)}
                                    disabled={disabled}
                                />
                            ) : (
                                <input
                                    type="checkbox"
                                    name={d}
                                    checked={updated[d]}
                                    onChange={(e) => handleDataChange(d, e)}
                                    disabled={disabled}
                                />
                            )}
                        </td>
                    );
                })}
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
        </tr>
    );
}

export default ManageRow;

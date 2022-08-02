import { memo, useContext, useEffect } from 'react';

import ActionButton from '../../../components/manageTable/ActionButton';
import { FamilyRowCtx } from './FamilyRowProvider';

interface IFamilyRowProps {
    datas?: Family;
}

function FamilyRow({ datas }: IFamilyRowProps) {
    const {
        setData,
        data,
        disabled,
        handleDataChange,
        handleCancel,
        handleUpdate,
        handleSave,
    } = useContext(FamilyRowCtx);

    useEffect(() => {
        if (datas) {
            setData(datas);
        }
    }, []);

    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="name"
                    value={data.name ?? ''}
                    onChange={(e) => handleDataChange('name', e)}
                    disabled={disabled}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    name="isActif"
                    checked={data.isActif ?? false}
                    onChange={(e) => handleDataChange('isActif', e, true)}
                    disabled={disabled}
                />
            </td>

            <ActionButton
                disabled={disabled}
                handleCancel={handleCancel}
                // handleSave={handleSave}
                handleUpdate={handleUpdate}
            />
        </tr>
    );
}

export default memo(FamilyRow);

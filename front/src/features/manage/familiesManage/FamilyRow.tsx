import { memo, useContext, useEffect } from 'react';

import ActionButton from '../../../components/manageTable/actionButton';
import { useUpdateFamilyMutation } from '../../appApi/familyApi';
import { FamilyRowCtx } from './FamilyRowProvider';

interface IFamilyRowProps {
    datas?: Family;
}

function FamilyRow({ datas }: IFamilyRowProps) {
    const [updateFamily, result] = useUpdateFamilyMutation();

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

    const handleRowSave = () => {
        updateFamily(data);
    };

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
            <td>
                <ActionButton
                    disabled={disabled}
                    handleCancel={handleCancel}
                    handleSave={handleRowSave}
                    handleUpdate={handleUpdate}
                />
            </td>
        </tr>
    );
}

export default memo(FamilyRow);

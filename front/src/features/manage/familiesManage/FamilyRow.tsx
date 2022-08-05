import { delay } from 'lodash';
import { memo, useContext, useEffect } from 'react';

import styles from '../../../pages/styles/managePage.module.scss';
import {
    useAddFamilyMutation,
    useUpdateFamilyMutation,
} from '../../appApi/familyApi';
import ActionButton from '../manageTable/actionButton';
import { FamilyRowCtx } from './FamilyRowProvider';

interface IFamilyRowProps {
    datas?: Family | Partial<Family>;
}

function FamilyRow({ datas }: IFamilyRowProps) {
    const [updateFamily, resultUpdate] = useUpdateFamilyMutation();
    const [postFamily, resultPost] = useAddFamilyMutation();

    const {
        setData,
        data,
        disabled,
        setDisabled,
        handleDataChange,
        handleCancel,
        handleUpdate,
        handleSave,
    } = useContext(FamilyRowCtx);
    console.log(disabled, data);

    useEffect(() => {
        if (datas) {
            setData(datas as Family);
        } else {
            setData({ name: '', isActif: false });
            delay(() => {
                setDisabled(false);
            }, 1);
        }
    }, []);

    useEffect(() => {
        handleUpdate();
    }, [resultUpdate.isSuccess, resultPost.isSuccess]);

    useEffect(() => {
        handleSave();
    }, [resultUpdate.isSuccess, resultPost.isSuccess]);

    const handleRowSave = () => {
        if (data.id) {
            updateFamily(data as Family);
        } else {
            postFamily(data);
        }
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
            <td className={styles.checkboxCell}>
                <div>
                    <input
                        type="checkbox"
                        name="isActif"
                        checked={data.isActif ?? false}
                        onChange={(e) => handleDataChange('isActif', e, true)}
                        disabled={disabled}
                    />
                </div>
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

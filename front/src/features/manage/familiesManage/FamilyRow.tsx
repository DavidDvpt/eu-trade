import { delay } from 'lodash';
import { ChangeEvent, useContext, useEffect } from 'react';

import styles from '../../../pages/styles/managePage.module.scss';
import {
    useAddFamilyMutation,
    useUpdateFamilyMutation,
} from '../../appApi/familyApi';
import ActionButton from '../manageTable/actionButton';

interface IFamilyRowProps {
    datas?: Family | Partial<Family>;
    ctx: React.Context<{
        disabled: boolean;
        setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
        data: Family | Partial<Family>;
        setData: React.Dispatch<React.SetStateAction<Family | Partial<Family>>>;
        handleUpdate: () => void;
        handleCancel: () => void;
        handleDataChange: (
            name: string,
            e: ChangeEvent<HTMLInputElement>,
            isCheckbox?: boolean,
        ) => void;
        handleSave: () => void;
    }>;
}

function FamilyRow({ datas, ctx }: IFamilyRowProps) {
    // console.log('datas', datas);
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
    } = useContext(ctx);

    useEffect(() => {
        if (datas) {
            // console.log('data ok', datas);
            // delay(() => {
            setData(datas as Family);
            // }, 1000);
        } else {
            setData({ name: '', isActif: false });
            delay(() => {
                setDisabled(false);
            }, 1);
        }
    }, [datas]);

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

export default FamilyRow;

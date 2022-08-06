import { delay } from 'lodash';
import { ChangeEvent, useContext, useEffect } from 'react';

import { useAppDispatch } from '../../../app/hooks';
import styles from '../../../pages/styles/managePage.module.scss';
import {
    useAddFamilyMutation,
    useUpdateFamilyMutation,
} from '../../appApi/familyApi';
import { setAddAction } from '../manageSlice';
import ActionButton from '../manageTable/actionButton';

interface IFamilyRowProps {
    datas?: Family | Partial<Family>;
    refetch?: () => void;
    ctx: React.Context<{
        disabled: boolean;
        setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
        contextData: Family | Partial<Family>;
        setData: React.Dispatch<React.SetStateAction<Family | Partial<Family>>>;
        handleDataChange: (
            name: string,
            e: ChangeEvent<HTMLInputElement>,
            isCheckbox?: boolean,
        ) => void;
    }>;
}

function FamilyRow({ datas, ctx, refetch }: IFamilyRowProps) {
    const [updateFamily, updateResult] = useUpdateFamilyMutation();
    const [postFamily, addResult] = useAddFamilyMutation();
    const dispatch = useAppDispatch();
    const { setData, contextData, disabled, setDisabled, handleDataChange } =
        useContext(ctx);

    useEffect(() => {
        if (datas) {
            setData(datas as Family);
        } else {
            setData({ name: '', isActif: false });
            delay(() => {
                setDisabled(false);
            }, 1);
        }
    }, [datas]);

    useEffect(() => {
        if (updateResult.isSuccess) {
            setDisabled(true);

            if (refetch) refetch();
        } else if (updateResult.isError) {
            alert('ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
    }, [updateResult]);

    useEffect(() => {
        if (addResult.isSuccess) {
            setDisabled(true);
            dispatch(setAddAction(false));

            if (refetch) refetch();
        } else if (addResult.isError) {
            alert('ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
    }, [addResult]);

    const handleRowSave = () => {
        if (contextData.id) {
            updateFamily(contextData as Family);
        } else {
            postFamily(contextData);
        }
    };

    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="name"
                    value={contextData.name ?? ''}
                    onChange={(e) => handleDataChange('name', e)}
                    disabled={disabled}
                />
            </td>
            <td className={styles.checkboxCell}>
                <div>
                    <input
                        type="checkbox"
                        name="isActif"
                        checked={contextData.isActif ?? false}
                        onChange={(e) => handleDataChange('isActif', e, true)}
                        disabled={disabled}
                    />
                </div>
            </td>
            <td>
                <ActionButton
                    disabled={disabled}
                    handleCancel={() => setDisabled(true)}
                    handleSave={handleRowSave}
                    handleUpdate={() => setDisabled(false)}
                />
            </td>
        </tr>
    );
}

export default FamilyRow;

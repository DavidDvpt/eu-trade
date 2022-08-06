import { delay } from 'lodash';
import { useContext, useEffect } from 'react';

import { useAppDispatch } from '../../../app/hooks';
import TabCheckbox from '../../../components/tabFieldsComponents/TabCheckbox';
import TabInput from '../../../components/tabFieldsComponents/TabInput';
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
        setContextData: React.Dispatch<
            React.SetStateAction<Family | Partial<Family>>
        >;
        handleDataChange: (
            name: string,
            value: string | boolean | number,
        ) => void;
    }>;
}

function FamilyRow({ datas, ctx, refetch }: IFamilyRowProps) {
    const [updateFamily, updateResult] = useUpdateFamilyMutation();
    const [postFamily, addResult] = useAddFamilyMutation();
    const dispatch = useAppDispatch();
    const {
        setContextData,
        contextData,
        disabled,
        setDisabled,
        handleDataChange,
    } = useContext(ctx);

    useEffect(() => {
        if (datas) {
            setContextData(datas as Family);
        } else {
            setContextData({ name: '', isActif: false });
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
            <td className={styles.nameCell}>
                <TabInput
                    name="name"
                    disabled={disabled}
                    value={contextData.name ?? ''}
                    onChange={handleDataChange}
                />
            </td>
            <td className={styles.checkboxCell}>
                <TabCheckbox
                    name="isActif"
                    value={contextData.isActif ?? false}
                    disabled={disabled}
                    onChange={handleDataChange}
                />
            </td>
            <td className={styles.actionCell}>
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

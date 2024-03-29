import { delay } from 'lodash';
import { useContext, useEffect, useState } from 'react';

import { useAppDispatch } from '../../../app/hooks';
import TabCheckbox from '../../../components/tabFieldsComponents/TabCheckbox';
import TabInput from '../../../components/tabFieldsComponents/TabInput';
import TabSelect from '../../../components/tabFieldsComponents/TabSelect';
import styles from '../../../pages/styles/managePage.module.scss';
import {
    useAddCategoryMutation,
    useUpdateCategoryMutation,
} from '../../appApi/categoryApi';
import { useGetFamiliesQuery } from '../../appApi/familyApi';
import { setAddAction } from '../manageSlice';
import ActionButton from '../manageTable/actionButton';

interface ICategoryRowProps {
    datas?: Category | Partial<Category>;
    refetch?: () => void;
    ctx: React.Context<{
        disabled: boolean;
        setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
        contextData: Category | Partial<Category>;
        setContextData: React.Dispatch<
            React.SetStateAction<Category | Partial<Category>>
        >;
        handleDataChange: (
            name: string,
            value: string | boolean | number,
        ) => void;
    }>;
}
function CategoryRow({ datas, ctx, refetch }: ICategoryRowProps) {
    const [formError, setFormError] = useState<{ familyId: boolean }>({
        familyId: false,
    });
    const { data } = useGetFamiliesQuery();
    const [updateCategory, updateResult] = useUpdateCategoryMutation();
    const [addCategory, addResult] = useAddCategoryMutation();
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
            setContextData(datas as Category);
        } else {
            setContextData({ name: '', isActif: false, familyId: 0 });
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
            if (refetch) refetch();
            dispatch(setAddAction(false));
        } else if (addResult.isError) {
            alert('ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
    }, [addResult]);

    const handleRowSave = () => {
        if (contextData.id) {
            updateCategory(contextData as Category);
        } else {
            if (contextData.familyId !== 0) {
                addCategory(contextData);
            } else {
                setFormError({ familyId: true });
            }
        }
    };
    return (
        <tr>
            <td className={styles.nameCell}>
                <TabInput
                    name="name"
                    value={contextData.name ?? ''}
                    onChange={handleDataChange}
                    disabled={disabled}
                />
            </td>
            <td className={styles.selectCell}>
                <TabSelect
                    name="familyId"
                    className={formError.familyId ? styles.fieldError : ''}
                    value={contextData.familyId ?? ''}
                    onChange={handleDataChange}
                    disabled={disabled}
                    options={
                        data?.map((o) => ({ id: o.id, name: o.name })) || []
                    }
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

export default CategoryRow;

import { nanoid } from '@reduxjs/toolkit';
import { delay } from 'lodash';
import { ChangeEvent, useContext, useEffect } from 'react';

import styles from '../../../pages/styles/managePage.module.scss';
import {
    useAddCategoryMutation,
    useUpdateCategoryMutation,
} from '../../appApi/categoryApi';
import { useGetFamiliesQuery } from '../../appApi/familyApi';
import ActionButton from '../manageTable/actionButton';

interface ICategoryRowProps {
    datas?: Category | Partial<Category>;
    ctx: React.Context<{
        disabled: boolean;
        setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
        contextData: Category | Partial<Category>;
        setData: React.Dispatch<
            React.SetStateAction<Category | Partial<Category>>
        >;
        handleDataChange: (
            name: string,
            e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
            isCheckbox?: boolean,
        ) => void;
    }>;
}
function CategoryRow({ datas, ctx }: ICategoryRowProps) {
    const { data } = useGetFamiliesQuery();
    const [updateCategory, updateResult] = useUpdateCategoryMutation();
    const [addCategory, addResult] = useAddCategoryMutation();

    const { setData, contextData, disabled, setDisabled, handleDataChange } =
        useContext(ctx);

    useEffect(() => {
        if (datas) {
            setData(datas as Category);
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
        } else if (updateResult.isError) {
            alert('ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
    }, [updateResult]);

    useEffect(() => {
        if (addResult.isSuccess) {
            setDisabled(true);
        } else if (addResult.isError) {
            alert('ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
    }, [addResult]);

    const handleRowSave = () => {
        if (contextData.id) {
            updateCategory(contextData as Category);
        } else {
            addCategory(contextData);
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
            <td>
                <select
                    name="familyId"
                    value={contextData.familyId ?? ''}
                    onChange={(e) => handleDataChange('familyId', e)}
                    disabled={disabled}
                >
                    {data?.map((f) => (
                        <option key={nanoid()} value={f.id}>
                            {f.name}
                        </option>
                    ))}
                </select>
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

export default CategoryRow;

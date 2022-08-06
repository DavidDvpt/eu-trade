import { delay } from 'lodash';
import React, { useContext, useEffect } from 'react';

import { useAppDispatch } from '../../../app/hooks';
import TabCheckbox from '../../../components/tabFieldsComponents/TabCheckbox';
import TabEntropediaImage from '../../../components/tabFieldsComponents/TabEntropediaImage';
import TabInput from '../../../components/tabFieldsComponents/TabInput';
import TabSelect from '../../../components/tabFieldsComponents/TabSelect';
import styles from '../../../pages/styles/managePage.module.scss';
import { useGetCategoriesQuery } from '../../appApi/categoryApi';
import {
    useAddItemMutation,
    useUpdateItemMutation,
} from '../../appApi/itemApi';
import { setAddAction } from '../manageSlice';
import ActionButton from '../manageTable/actionButton';

interface IItemRowProps {
    datas?: Item | Partial<Item>;
    refetch?: () => void;
    ctx: React.Context<{
        disabled: boolean;
        setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
        contextData: Item | Partial<Item>;
        setContextData: React.Dispatch<
            React.SetStateAction<Item | Partial<Item>>
        >;
        handleDataChange: (
            name: string,
            value: string | boolean | number,
        ) => void;
    }>;
}

function ItemRow({ datas, ctx, refetch }: IItemRowProps) {
    const { data } = useGetCategoriesQuery();
    const [addItem, addResult] = useAddItemMutation();
    const [updateItem, updateResult] = useUpdateItemMutation();
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
            if (refetch) refetch();
            dispatch(setAddAction(false));
        } else if (addResult.isError) {
            alert('ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
    }, [addResult]);

    const handleRowSave = () => {
        if (contextData.id) {
            updateItem(contextData as Category);
        } else {
            addItem(contextData);
        }
    };

    return (
        <tr>
            <td className={styles.entropediaImgCell}>
                <TabEntropediaImage imgId={contextData.imageUrlId || ''} />
            </td>
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
                    name="categoryId"
                    value={contextData.categoryId ?? ''}
                    onChange={handleDataChange}
                    disabled={disabled}
                    options={
                        data?.map((o) => ({ id: o.id, name: o.name })) || []
                    }
                />
            </td>{' '}
            <td className={styles.numberCell}>
                <TabInput
                    name="value"
                    value={contextData.value ?? ''}
                    onChange={handleDataChange}
                    disabled={disabled}
                />
            </td>{' '}
            <td className={styles.numberCell}>
                <TabInput
                    name="ttMax"
                    value={contextData.ttMax ?? ''}
                    onChange={handleDataChange}
                    disabled={disabled}
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
            <td className={styles.checkboxCell}>
                <TabCheckbox
                    name="isStackable"
                    value={contextData.isStackable ?? false}
                    disabled={disabled}
                    onChange={handleDataChange}
                />
            </td>
            <td className={styles.checkboxCell}>
                <TabCheckbox
                    name="isLimited"
                    value={contextData.isLimited ?? false}
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

export default ItemRow;

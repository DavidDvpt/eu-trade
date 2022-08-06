import { useState } from 'react';

import { useGetItemsQuery } from '../../appApi/itemApi';
import ManageTable from '../manageTable';
import RowProvider from '../RowProvider';
import SearchEngine from '../searchEngine';
import CategorySelect from '../searchEngine/categorySelect';
import FamilySelect from '../searchEngine/familySelect';
import ItemRow from './ItemRow';

const titles: TitleDisplay[] = [
    { label: '', display: 'imageUrlId' },
    { label: 'Name', display: 'name' },
    { label: 'Category', display: 'categoryId' },
    { label: 'Value', display: 'value' },
    { label: 'TT max', display: 'ttMax' },
    { label: 'Stackabe', display: 'isStackable' },
    { label: 'Limited', display: 'isLimited' },
    { label: 'Is actif', display: 'isActif' },
];

function ItemsManage() {
    const [selectedFamily, setSelectedFamily] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const { data, refetch } = useGetItemsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const handleFamilySelect = (value: string) => {
        setSelectedFamily(parseInt(value, 10));
    };

    const handleCategorySelect = (value: string) => {
        setSelectedCategory(parseInt(value, 10));
    };

    return (
        <>
            <h1>Items Manager</h1>
            <SearchEngine>
                <FamilySelect
                    onChange={handleFamilySelect}
                    selected={selectedFamily}
                />

                <CategorySelect
                    onChange={handleCategorySelect}
                    selected={selectedCategory}
                    familyFilterValue={selectedFamily}
                />
            </SearchEngine>
            <ManageTable
                titles={titles}
                rows={
                    data?.filter(
                        (f) =>
                            f.categoryId === selectedCategory ||
                            selectedCategory === 0,
                    ) ?? []
                }
            >
                <RowProvider
                    refetch={refetch}
                    row={<ItemRow ctx={undefined as never} />}
                />
            </ManageTable>
        </>
    );
}

export default ItemsManage;

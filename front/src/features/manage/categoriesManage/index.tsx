import { useState } from 'react';

import { useGetCategoriesQuery } from '../../appApi/categoryApi';
import ManageTable from '../manageTable';
import RowProvider from '../RowProvider';
import SearchEngine from '../searchEngine';
import FamilySelect from '../searchEngine/familySelect';
import CategoryRow from './CategoryRow';

const titles: TitleDisplay[] = [
    { label: 'Name', display: 'name' },
    { label: 'Family', display: 'familyId' },
    { label: 'Is actif', display: 'isActif' },
];

function CategoriesManage() {
    const [selectedFamily, setSelectedFamily] = useState(1);
    const { data, refetch } = useGetCategoriesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const handleFamilySelect = (value: string) => {
        setSelectedFamily(parseInt(value, 10));
    };

    return (
        <div>
            <h1>Categories Manager</h1>

            <SearchEngine>
                <FamilySelect
                    onChange={handleFamilySelect}
                    selected={selectedFamily}
                />
            </SearchEngine>
            <ManageTable
                titles={titles}
                rows={data?.filter((f) => f.familyId === selectedFamily) ?? []}
            >
                <RowProvider
                    refetch={refetch}
                    row={<CategoryRow ctx={undefined as never} />}
                />
            </ManageTable>
        </div>
    );
}

export default CategoriesManage;

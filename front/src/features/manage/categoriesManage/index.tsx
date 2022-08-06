import { useGetCategoriesQuery } from '../../appApi/categoryApi';
import ManageTable from '../manageTable';
import RowProvider from '../RowProvider';
import CategoryRow from './CategoryRow';

const titles: TitleDisplay[] = [
    { label: 'Name', display: 'name' },
    { label: 'Family', display: 'familyId' },
    { label: 'Is actif', display: 'isActif' },
];

function CategoriesManage() {
    const { data, refetch } = useGetCategoriesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    return (
        <div>
            <h1>Categories Manager</h1>

            <ManageTable
                titles={titles}
                rows={data ?? []}
                addButton={
                    <RowProvider
                        refetch={refetch}
                        row={<CategoryRow ctx={undefined as never} />}
                    />
                }
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

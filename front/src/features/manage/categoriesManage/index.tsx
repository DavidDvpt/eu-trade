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
        <ManageTable
            title="Categories Manager"
            titles={titles}
            rows={data ?? []}
        >
            <RowProvider
                refetch={refetch}
                row={<CategoryRow ctx={undefined as never} />}
            />
        </ManageTable>
    );
}

export default CategoriesManage;

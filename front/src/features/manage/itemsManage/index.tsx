import { useGetItemsQuery } from '../../appApi/itemApi';
import ManageTable from '../manageTable';
import RowProvider from '../RowProvider';
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
    const { data, refetch } = useGetItemsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    return (
        <div>
            <h1>Items Manager</h1>

            <ManageTable titles={titles} rows={data ?? []}>
                <RowProvider
                    refetch={refetch}
                    row={<ItemRow ctx={undefined as never} />}
                />
            </ManageTable>
        </div>
    );
}

export default ItemsManage;

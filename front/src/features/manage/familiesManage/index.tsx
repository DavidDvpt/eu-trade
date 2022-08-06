import { useGetFamiliesQuery } from '../../appApi/familyApi';
import ManageTable from '../manageTable';
import RowProvider from '../RowProvider';
import FamilyRow from './FamilyRow';

const titles: TitleDisplay[] = [
    { label: 'Name', display: 'name' },
    { label: 'is actif', display: 'isActif' },
];

function FamiliesManage() {
    const { data, refetch } = useGetFamiliesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    return (
        <ManageTable title="Families Manager" titles={titles} rows={data ?? []}>
            <RowProvider
                refetch={refetch}
                row={<FamilyRow ctx={undefined as never} />}
            />
        </ManageTable>
    );
}

export default FamiliesManage;

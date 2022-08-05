import { useGetFamiliesQuery } from '../../appApi/familyApi';
import ManageTable from '../manageTable';
import RowProvider from '../RowProvider';
import FamilyRow from './FamilyRow';

const titles: TitleDisplay[] = [
    { label: 'Name', display: 'name' },
    { label: 'is actif', display: 'isActif' },
];

function FamiliesManage() {
    const { data } = useGetFamiliesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    return (
        <div>
            <h1>Families Manager</h1>

            <ManageTable
                titles={titles}
                rows={data ?? []}
                addButton={
                    <RowProvider row={<FamilyRow ctx={undefined as never} />} />
                }
            >
                <RowProvider row={<FamilyRow ctx={undefined as never} />} />
            </ManageTable>
        </div>
    );
}

export default FamiliesManage;

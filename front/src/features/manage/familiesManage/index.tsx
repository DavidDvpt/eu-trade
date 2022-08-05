import { useGetFamiliesQuery } from '../../appApi/familyApi';
import ManageTable from '../manageTable';
import FamilyRowProvider from './FamilyRowProvider';

const titles: TitleDisplay[] = [
    { label: 'Name', display: 'name' },
    { label: 'is actif', display: 'isActif' },
];

function FamiliesManage() {
    const { data } = useGetFamiliesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    return (
        <>
            <h1>Families Manager</h1>

            <ManageTable
                titles={titles}
                rows={data ?? []}
                addButton={<FamilyRowProvider />}
            >
                <FamilyRowProvider />
            </ManageTable>
        </>
    );
}

export default FamiliesManage;

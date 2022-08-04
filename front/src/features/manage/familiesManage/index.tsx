import ManageTable from '../../../components/manageTable';
import AddRowButton from '../../../components/manageTable/addRowButton';
import { useGetFamiliesQuery } from '../../appApi/familyApi';
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
                addButton={
                    <AddRowButton>
                        <FamilyRowProvider />
                    </AddRowButton>
                }
            >
                <FamilyRowProvider />
            </ManageTable>
        </>
    );
}

export default FamiliesManage;

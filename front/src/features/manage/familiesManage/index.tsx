import ManageTable from '../../../components/manageTable';
import { useGetFamiliesQuery } from '../../appApi';
import FamilyRowProvider from './FamilyRowProvider';

const titles: TitleDisplay[] = [
    { label: 'Name', display: 'name' },
    { label: 'is actif', display: 'isActif' },
];

function FamiliesManage() {
    const { data } = useGetFamiliesQuery(null);
    return (
        <>
            <h1>Families Manager</h1>

            <ManageTable titles={titles} rows={data ?? []}>
                <FamilyRowProvider />
            </ManageTable>
        </>
    );
}

export default FamiliesManage;

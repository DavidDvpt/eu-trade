import ManageTable, { TitleDisplay } from '../../../components/manageTable';
import { useGetFamiliesQuery } from '../../appApi';

const titles: TitleDisplay[] = [
    { label: 'Name', display: 'name' },
    { label: 'is actif', display: 'isActif' },
];
function FamiliesManage() {
    const { data } = useGetFamiliesQuery(null);
    return (
        <>
            <h1>Families Manager</h1>

            <ManageTable titles={titles} rows={data ?? []} />
        </>
    );
}

export default FamiliesManage;

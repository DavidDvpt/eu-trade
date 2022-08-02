import ManageTable from '../../../components/manageTable';
import createManageRowContext from '../../../components/manageTable/manageContext';
import { useGetFamiliesQuery } from '../../appApi';

const titles: TitleDisplay[] = [
    { label: 'Name', display: 'name' },
    { label: 'is actif', display: 'isActif' },
];

const [ctx, RowContext] = createManageRowContext<Family>();
export const RowCtx = ctx;

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

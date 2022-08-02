import createManageRowContext from '../../../components/manageTable/manageContext';
import FamilyRow from './FamilyRow';

const [ctx, RowContext] = createManageRowContext<Family>();
export const FamilyRowCtx = ctx;

interface IFamilyRowProviderProps {
    datas?: Family;
}

function FamilyRowProvider({ datas }: IFamilyRowProviderProps) {
    return (
        <RowContext>
            <FamilyRow datas={datas} />
        </RowContext>
    );
}

export default FamilyRowProvider;

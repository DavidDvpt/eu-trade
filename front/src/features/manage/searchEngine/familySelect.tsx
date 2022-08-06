import { memo } from 'react';

import TabSelect from '../../../components/tabFieldsComponents/TabSelect';
import { useGetFamiliesQuery } from '../../appApi/familyApi';

interface FamilySelectProps {
    onChange: (value: string) => void;
    selected: number;
}
function FamilySelect({ onChange, selected }: FamilySelectProps) {
    const { data } = useGetFamiliesQuery();

    const handleChange = (name: string, value: string) => {
        onChange(value);
    };
    return (
        <TabSelect
            name="familySelect"
            disabled={false}
            value={selected}
            onChange={handleChange}
            noValue={false}
            options={data?.map((o) => ({ id: o.id, name: o.name })) || []}
        />
    );
}

export default memo(FamilySelect);

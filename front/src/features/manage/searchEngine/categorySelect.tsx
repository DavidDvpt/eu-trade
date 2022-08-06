import { memo } from 'react';

import TabSelect from '../../../components/tabFieldsComponents/TabSelect';
import { useGetCategoriesQuery } from '../../appApi/categoryApi';

interface CategorySelectProps {
    onChange: (value: string) => void;
    selected: number;
    familyFilterValue: number;
}
function CategorySelect({
    onChange,
    selected,
    familyFilterValue,
}: CategorySelectProps) {
    const { data } = useGetCategoriesQuery();

    const handleChange = (name: string, value: string) => {
        onChange(value);
    };
    return (
        <TabSelect
            name="CategorySelect"
            disabled={false}
            value={selected}
            onChange={handleChange}
            noValueText="All"
            options={
                data
                    ?.filter((f) => f.familyId === familyFilterValue)
                    .map((o) => ({ id: o.id, name: o.name })) || []
            }
        />
    );
}

export default memo(CategorySelect);

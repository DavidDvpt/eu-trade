import { isEmpty } from 'lodash';
import { memo, useEffect } from 'react';

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
    useEffect(() => {
        if (data) {
            const val = data?.filter((f) => f.familyId === familyFilterValue);

            onChange(isEmpty(val) ? '0' : val[0].id.toString());
        }
    }, [familyFilterValue, data]);

    return (
        <TabSelect
            name="CategorySelect"
            disabled={false}
            value={selected}
            onChange={handleChange}
            noValueText="All"
            noValue={false}
            options={
                data
                    ?.filter((f) => f.familyId === familyFilterValue)
                    .map((o) => ({ id: o.id, name: o.name })) || []
            }
        />
    );
}

export default memo(CategorySelect);

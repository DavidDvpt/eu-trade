import { nanoid } from '@reduxjs/toolkit';

interface TabSelectProps {
    name: string;
    value: number | string;
    noValue?: boolean;
    noValueText?: string;
    onChange: (name: string, value: string) => void;
    disabled: boolean;
    className?: string;
    options: { id: number; name: string }[];
}

function TabSelect({
    name,
    value,
    onChange,
    disabled,
    className,
    options,
    noValue = true,
    noValueText = 'None',
}: TabSelectProps) {
    return (
        <select
            name={name}
            className={className}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            disabled={disabled}
        >
            {noValue && <option value="0">{noValueText}</option>}
            {options?.map((f) => (
                <option key={nanoid()} value={f.id}>
                    {f.name}
                </option>
            ))}
        </select>
    );
}

export default TabSelect;

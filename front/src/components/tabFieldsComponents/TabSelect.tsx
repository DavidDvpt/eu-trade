import { nanoid } from '@reduxjs/toolkit';

interface TabSelectProps {
    name: string;
    value: number | string;
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
}: TabSelectProps) {
    return (
        <select
            name={name}
            className={className}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            disabled={disabled}
        >
            <option value="0">None</option>
            {options?.map((f) => (
                <option key={nanoid()} value={f.id}>
                    {f.name}
                </option>
            ))}
        </select>
    );
}

export default TabSelect;

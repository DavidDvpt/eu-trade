interface TabCheckboxProps {
    name: string;
    value: boolean;
    onChange: (name: string, value: boolean) => void;
    disabled: boolean;
    className?: string;
}

function TabCheckbox({
    name,
    value,
    disabled,
    onChange,
    className,
}: TabCheckboxProps) {
    return (
        <input
            type="checkbox"
            className={className}
            name={name}
            checked={value}
            onChange={(e) => onChange(name, e.target.checked)}
            disabled={disabled}
        />
    );
}

export default TabCheckbox;

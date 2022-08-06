interface TabInputProps {
    name: string;
    value: string | number;
    onChange: (name: string, value: string) => void;
    disabled: boolean;
    className?: string;
    placeholder?: string;
}

function TabInput({
    name,
    value,
    onChange,
    disabled,
    className,
    placeholder,
}: TabInputProps) {
    return (
        <input
            type="text"
            className={className}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            disabled={disabled}
            placeholder={placeholder ?? ''}
        />
    );
}

export default TabInput;

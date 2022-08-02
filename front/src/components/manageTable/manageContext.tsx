import { ChangeEvent, createContext, useState } from 'react';

export default function createManageRowContext<A>() {
    const defaultDisabledValue = true;
    const defaultDataValue = {} as A;
    type UpdateDisabledType = React.Dispatch<React.SetStateAction<boolean>>;
    type UpdateDataType = React.Dispatch<React.SetStateAction<A>>;
    type HandleType = () => void;
    type HandleSaveType = (func: () => void) => void;
    type ChangeType = (
        name: string,
        e: ChangeEvent<HTMLInputElement>,
        isCheckbox?: boolean,
    ) => void;

    const setDisabled: UpdateDisabledType = () => defaultDisabledValue;
    const setDataType: UpdateDataType = () => defaultDataValue;

    const handleUpdate: HandleType = () => {};
    const handleCancel: HandleType = () => {};
    const handleSave: HandleSaveType = (func: () => void) => {};
    const handleDataChange: ChangeType = (
        name: string,
        e: ChangeEvent<HTMLInputElement>,
        isCheckbox = false,
    ) => {};

    const ctx = createContext({
        disabled: defaultDisabledValue,
        setDisabled: setDisabled,
        data: defaultDataValue,
        setData: setDataType,
        handleUpdate,
        handleCancel,
        handleDataChange,
        handleSave,
    });

    const Provider = (
        props: React.PropsWithChildren<Record<string, unknown>>,
    ) => {
        const [disabled, setDisabled] = useState<boolean>(defaultDisabledValue);
        const [data, setData] = useState<A>(defaultDataValue);

        const handleUpdate = () => {
            setDisabled(false);
        };

        const handleCancel = () => {
            setDisabled(true);
        };

        const handleDataChange = (
            name: string,
            e: ChangeEvent<HTMLInputElement>,
            isCheckbox = false,
        ) => {
            const value = isCheckbox ? e.target.checked : e.target.value;
            setData({ ...data, [name]: value });
        };

        return (
            <ctx.Provider
                value={{
                    disabled,
                    setDisabled,
                    data,
                    setData,
                    handleUpdate,
                    handleCancel,
                    handleDataChange,
                    handleSave,
                }}
                {...props}
            />
        );
    };

    return [ctx, Provider] as const;
}

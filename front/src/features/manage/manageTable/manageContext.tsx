import { ChangeEvent, createContext, useState } from 'react';

export interface ManageRowContext<T> {
    disabled: boolean;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    contextData: Family | Partial<Family>;
    setData: React.Dispatch<React.SetStateAction<T | Partial<T>>>;
    handleUpdate: () => void;
    handleCancel: () => void;
    handleSave: () => void;
    handleDataChange: (
        name: string,
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        isCheckbox?: boolean,
    ) => void;
}
export default function createManageRowContext<A>() {
    const defaultDisabledValue = true;
    const defaultContextDataValue = {} as A | Partial<A>;
    type UpdateDisabledType = React.Dispatch<React.SetStateAction<boolean>>;
    type UpdateDataType = React.Dispatch<React.SetStateAction<A | Partial<A>>>;
    type HandleType = () => void;
    type ChangeType = (
        name: string,
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        isCheckbox?: boolean,
    ) => void;

    const setDisabled: UpdateDisabledType = () => defaultDisabledValue;
    const setDataType: UpdateDataType = () => defaultContextDataValue;

    const handleUpdate: HandleType = () => {};
    const handleCancel: HandleType = () => {};
    const handleSave: HandleType = () => {};
    const handleDataChange: ChangeType = (
        name: string,
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        isCheckbox = false,
    ) => {};

    const ctx = createContext({
        disabled: defaultDisabledValue,
        setDisabled: setDisabled,
        contextData: defaultContextDataValue,
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
        const [contextData, setData] = useState<A | Partial<A>>(
            defaultContextDataValue,
        );

        const handleUpdate = () => {
            setDisabled(false);
        };

        const handleCancel = () => {
            setDisabled(true);
        };

        const handleSave = () => {
            setDisabled(true);
        };

        const handleDataChange = (
            name: string,
            e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
            isCheckbox = false,
        ) => {
            const value = isCheckbox
                ? (e as ChangeEvent<HTMLInputElement>).target.checked
                : e.target.value;
            setData({ ...contextData, [name]: value });
        };

        return (
            <ctx.Provider
                value={{
                    disabled,
                    setDisabled,
                    contextData,
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

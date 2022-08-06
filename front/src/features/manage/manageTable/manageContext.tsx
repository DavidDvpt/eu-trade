import { createContext, useState } from 'react';

export interface ManageRowContext<T> {
    disabled: boolean;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    contextData: Family | Partial<Family>;
    setContextData: React.Dispatch<React.SetStateAction<T | Partial<T>>>;
    handleDataChange: (name: string, value: string | boolean | number) => void;
}
export default function createManageRowContext<A>() {
    const defaultDisabledValue = true;
    const defaultContextDataValue = {} as A | Partial<A>;
    type UpdateDisabledType = React.Dispatch<React.SetStateAction<boolean>>;
    type UpdateSetContextDataType = React.Dispatch<
        React.SetStateAction<A | Partial<A>>
    >;
    type ChangeType = (name: string, value: string | boolean | number) => void;

    const setDisabled: UpdateDisabledType = () => defaultDisabledValue;
    const setContextDataType: UpdateSetContextDataType = () =>
        defaultContextDataValue;

    const handleDataChange: ChangeType = (
        name: string,
        value: string | boolean | number,
    ) => {};

    const ctx = createContext({
        disabled: defaultDisabledValue,
        setDisabled: setDisabled,
        contextData: defaultContextDataValue,
        setContextData: setContextDataType,
        handleDataChange,
    });

    const Provider = (
        props: React.PropsWithChildren<Record<string, unknown>>,
    ) => {
        const [disabled, setDisabled] = useState<boolean>(defaultDisabledValue);
        const [contextData, setContextData] = useState<A | Partial<A>>(
            defaultContextDataValue,
        );

        const handleDataChange = (
            name: string,
            value: string | boolean | number,
        ) => {
            setContextData({ ...contextData, [name]: value });
        };

        return (
            <ctx.Provider
                value={{
                    disabled,
                    setDisabled,
                    contextData,
                    setContextData,
                    handleDataChange,
                }}
                {...props}
            />
        );
    };

    return [ctx, Provider] as const;
}

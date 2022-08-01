import { createContext, useState } from 'react';

export default function createManageRowContext<A>() {
    const defaultDisabledValue = true;
    const defaultDataValue = {} as A;
    type UpdateDisabledType = React.Dispatch<React.SetStateAction<boolean>>;
    type UpdateDataType = React.Dispatch<React.SetStateAction<A>>;
    type HandleType = () => void;

    const setDisabled: UpdateDisabledType = () => defaultDisabledValue;
    const setDataType: UpdateDataType = () => defaultDataValue;

    const handleUpdate: HandleType = () => {};
    const handleCancel: HandleType = () => {};

    const ctx = createContext({
        disabled: defaultDisabledValue,
        setDisabled: setDisabled,
        data: defaultDataValue,
        setData: setDataType,
        handleUpdate,
        handleCancel,
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

        return (
            <ctx.Provider
                value={{
                    disabled,
                    setDisabled,
                    data,
                    setData,
                    handleUpdate,
                    handleCancel,
                }}
                {...props}
            />
        );
    };

    return [ctx, Provider] as const;
}

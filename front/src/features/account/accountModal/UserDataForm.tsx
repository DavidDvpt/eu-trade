import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../app/hooks';
import InputCustom from '../../../components/formComponents/inputCustom';
import styles from './accountModal.module.scss';
import { updateAuthUserGlobalDatas } from './thunks';

interface IUserDataFormProps {
    globalDatas: GlobalUserData | null;
}
function UserDataForm({ globalDatas }: IUserDataFormProps) {
    const dispatch = useAppDispatch();
    const {
        handleSubmit,
        register,
        setValue,
        formState: { isDirty },
    } = useForm<Partial<GlobalUserData>>();

    const submit: SubmitHandler<Partial<GlobalUserData>> = (
        datas: Partial<GlobalUserData>,
    ) => {
        if (isDirty) {
            dispatch(updateAuthUserGlobalDatas(datas));
        }
    };

    useEffect(() => {
        if (globalDatas) {
            setValue('initialPedCardValue', globalDatas.initialPedCardValue);
        }
    }, [globalDatas]);

    return (
        <>
            <h3>User global datas</h3>
            <form method="post" onSubmit={handleSubmit(submit)}>
                <div>
                    <label htmlFor="initialPedCardValue">
                        Initial Pedcard Amount :
                    </label>
                    <InputCustom
                        type="number"
                        step="0.01"
                        {...register('initialPedCardValue')}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit">Update User datas</button>
                </div>
            </form>
        </>
    );
}

export default UserDataForm;

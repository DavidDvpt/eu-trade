import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import InputCustom from '../../../components/formComponents/inputCustom';
import styles from './accountModal.module.scss';

interface IUserDataFormProps {
    globalDatas: GlobalUserData | null;
}
function UserDataForm({ globalDatas }: IUserDataFormProps) {
    const { handleSubmit, register, setValue } =
        useForm<Partial<GlobalUserData>>();
    const submit: SubmitHandler<Partial<GlobalUserData>> = (
        datas: Partial<GlobalUserData>,
    ) => {
        console.log(datas);
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

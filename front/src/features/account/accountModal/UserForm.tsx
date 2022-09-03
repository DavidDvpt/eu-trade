import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../app/hooks';
import InputCustom from '../../../components/formComponents/inputCustom';
import styles from './accountModal.module.scss';
import { updateAuthUser } from './thunks';

interface IUserFormProps {
    user: User | null;
}

function UserForm({ user }: IUserFormProps) {
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        register,
        setValue,
        formState: { isDirty },
    } = useForm<Partial<User>>();

    useEffect(() => {
        if (user) {
            setValue('email', user.email);
            setValue('pseudo', user.pseudo);
        }
    }, [user]);

    const submit: SubmitHandler<Partial<User>> = (datas: Partial<User>) => {
        if (isDirty) {
            dispatch(updateAuthUser(datas));
            console.log(datas);
        }
    };

    return (
        <>
            <h3>User</h3>
            <form method="post" onSubmit={handleSubmit(submit)}>
                <div>
                    <label htmlFor="pseudo">Pseudo :</label>
                    <InputCustom type="text" {...register('pseudo')} />
                </div>
                <div>
                    <label htmlFor="email">Email :</label>
                    <InputCustom type="email" {...register('email')} />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit">Update User</button>
                </div>
            </form>
        </>
    );
}

export default UserForm;

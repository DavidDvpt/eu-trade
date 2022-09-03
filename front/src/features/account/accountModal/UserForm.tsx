import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import InputCustom from '../../../components/formComponents/inputCustom';
import { getAccountState } from '../accountSlice';
import { fetchAuthUser } from './thunks';

function UserForm() {
    const { user } = useAppSelector(getAccountState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuthUser(null));
    }, []);

    const { handleSubmit, register } = useForm<Partial<User>>({
        defaultValues: { email: user?.email, pseudo: user?.pseudo },
    });

    const submit: SubmitHandler<Partial<User>> = (datas: Partial<User>) => {
        console.log(datas);
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
            </form>
        </>
    );
}

export default UserForm;

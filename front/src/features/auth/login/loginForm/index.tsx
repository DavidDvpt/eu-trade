import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../../app/hooks';
import InputCustom from '../../../../components/formComponents/inputCustom';
import { loginRequest } from '../../authSlice';
import styles from './loginForm.module.scss';

function LoginForm() {
    const {
        handleSubmit,
        register,
        formState: { dirtyFields },
    } = useForm<LoginRequest>({
        defaultValues: { email: 'david.admin@gmail.com', password: 'pwd' },
    });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<LoginRequest> = (data) => {
        // if (dirtyFields.email && dirtyFields.password) {
        dispatch(loginRequest(data));
        // }
    };

    return (
        <div className={styles.loginForm}>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Login</label>
                    <InputCustom type="text" {...register('email')} />
                </div>

                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <InputCustom type="password" {...register('password')} />
                </div>

                <button
                    type="submit"
                    // disabled={!dirtyFields.email || !dirtyFields.password}
                >
                    Se connecter
                </button>
            </form>
        </div>
    );
}

export default LoginForm;

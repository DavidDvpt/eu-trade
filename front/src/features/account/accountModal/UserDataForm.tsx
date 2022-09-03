import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector } from '../../../app/hooks';
import InputCustom from '../../../components/formComponents/inputCustom';
import { getAccountState } from '../accountSlice';

function UserDataForm() {
    const { globalUserData } = useAppSelector(getAccountState);

    const { handleSubmit, register } = useForm<Partial<GlobalUserData>>({
        defaultValues: {
            initialPedCardValue: globalUserData?.initialPedCardValue,
        },
    });
    const submit: SubmitHandler<Partial<GlobalUserData>> = (
        datas: Partial<GlobalUserData>,
    ) => {
        console.log(datas);
    };
    return (
        <>
            <h3>User global datas</h3>
            <form method="post" onSubmit={handleSubmit(submit)}>
                <div>
                    <label htmlFor="pseudo">Pseudo :</label>
                    <InputCustom
                        type="number"
                        {...register('initialPedCardValue')}
                    />
                </div>
            </form>
        </>
    );
}

export default UserDataForm;

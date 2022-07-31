import { ChangeEvent, FormEvent, useState } from 'react';
import InputCustom from '../../../components/FormComponents/InputCustom';
import { defaultLoginValue } from './constant';
import styles from './loginForm.module.scss';

export interface ILogin {
  login: string;
  password: string;
}

function LoginForm() {
  const [datas, setDatas] = useState<ILogin>(defaultLoginValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const elt = e.target;
    setDatas({ ...datas, [elt.name]: elt.value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(datas);
  };

  return (
    <div className={styles.loginForm}>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Login</label>
          <InputCustom
            type="text"
            value={datas.login}
            name="login"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <InputCustom
            type="password"
            name="password"
            value={datas.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default LoginForm;

import { Link } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { getAuthState } from '../auth/authSlice';
import styles from './nav.module.scss';

function Nav() {
    const { isAdmin } = useAppSelector(getAuthState);
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/sessions">Sessions</Link>
                </li>
                <li>Stock</li>
                <li>Sells</li>
                <li>Statisics</li>
                {isAdmin && (
                    <li>
                        <Link to="/manage">Manage</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Nav;

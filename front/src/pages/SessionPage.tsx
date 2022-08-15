import SessionsTable from '../features/sessions/SessionsTable';
import styles from './styles/sessions.module.scss';

function SessionPage() {
    return (
        <div className={styles.sessions}>
            <h1>Sessions</h1>
            <SessionsTable />
        </div>
    );
}

export default SessionPage;

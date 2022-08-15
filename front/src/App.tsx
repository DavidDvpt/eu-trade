import AppRouter from './router';
import styles from './scss/app.module.scss';

function App() {
    return (
        <div className={styles.app}>
            <AppRouter />
        </div>
    );
}

export default App;

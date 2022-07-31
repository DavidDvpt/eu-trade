import { useGetCategoriesQuery } from './features/appApi';
import styles from './scss/app.module.scss';

function App() {
  const { isError, isFetching, isLoading, isSuccess, data } =
    useGetCategoriesQuery('');

  console.log('ici', isError, isFetching, isLoading, isSuccess, data);
  return <div className={styles.app}>app</div>;
}

export default App;

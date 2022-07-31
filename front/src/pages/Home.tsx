import { useGetCategoriesQuery } from '../features/appApi';
import styles from './styles.home.module.scss';

function Home() {
  const { isError, isFetching, isLoading, isSuccess, data } =
    useGetCategoriesQuery('');

  console.log('ici', isError, isFetching, isLoading, isSuccess, data);
  return <div className={styles.home}>Home</div>;
}

export default Home;

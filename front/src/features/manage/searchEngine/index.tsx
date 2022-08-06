import styles from './searchEngine.module.scss';
interface SearchEngineProps {
    children: React.ReactNode;
}
function SearchEngine({ children }: SearchEngineProps) {
    return <div className={styles.searchEngine}>{children}</div>;
}

export default SearchEngine;

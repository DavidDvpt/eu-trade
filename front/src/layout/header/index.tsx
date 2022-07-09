import Auth from '../../features/auth';
import Nav from '../../features/nav';
import styles from './header.module.scss';
function Header() {
  return (
    <header className={styles.header}>
      <div>logo</div>
      <Nav />
      <Auth />
    </header>
  );
}

export default Header;

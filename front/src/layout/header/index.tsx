import AuthHeader from '../../features/auth/authHeader';
import Nav from '../../features/nav';
import styles from './header.module.scss';
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>logo</div>
      <div className={styles.content}>
        <Nav />
      </div>
      <AuthHeader />
    </header>
  );
}

export default Header;

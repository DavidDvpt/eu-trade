import styles from './authHeader.module.scss';

function AuthHeader() {
  const handleClick = () => {};

  return (
    <div className={styles.authHeader} onClick={handleClick}>
      auth
    </div>
  );
}

export default AuthHeader;

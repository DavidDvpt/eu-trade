import { ReactNode } from 'react';

import ModalContainer from '../features/modals/ModalContainer';
import Footer from './footer';
import Header from './header';
import styles from './layout.module.scss';

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <ModalContainer />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

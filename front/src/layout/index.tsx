import { ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return <div>{children}</div>;
}

export default Layout;

import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Content from './layout/Content';
import Footer from './layout/Footer';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showSidebar?: boolean;
  showFooter?: boolean;
}

const Layout = ({
  children,
  showHeader = true,
  showSidebar = true,
  showFooter = true,
}: LayoutProps) => {
  return (
    <div className='w-[100dvw] md:w-[98.5dvw] h-[100dvh] m-auto'>
      {showHeader && <Header />}
      <div className={`bg-background h-full flex relative`}>
        {showSidebar && <Sidebar />}
        <main
          className={`${showSidebar && 'pl-[64px]'} ${
            showFooter && 'min-h-[calc(100%-512px)]'
          } w-full`}
        >
          <Content show={showFooter}>{children}</Content>
          {showFooter && <Footer />}
        </main>
      </div>
    </div>
  );
};

export default Layout;

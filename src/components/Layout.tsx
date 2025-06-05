import React from 'react';
import Header from './layout/Header';
import Content from './layout/Content';
import Footer from './layout/Footer';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout = ({
  children,
  showHeader = true,
  showFooter = true,
}: LayoutProps) => {
  return (
    // <div className='w-[90dvw] h-[100dvh] lg:w-[98.8dvw] xl:w-[98.8dvw] 2xl:w-[99dvw] mx-auto'>
    <div className='flex flex-col h-[100dvh] lg:max-w-[85dvw] mx-auto bg-background'>
      {showHeader && <Header />}
      <Content show={showFooter}>{children}</Content>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;

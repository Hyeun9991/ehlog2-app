import React from 'react';
import Header from './header/Header';
import Footer from './Footer';

const Layout = ({ children, className }) => {
  return (
    <div>
      <Header />
      <main className={`${className} pt-[44px] pb-10 dark:bg-bgColor-dark `}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

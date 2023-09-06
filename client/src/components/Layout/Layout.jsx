import React from 'react';
import Header2 from './header/Header2';
import Footer from './Footer';

const Layout = ({ children, className }) => {
  return (
    <div>
      {/* <Header /> */}
      <Header2 />
      <main className={`${className} pb-10 dark:bg-bgColor-dark `}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

import React from 'react';
import Header2 from './Header/Header2';
import Footer from './Footer';

const Layout = ({ children, className }) => {
  return (
    <div>
      {/* <Header /> */}
      <Header2 />
      <main
        className={`${className} bg-bgColor-light pb-10 dark:bg-bgColor-dark `}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

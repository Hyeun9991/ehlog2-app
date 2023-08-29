import React from 'react';
import Header from './Header/Header';
import Header2 from './Header/Header2';
import Footer from './Footer';

const Layout = ({ children, className }) => {
  return (
    <div>
      {/* <Header /> */}
      <Header2 />
      <main className={className}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

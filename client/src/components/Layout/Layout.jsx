import React from 'react';
import Header from './Header/Header';
import Footer from './Footer';

const Layout = ({ children, className }) => {
  return (
    <div>
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

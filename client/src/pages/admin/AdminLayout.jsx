import React from 'react';
import Header from './components/header/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen lg:flex-row bg-bgColor-light dark:bg-bgColor-dark">
      <Header />
      <main className="flex-1 p-4 lg:ml-[250px] mt-[44px] lg:mt-0 lg:p-6 bg-bgColor-light dark:bg-bgColor-dark">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

import React from 'react';
import Layout from '../../components/layout/Layout';
import HomeHeader from './container/HomeHeader';
import Articles from './container/Articles';

const HomePage = () => {
  return (
    <Layout className="flex flex-col min-h-screen gap-10 bg-bgColor-light dark:bg-bgColor-dark">
      <HomeHeader />
      <main className="main-container">
        <Articles />
      </main>
    </Layout>
  );
};

export default HomePage;

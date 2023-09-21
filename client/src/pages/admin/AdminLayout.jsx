import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/index/users';
import Header from './components/header/Header';

const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  /**
   * 데이터 가져오기 (Query)
   * useQuery를 사용하여 데이터를 가져오는 쿼리를 정의
   * 데이터를 서버에서 가져오고 캐싱할 수 있음
   */
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ['profile'],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate('/');
        toast.error('관리자 페이지에 접근할 수 없습니다.');
      }
    },
    onError: (error) => {
      console.log(error);
      navigate('/');
      toast.error('관리자 페이지에 접근할 수 없습니다.');
    },
  });

  if (profileIsLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-bgColor-light dark:bg-bgColor-dark">
        <h3 className="text-sm font-light uppercase text-textColor-light dark:text-textColor-dark">
          loading...
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen lg:flex-row bg-bgColor-light dark:bg-bgColor-dark">
      <Header />
      <main className="flex-1 p-4 lg:ml-[250px] mt-[44px] lg:mt-0 lg:p-6 dark:bg-bgColor-dark">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

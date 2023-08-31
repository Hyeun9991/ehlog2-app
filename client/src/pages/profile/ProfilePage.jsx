import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../../services/index/users';
import ProfilePicture from '../../components/ProfilePicture';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  // useQuery 훅을 사용하여 프로필 정보를 가져옴
  const {
    data: profileData, // 가져온 프로필 데이터
    isLoading: profileIsLoading, // 데이터 로딩 중 여부
    error: profileError, // 데이터 가져오기 중 발생한 오류
  } = useQuery({
    queryFn: () => {
      // getUserProfile 함수를 호출하여 사용자 프로필 데이터를 가져오는 쿼리 실행
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ['profile'], // 쿼리 키. 여기서는 'profile'로 설정됨.
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate('/');
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    values: {
      // 프로필 데이터 로딩 중이면 빈 문자열, 그렇지 않으면 프로필 데이터에서 가져온 값
      name: profileIsLoading ? '' : profileData.name,
      email: profileIsLoading ? '' : profileData.email,
    },
    mode: 'onChange',
  });

  const submitHandler = (data) => {};

  return (
    <Layout className="flex items-center justify-center min-h-screen">
      <section className="flex flex-col sm:w-[320px] sm:px-0 items-center justify-center gap-6 main-container">
        <ProfilePicture avatar={profileData?.avatar} />
        <form
          className="flex flex-col w-full gap-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          {/* name */}
          <div className="flex flex-col gap-2 text-textColor-light">
            <label htmlFor="name" className="text-xs opacity-70">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', {
                minLength: {
                  value: 1,
                  message: '한 글자 이상 입력하세요.',
                },
                required: {
                  value: true,
                  message: '이름을 입력하세요.',
                },
              })}
              className={`p-3 py-2 text-sm font-semibold transition-all border rounded-sm outline-none focus:border-2 border-black/30 focus:border-black placeholder:font-light ${
                errors.name ? 'border-red-500' : ''
              }`}
              placeholder="Enter Name"
            />
            {errors.name?.message && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* email */}
          <div className="flex flex-col gap-2 text-textColor-light">
            <label htmlFor="email" className="text-xs opacity-70">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
                required: {
                  value: true,
                  message: '이메일을 입력하세요.',
                },
              })}
              className={`p-3 py-2 text-sm font-semibold transition-all border rounded-sm outline-none focus:border-2 border-black/30 focus:border-black placeholder:font-light ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="Enter Email"
            />
            {errors.email?.message && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col gap-2 text-textColor-light">
            <label htmlFor="password" className="text-xs opacity-70">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: {
                  value: true,
                  message: '비밀번호를 입력하세요.',
                },
                minLength: {
                  value: 6,
                  message: '비밀번호는 6글자 이상 입력하세요.',
                },
              })}
              className={`p-3 py-2 text-sm font-semibold transition-all border rounded-sm outline-none focus:border-2 border-black/30 focus:border-black placeholder:font-light ${
                errors.password ? 'border-red-500' : ''
              }`}
              placeholder="Enter Password"
            />
            {errors.password?.message && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="main-button disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!isValid || profileIsLoading}
          >
            수정하기
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default ProfilePage;

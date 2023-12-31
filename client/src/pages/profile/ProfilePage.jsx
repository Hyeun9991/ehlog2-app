import React, { useEffect, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateProfile } from '../../services/index/users';
import ProfilePicture from '../../components/ProfilePicture';
import { userActions } from '../../store/reducers/userReducers';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  /**
   * 데이터 가져오기 (Query)
   * useQuery를 사용하여 데이터를 가져오는 쿼리를 정의
   * 데이터를 서버에서 가져오고 캐싱할 수 있음
   */
  const {
    data: profileData, // 가져온 프로필 데이터
    isLoading: profileIsLoading, // 데이터 로딩 중 여부
  } = useQuery({
    queryFn: () => {
      // getUserProfile 함수를 호출하여 사용자 프로필 데이터를 가져오는 쿼리 실행
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ['profile'], // 쿼리의 식별자, 'profile' 데이터와 관련된 정보를 가져오거나 업데이트할 때 사용
  });

  /**
   * 데이터 업데이트 (Mutation)
   * useMutation을 사용하여 데이터를 업데이트하는 동작을 정의
   */
  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    // 사용자가 제출한 정보를 바탕으로 updateProfile 함수 호출
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data)); // 사용자 정보 업데이트 액션 디스패치
      localStorage.setItem('account', JSON.stringify(data)); // 로컬 스토리지에 사용자 정보 저장
      queryClient.invalidateQueries(['profile']); // 'profile' 쿼리가 무효화, 이는 새로운 데이터를 가져오거나 업데이트된 데이터를 반영하기 위해 쿼리를 다시 실행하도록 지시
      toast.success('프로필이 성공적으로 업데이트되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // 사용자 정보가 없으면 메인 페이지로 리다이렉트
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
    values: useMemo(() => {
      return {
        // 프로필 데이터 로딩 중이면 빈 문자열
        name: profileIsLoading ? '' : profileData.name,
        email: profileIsLoading ? '' : profileData.email,
      };
    }, [profileData?.email, profileData?.name, profileIsLoading]),
    mode: 'onChange',
  });

  /**
   * 사용자가 제출한 데이터(name, email, password)를
   * mutate 함수를 호출하여 데이터를 업데이트
   */
  const submitHandler = (data) => {
    const { name, email, password } = data;

    // mutate: React Query에서 제공하는 데이터를 업데이트하고 캐시를 갱신하는 함수
    mutate({ name, email, password });
  };

  return (
    <Layout className="flex items-center justify-center min-h-screen bg-bgColor-light dark:bg-bgColor-dark">
      <section className="relative flex flex-col sm:w-[320px] sm:px-0 items-center justify-center gap-4 main-container">
        {/* <h1 className="mb-2 title-xl">프로필</h1> */}
        <ProfilePicture avatar={profileData?.avatar} />
        <form
          className="flex flex-col w-full gap-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          {/* name */}
          <div className="flex flex-col gap-2 text-textColor-light">
            <label htmlFor="name" className="text-xs opacity-70">
              이름
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
              placeholder="변경할 이름을 입력하세요."
            />
            {errors.name?.message && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* email */}
          <div className="flex flex-col gap-2 text-textColor-light">
            <label htmlFor="email" className="text-xs opacity-70">
              이메일
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
              placeholder="변경할 이메일을 입력하세요."
            />
            {errors.email?.message && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col gap-2 text-textColor-light">
            <label htmlFor="password" className="text-xs opacity-70">
              비밀번호 (선택 사항)
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={`p-3 py-2 text-sm font-semibold transition-all border rounded-sm outline-none focus:border-2 border-black/30 focus:border-black placeholder:font-light ${
                errors.password ? 'border-red-500' : ''
              }`}
              placeholder="변경할 비밀번호를 입력하세요."
            />
            {errors.password?.message && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="mt-4 main-button disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!isValid || profileIsLoading || updateProfileIsLoading}
          >
            변경하기
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default ProfilePage;

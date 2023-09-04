import React, { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/index/users';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/reducers/userReducers';
import { images } from '../../constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  /**
   * 데이터 업데이트 (Mutation)
   * useMutation을 사용하여 데이터를 업데이트하는 동작을 정의
   */
  const { mutate, isLoading } = useMutation({
    // 사용자가 제출한 정보를 바탕으로 login 함수 호출
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data)); // 사용자 정보 업데이트 액션 디스패치
      localStorage.setItem('account', JSON.stringify(data)); // 로컬 스토리지에 사용자 정보 저장
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // 사용자 정보가 있다면 메인 페이지로 리다이렉트
  useEffect(() => {
    if (userState.userInfo) {
      navigate('/');
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  /**
   * 사용자가 제출한 데이터(email, password)를
   * mutate 함수를 호출하여 데이터를 업데이트
   */
  const submitHandler = (data) => {
    const { email, password } = data;

    // mutate: React Query에서 제공하는 데이터를 업데이트하고 캐시를 갱신하는 함수
    mutate({ email, password });
  };

  return (
    <Layout className="flex items-center justify-center min-h-screen">
      <section className="flex flex-col items-center justify-center gap-4 main-container">
        <div className="flex flex-col items-center gap-2">
          <Link to="/" className="mb-3">
            <img
              src={images.BlackSmallLogo}
              alt="logo"
              className="hover-logo"
            />
            <h1 className="ml-1 text-sm logo-text">EUNHYE, eunhye ·</h1>
          </Link>
          <h2 className="title-xl">로그인</h2>
        </div>
        <form
          className="w-full sm:w-[320px] flex flex-col gap-4"
          onSubmit={handleSubmit(submitHandler)}
        >
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
              placeholder="이메일을 입력하세요."
            />
            {errors.email?.message && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col gap-2 text-textColor-light">
            <label htmlFor="password" className="text-xs opacity-70">
              비밀번호
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
              placeholder="비밀번호를 입력하세요."
            />
            {errors.password?.message && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="mt-4 main-button disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!isValid || isLoading}
          >
            로그인
          </button>

          <div className="flex items-center justify-center gap-3">
            {/* forget password link */}
            <Link to="/forget-password" className="hover-link">
              비밀번호 찾기
            </Link>

            <span className="mb-[1.5px] font-extralight opacity-70 text-xs">
              |
            </span>

            {/* login link */}
            <p className="text-xs text-textColor-light/70">
              <Link to="/register" className="hover-link">
                회원가입
              </Link>
            </p>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default LoginPage;

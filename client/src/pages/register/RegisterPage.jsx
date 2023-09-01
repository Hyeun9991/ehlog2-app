import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/index/users';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/reducers/userReducers';
import { images } from '../../constants';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  // useMutation 훅을 사용하여 API 호출과 관련된 로직을 처리
  const { mutate, isLoading } = useMutation({
    // 사용자가 제출한 정보를 바탕으로 회원 가입 함수 호출
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
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

  useEffect(() => {
    if (userState.userInfo) {
      navigate('/');
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const password = watch('password');

  const submitHandler = (data) => {
    const { name, email, password } = data;

    // useMutation 훅의 mutate 함수를 호출하여 회원 가입 실행
    mutate({ name, email, password });
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
          <h2 className="title-xl">회원가입</h2>
        </div>
        <form
          className="w-full sm:w-[320px] flex flex-col gap-4"
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
              placeholder="이름을 입력하세요."
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
              placeholder="비빌번호를 입력하세요"
            />
            {errors.password?.message && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* confirm password */}
          <div className="flex flex-col gap-2 text-textColor-light">
            <label htmlFor="confirmPassword" className="text-xs opacity-70">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: '비밀번호를 확인은 필수입니다.',
                },
                validate: (value) => {
                  if (value !== password) {
                    return '비밀번호가 일치하지 않습니다.';
                  }
                },
              })}
              className={`p-3 py-2 text-sm font-semibold transition-all border rounded-sm outline-none focus:border-2 border-black/30 focus:border-black placeholder:font-light ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
              placeholder="비빌번호를 입력하세요"
            />
            {errors.confirmPassword?.message && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="mt-4 main-button disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!isValid || isLoading}
          >
            회원가입
          </button>

          {/* login link */}
          <p className="text-xs text-textColor-light/70">
            계정이 있으세요?{' '}
            <Link to="/login" className="hover-link">
              로그인
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
};

export default RegisterPage;

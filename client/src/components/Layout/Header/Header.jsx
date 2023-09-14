import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuLists } from './menuLists';
import SideBar from './SideBar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/actions/user';
import { images, stables } from '../../../constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section className="fixed left-0 z-50 w-full h-[44px] transition-all duration-300 bg-bgColor-light/70 hover:bg-bgColor-light backdrop-blur-2xl">
      <header className="container flex items-center justify-between h-full px-4 mx-auto">
        {/* Logo */}
        <h1 className="text-sm text-textColor-light">
          <Link to="/" className="logo-text">
            EUNHYE, eunhye ·
          </Link>
        </h1>

        {/* Left Section */}
        <nav className="items-center hidden gap-6 md:flex">
          {/* Menu Lists */}
          <ul className="flex items-center gap-10 text-xs uppercase text-textColor-light">
            {menuLists.map((item) => (
              <li key={item.id}>
                <Link to={item.to} className="hover-text">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {userState.userInfo ? (
            <div className="flex flex-col items-center gap-y-5 gap-x-2">
              <div className="relative group">
                <div className="relative flex flex-col items-center text-textColor-light">
                  <button
                    onClick={handleClick}
                    className="flex items-center px-4 py-2 transition-all gap-x-1"
                  >
                    <img
                      src={
                        userState.userInfo.avatar
                          ? stables.UPLOAD_FOLDER_BASE_URL +
                            userState.userInfo.avatar
                          : images.sampleImage
                      }
                      alt="user profile"
                      className="rounded-full w-7 h-7 group-hover:ring-2 ring-black/20"
                    />
                  </button>

                  {isClicked && (
                    <div
                      className={`absolute flex flex-col hover:scale-110 top-[44px] p-4 gap-4  right-[12px] w-40 transition-all rounded bg-bgColor-dark backdrop-blur-2xl ${
                        isClicked ? 'block' : 'hidden'
                      }`}
                    >
                      <div className="flex flex-col items-center px-6">
                        <img
                          src={
                            userState.userInfo.avatar
                              ? stables.UPLOAD_FOLDER_BASE_URL +
                                userState.userInfo.avatar
                              : images.sampleImage
                          }
                          alt="user profile"
                          className="w-20 h-20 mb-2 border rounded-full border-bgColor-light/20 group-hover:ring-2 ring-black/20"
                        />
                        <p className="text-sm font-semibold text-textColor-dark">
                          {userState.userInfo.name}
                        </p>
                        <Link
                          to={`mailto:${userState.userInfo.email}`}
                          target="_blank"
                          className="text-sm text-textColor-dark hover-text"
                        >
                          {userState.userInfo.email}
                        </Link>
                      </div>
                      <ul className="flex flex-col items-center gap-3 pt-3 text-xs transition-all border-t opacity-90 hover:opacity-100 text-textColor-dark border-bgColor-light/20">
                        <button
                          type="button"
                          className="hover-text"
                          onClick={() => navigate('/profile')}
                        >
                          프로필
                        </button>
                        {userState?.userInfo?.admin && (
                          <button
                            type="button"
                            className="hover-text"
                            onClick={() => navigate('/admin')}
                          >
                            관리자 대시보드
                          </button>
                        )}
                        <button
                          type="button"
                          className="font-semibold text-red-500 opacity-100 hover-text"
                          onClick={logoutHandler}
                        >
                          로그아웃
                        </button>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Sign in Button */}
              <button
                onClick={() => navigate('/login')}
                className="py-2 uppercase main-button"
              >
                로그인
              </button>
            </>
          )}
        </nav>

        {/* Side Bar */}
        <SideBar />
      </header>
    </section>
  );
};

export default Header;

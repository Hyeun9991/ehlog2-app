import React, { useState } from 'react';
import { IoCloseOutline, IoMenuOutline, IoArrowForward } from 'react-icons/io5';
import { menuLists, contactLists } from './menuLists';
import images from '../../../constants/images';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/actions/user';

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [showSidebar, setShowSidebar] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Side Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="z-50 flex items-center text-2xl cursor-pointer text-textColor-light md:hidden hover-text hover:scale-110"
      >
        {showSidebar ? <IoCloseOutline /> : <IoMenuOutline />}
      </button>

      {/* Side Menu */}
      <div
        className={`top-0 right-0 px-6 sm:px-14 py-20 sm:py-24 w-full fixed h-screen z-40 ease-in-out duration-300 flex flex-col gap-y-7 sm:gap-y-10 ${
          showSidebar
            ? 'translate-x-0 bg-bgColor-light'
            : 'translate-x-full bg-bgColor-light/20'
        }`}
      >
        <Link to="/">
          <img
            src={images.BlackSmallLogo}
            alt="logo"
            className="transition-all hover:scale-110"
          />
        </Link>
        <ul className="flex flex-col ml-1 text-2xl uppercase text-textColor-light gap-y-3">
          <p className="mb-1 additional-text">메뉴</p>
          {menuLists.map((item) => (
            <li className="flex" key={item.id}>
              <Link
                to={item.to}
                className="flex items-center justify-between w-full transition-all peer opacity-95 hover:opacity-100 hover:text-black"
              >
                {item.name}
              </Link>
              <span className="invisible text-lg text-textColor-light peer-hover:visible">
                <IoArrowForward />
              </span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col ml-1 uppercase text-textColor-light gap-y-3">
          <p className="mb-1 additional-text">소셜 & 연락</p>
          {contactLists.map((item) => (
            <li key={item.id}>
              <Link to={item.to} target="_blank" rel="noreferrer">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {userState.userInfo ? (
          <ul className="flex flex-col items-start text-textColor-light gap-y-3">
            <p className="mb-1 additional-text">계정</p>
            <button
              type="button"
              className="hover-text"
              onClick={() => navigate('/profile')}
            >
              프로필
            </button>
            <button
              type="button"
              className="font-semibold text-red-500 opacity-100 hover-text"
              onClick={logoutHandler}
            >
              로그아웃
            </button>
          </ul>
        ) : (
          <>
            {/* Sign in Button */}
            <button
              onClick={() => navigate('/login')}
              className="py-2 uppercase main-button sm:w-[30vw]"
            >
              로그인
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SideBar;

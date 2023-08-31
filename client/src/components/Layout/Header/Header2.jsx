import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuLists } from './menuLists';
import SideBar from './SideBar';
import { useSelector, useDispatch } from 'react-redux';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { logout } from '../../../store/actions/user';

const Header2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [profileDropdown, setProfileDropdown] = useState(false);

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
                <div className="flex flex-col items-center text-textColor-light">
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center px-4 py-2 transition-all gap-x-2 opacity-90 hover:opacity-100"
                  >
                    <span className="text-xs uppercase">Account</span>
                    <MdKeyboardArrowDown />
                  </button>

                  <div
                    className={`${
                      profileDropdown ? 'block' : 'hidden'
                    } bg-bgColor-light lg:hidden transition-all duration-300 rounded-b-sm md:absolute md:bottom-0 md:right-0 md:transform md:translate-y-full md:group-hover:block w-full py-4`}
                  >
                    <ul className="flex flex-col overflow-hidden text-xs text-center gap-y-3 md:bg-transparent text-textColor-light">
                      <button
                        type="button"
                        className="uppercase hover-text"
                        onClick={() => navigate('/profile')}
                      >
                        Profile Page
                      </button>
                      <button
                        type="button"
                        className="uppercase hover-text"
                        onClick={logoutHandler}
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
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
                Sign in
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

export default Header2;

import React from 'react';
import { Link } from 'react-router-dom';
import { menuLists } from './menuLists';
import SideBar from './SideBar';

const Header2 = () => {
  return (
    <section className="z-50 bg-bgColor-dark/70 hover:bg-bgColor-dark backdrop-blur-2xl fixed left-0 py-2.5 w-full transition-all duration-300">
      <header className="container flex items-center justify-between px-4 mx-auto">
        {/* Logo */}
        <h1 className="text-sm text-textColor-dark">
          <Link to="/" className="logo-text">
            EUNHYE, eunhye ·
          </Link>
        </h1>

        {/* Left Section */}
        <nav className="items-center hidden gap-10 md:flex">
          {/* Menu Lists */}
          <ul className="flex items-center gap-10 text-xs uppercase text-textColor-dark">
            {menuLists.map((item) => (
              <li key={item.id}>
                <Link to={item.to} className="hover-text">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Sign in Button */}
          <button className="main-button-white">
            <Link to="/login">Sign in</Link>
          </button>
        </nav>

        {/* Side Bar */}
        <SideBar />
      </header>
    </section>
  );
};

export default Header2;

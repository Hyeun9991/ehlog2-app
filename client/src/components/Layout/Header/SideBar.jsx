import React, { useState } from 'react';
import { IoCloseOutline, IoMenuOutline, IoArrowForward } from 'react-icons/io5';
import { menuLists, contactLists } from './menuLists';
import images from '../../../constants/images';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* Side Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="z-50 flex items-center text-2xl cursor-pointer text-textColor-dark md:hidden hover-text hover:scale-110"
      >
        {showSidebar ? <IoCloseOutline /> : <IoMenuOutline />}
      </button>

      {/* Side Menu */}
      <div
        className={`top-0 right-0 px-6 sm:px-14 py-20 sm:py-24 w-full fixed h-screen z-40 ease-in-out duration-300 flex flex-col gap-y-7 sm:gap-y-10 ${
          showSidebar
            ? 'translate-x-0 bg-bgColor-dark'
            : 'translate-x-full bg-bgColor-dark/20'
        }`}
      >
        <Link to="/">
          <img
            src={images.LightSmallLogo}
            alt="logo"
            className="transition-all hover:scale-110"
          />
        </Link>
        <ul className="flex flex-col text-2xl uppercase text-textColor-dark gap-y-3">
          <p className="mb-1 additional-text">Menu</p>
          {menuLists.map((item) => (
            <li className="flex" key={item.id}>
              <Link
                to={item.to}
                className="flex items-center justify-between w-full transition-all peer opacity-95 hover:opacity-100 hover:text-white"
              >
                {item.name}
              </Link>
              <span className="invisible text-lg text-textColor-dark peer-hover:visible">
                <IoArrowForward />
              </span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col uppercase text-textColor-dark gap-y-3">
          <p className="mb-1 additional-text">Social & Contact</p>
          {contactLists.map((item) => (
            <li key={item.id}>
              <Link to={item.to} target="_blank" rel="noreferrer">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;

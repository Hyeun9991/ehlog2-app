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
        className="z-50 flex items-center text-2xl transition-all cursor-pointer md:hidden text-[#eeeeee]/70 hover:text-[#eeeeee] hover-icon"
      >
        {showSidebar ? <IoCloseOutline /> : <IoMenuOutline />}
      </button>

      {/* Side Menu */}
      <div
        className={`top-0 right-0 px-6 sm:px-14 py-20 sm:py-24 w-full fixed h-screen z-40 ease-in-out duration-200 flex flex-col gap-y-7 sm:gap-y-10 ${
          showSidebar
            ? 'translate-x-0 bg-[#151515]'
            : 'translate-x-full bg-[#151515]/40'
        } `}
      >
        <Link to="/">
          <img
            src={images.LightSmallLogo}
            alt="logo"
            className="transition-all hover:scale-110"
          />
        </Link>
        <ul className="flex flex-col text-2xl text-[#eeeeee] gap-y-3 uppercase">
          <p className="mb-1 font-light opacity-60">Menu</p>
          {menuLists.map((item) => (
            <li className="flex" key={item.id}>
              <a
                href={item.to}
                className="flex items-center justify-between w-full transition-all peer opacity-95 hover:opacity-100 hover:text-white"
              >
                {item.name}
              </a>
              <span className="invisible text-lg text-[#eeeeee] peer-hover:visible">
                <IoArrowForward />
              </span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col  text-[#eeeeee] gap-y-3 uppercase">
          <p className="mb-1 font-light opacity-60">Social & Contact</p>
          {contactLists.map((item) => (
            <li key={item.id}>
              <a href={item.to} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;

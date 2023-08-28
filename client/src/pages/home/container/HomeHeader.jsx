import React from 'react';
import images from '../../../constants/images';
import { Link } from 'react-router-dom';
import {
  menuLists,
  contactLists,
} from '../../../components/Layout/Header/menuLists';

const HomeHeader = () => {
  return (
    <section className="pb-4">
      <div className="py-1.5 text-xs text-white uppercase bg-black font-CrimsonPro">
        <div className="main-container">
          <ul className="flex items-center justify-end gap-6">
            {contactLists.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  target="_blank"
                  className="transition-all hover:font-sans hover:font-semibold"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col pt-10 main-container">
        {/* Logo */}
        <Link to="/">
          <img
            src={images.BlackLogo}
            alt="logo"
            className="transition-all hover:scale-110"
          />
        </Link>
        <div className="flex flex-col gap-4 px-3 md:items-center md:flex-row md:gap-14">
          {/* info */}
          <div>
            <p className="text-sm font-semibold">hyeun9991</p>
            <p className="text-xs opacity-70">Frontend Developer</p>
          </div>

          {/* Menu */}
          <ul className="flex flex-col gap-4 text-xs uppercase md:flex-row md:items-center md:gap-10">
            {menuLists.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className="transition-all opacity-70 hover:opacity-100 hover:font-semibold"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;

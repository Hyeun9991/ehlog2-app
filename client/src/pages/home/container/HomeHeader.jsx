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
      {/* line */}
      <div className="py-2 text-xs text-[#eeeeee] bg-black font-CrimsonPro">
        <div className="main-container">
          <ul className="flex items-center justify-end gap-6">
            {contactLists.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  target="_blank"
                  className="transition-all opacity-70 hover:opacity-100 hover:font-sans hover:font-semibold"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* header banner? */}
      <div className="flex items-end justify-between pt-4 main-container">
        {/* Logo */}
        <Link to="/" className="font-CrimsonPro">
          <img
            src={images.BlackLogo}
            alt="logo"
            className="transition-all hover:scale-110"
          />
          <div className="ml-3">
            <p className="tracking-widest">EUNHYE, eunhye ·</p>
            <p className="text-xs opacity-70">Blog on Frontend Developer</p>
          </div>
        </Link>
        {/* Menu */}
        <ul className="flex flex-col items-end justify-end gap-3 mx-3 text-sm uppercase">
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
        {/* <ul className="flex flex-col gap-4 text-xs uppercase md:flex-row md:items-center md:gap-10">
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
        </ul> */}
        {/* <div className="flex flex-col gap-4 px-3 md:items-center md:flex-row md:gap-14">
        </div> */}
      </div>
    </section>
  );
};

export default HomeHeader;

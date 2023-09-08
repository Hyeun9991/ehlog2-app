import React from 'react';
import images from '../../../constants/images';
import { Link } from 'react-router-dom';
import {
  menuLists,
  contactLists,
} from '../../../components/layout/header/menuLists';

const HomeHeader = () => {
  return (
    <section>
      {/* line header */}
      <div className="py-1.5 bg-bgColor-dark mb-4">
        <div className="container px-4 mx-auto">
          <ul className="flex items-center justify-end gap-6 text-xs uppercase text-textColor-dark">
            {contactLists.map((item) => (
              <li key={item.id}>
                <Link to={item.to} target="_blank" className="hover-text">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* header banner */}
      <div className="flex items-end justify-between main-container">
        {/* Logo */}
        <Link to="/">
          <img src={images.BlackLogo} alt="logo" className="hover-logo" />
          <div className="ml-3 text-textColor-light">
            <p className="logo-text">EUNHYE, eunhye ·</p>
            <p className="text-sm additional-text">
              Blog on Frontend Developer
            </p>
          </div>
        </Link>
        {/* Menu */}
        <div className="flex flex-col items-end gap-1 mx-3 mb-3 text-xs uppercase sm:text-sm">
          <p className="mx-2 text-xs additional-text text-textColor-light">
            menu
          </p>
          <ul className="flex flex-col items-end justify-center gap-3 text-xs uppercase bg-black hover-logo w-[100px] h-[100px] p-2 rounded text-textColor-dark">
            {menuLists.map((item) => (
              <li key={item.id}>
                <Link to={item.to} className="hover-text">
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

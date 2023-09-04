import React from 'react';
import { contactLists } from './header/menuLists';
import { Link } from 'react-router-dom';
import images from '../../constants/images';

const Footer = () => {
  return (
    <section className="py-6 bg-black md:py-3">
      <footer className="container flex flex-col-reverse items-center justify-between gap-6 px-4 mx-auto md:flex-row">
        {/* Last Update */}
        <p className="text-xs uppercase text-textColor-dark opacity-90">
          Last Update 2023.08.28
        </p>

        {/* Contact Lists */}
        <ul className="flex items-center gap-6 text-xs uppercase transition-all md:gap-10 text-textColor-dark">
          {contactLists.map((item) => (
            <li key={item.id}>
              <Link to={item.to} className="hover-text" target="_blank">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <Link to="/">
          <img
            src={images.LightSmallLogo}
            alt="logo"
            className="transition-all hover:scale-110"
          />
          <p className="ml-1 text-sm logo-text text-textColor-dark">
            EUNHYE, eunhye ·
          </p>
        </Link>
      </footer>
    </section>
  );
};

export default Footer;

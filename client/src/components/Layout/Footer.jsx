import React from 'react';
import { contactLists } from './Header/menuLists';
import { Link } from 'react-router-dom';
import images from '../../constants/images';

const Footer = () => {
  return (
    <section className="py-6 md:py-2.5 bg-black">
      <footer className="container flex flex-col-reverse items-center justify-between gap-6 px-4 mx-auto md:flex-row">
        {/* Last Update */}
        <p className="text-xs uppercase text-textColor-dark opacity-70">
          Last Update 2023.08.28
        </p>

        {/* Contact Lists */}
        <ul className="flex items-center gap-6 md:gap-10 transition-all uppercase text-xs text-[#eeeeee]">
          {contactLists.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                className="transition-all opacity-70 hover:opacity-100 hover:font-sans hover:font-semibold"
                target="_blank"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <Link to="/" className="text-[#eeeeee] text-sm font-CrimsonPro">
          <img
            src={images.LightSmallLogo}
            alt="logo"
            className="transition-all hover:scale-110"
          />
          <p className="ml-1 tracking-widest">EUNHYE, eunhye ·</p>
        </Link>
      </footer>
    </section>
  );
};

export default Footer;

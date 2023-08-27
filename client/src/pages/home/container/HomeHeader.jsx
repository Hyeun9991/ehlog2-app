import React from 'react';
import images from '../../../constants/images';
import { Link } from 'react-router-dom';

const HomeHeader = () => {
  return (
    <section className="pb-4">
      <div className="py-1.5 text-xs text-white uppercase bg-black font-CrimsonPro">
        <div className="main-container">
          <ul className="flex items-center justify-end gap-6">
            <li>
              <a
                href="mailto:hyeun9991@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="transition-all hover:font-sans hover:font-semibold"
              >
                email
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Hyeun9991"
                target="_blank"
                rel="noreferrer"
                className="transition-all hover:font-sans hover:font-semibold"
              >
                github
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col pt-10 main-container">
        {/* Logo */}
        <Link to="/">
          <img src={images.BlackLogo} alt="logo" />
        </Link>
        <div className="flex flex-col gap-4 px-3 md:items-center md:flex-row md:gap-14">
          {/* info */}
          <div>
            <p className="text-sm font-semibold">hyeun9991</p>
            <p className="text-xs opacity-70">Frontend Developer</p>
          </div>

          {/* Menu */}
          <ul className="flex flex-col gap-4 text-xs uppercase md:flex-row md:items-center md:gap-10">
            <li>
              <Link
                to="/about"
                className="transition-all opacity-70 hover:opacity-100 hover:font-semibold"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/posts"
                className="transition-all opacity-70 hover:opacity-100 hover:font-semibold"
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="transition-all opacity-70 hover:opacity-100 hover:font-semibold"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;

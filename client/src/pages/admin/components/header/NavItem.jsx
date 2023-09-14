import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ link, title, name, activeNavName, setActiveNavName }) => {
  return (
    <NavLink
      to={link}
      className={`${
        name === activeNavName ? 'font-semibold' : 'font-light'
      } flex items-center gap-x-2 text-textColor-light hover-text`}
      onClick={() => setActiveNavName(name)}
    >
      {title}
    </NavLink>
  );
};

export default NavItem;

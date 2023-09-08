import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ data }) => {
  return (
    <nav className="flex items-center overflow-x-auto whitespace-normal">
      <ul className="flex">
        {data.map((item, index) => (
          <li
            key={item.id}
            className="text-xs transition-all text-textColor-light additional-text hover:font-semibold hover:opacity-100"
          >
            <Link to={item.to}>{item.name}</Link>
            {index !== data.length - 1 && <span className="px-1">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;

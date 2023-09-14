import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavItemCollapse = ({
  content,
  title,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);

  return (
    <div className="min-h-0 rounded-none collapse bg-base-200 collapse-arrow text-textColor-light">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={name === activeNavName}
        onChange={() => {
          setActiveNavName(name);
          setIsChecked(!isChecked);
        }}
      />
      <div
        className={`flex items-center min-h-0 py-0 pl-0 hover-text collapse-title gap-x-2 ${
          name === activeNavName ? 'font-semibold' : 'font-light'
        }`}
      >
        {title}
      </div>
      <div className="collapse-content">
        <div className="flex flex-col mt-4 text-sm gap-y-3">
          {content.map((item) => (
            <Link
              to={item.link}
              key={item.title}
              className="flex items-center gap-2 hover-text"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavItemCollapse;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../../../constants';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
import { IoIosCreate, IoMdSettings } from 'react-icons/io';
import NavItemCollapse from './NavItemCollapse';
import NavItem from './NavItem';
import { useWindowSize } from '@uidotdev/usehooks';

const MENU_ITEMS = [
  {
    title: '관리자 대시보드',
    link: '/admin',
    name: 'dashboard',
    type: 'link',
  },
  {
    title: '댓글',
    link: '/admin/comments',
    name: 'comments',
    type: 'link',
  },
  {
    title: '포스트',
    content: [
      { title: '작성하기', link: '/admin/posts/new', icon: <IoIosCreate /> },
      {
        title: '관리하기',
        link: '/admin/posts/manage',
        icon: <IoMdSettings />,
      },
    ],
    name: 'posts',
    type: 'collapse',
  },
];

const Header = () => {
  const windowSize = useWindowSize();

  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState('dashboard');

  const toggleMenuHandler = () => {
    setIsMenuActive(!isMenuActive);
  };

  // 데스크탑 버전에서는 사이드바가 자동으로 활성화되어있음.
  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  return (
    <header className="bg-bgColor-light fixed top-0 left-0 flex h-[44px] w-full items-center justify-between px-4 py-1 lg:h-full lg:max-w-[250px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      {/* 로고 */}
      <Link to="/">
        <img
          src={images.BlackSmallLogo}
          alt="logo"
          className="w-8 lg:hidden hover-logo"
        />
      </Link>

      {/* 메뉴 버튼 */}
      <button
        onClick={toggleMenuHandler}
        className="z-50 flex items-center text-2xl cursor-pointer text-textColor-light hover-text hover:scale-110 lg:hidden"
      >
        {isMenuActive ? <IoCloseOutline /> : <IoMenuOutline />}
      </button>

      {/* 사이드바 컨테이너, 데스크탑 */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          {/* underlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />

          {/* 사이드바 */}
          <div className="fixed top-0 bottom-0 right-0 z-50 w-2/3 sm:w-[300px] p-4 overflow-y-auto bg-[#f2f2f2] lg:static lg:h-full lg:w-full lg:p-6">
            <Link to="/">
              <img
                src={images.BlackSmallLogo}
                alt="logo"
                className="hover-logo"
              />
            </Link>
            <h4 className="mt-6 ml-1 text-textColor-light additional-text">
              메뉴
            </h4>

            {/* menu items */}
            <div className="flex flex-col gap-3 mt-3 ml-1">
              {MENU_ITEMS.map((item) =>
                item.type === 'link' ? (
                  <NavItem
                    key={item.title}
                    title={item.title}
                    link={item.link}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                ) : (
                  <NavItemCollapse
                    key={item.title}
                    title={item.title}
                    content={item.content}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

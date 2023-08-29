import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { menuLists } from './menuLists';
import SideBar from './SideBar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // handleScroll 함수가 prevScrollPos에 의존하는 상태와 함께 메모이제이션됨.
  // 의존성 배열에는 메모이제이션된 함수만 넣을 수 있어서 의도치 않은 불필요한 재렌더링을 방지하고 성능을 최적화할 수 있음
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;

    // 현재 스크롤 위치와 이전 스크롤 위치 비교하여 스크롤 방향 확인
    if (currentScrollPos > prevScrollPos) {
      setIsScrolled(false); // 스크롤을 내릴 때 헤더 나타냄
    } else {
      setIsScrolled(true); // 스크롤을 올릴 때 헤더 숨김
    }

    // 현재 스크롤 위치를 이전 스크롤 위치로 설정
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]); // prevScrollPos가 변경될 때마다 핸들러 재생성

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]); // 핸들러 함수가 변경될 때마다 useEffect 재실행

  return (
    <section
      className={`z-50 bg-bgColor-dark/70 hover:bg-bgColor-dark backdrop-blur-2xl fixed left-0 py-2.5 w-full transition-all duration-300 ${
        isScrolled ? 'top-0' : 'top-[-100%]'
      }`}
    >
      <header className="container flex items-center justify-between px-4 mx-auto">
        {/* Logo */}
        <h1 className="text-sm text-textColor-dark">
          <Link to="/" className="logo-text">
            EUNHYE, eunhye ·
          </Link>
        </h1>

        {/* Left Section */}
        <nav className="items-center hidden gap-10 md:flex">
          {/* Menu Lists */}
          <ul className="flex items-center gap-10 text-xs uppercase text-textColor-dark">
            {menuLists.map((item) => (
              <li key={item.id}>
                <Link to={item.to} className="hover-text">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Sign in Button */}
          <button className="main-button-white">
            <Link to="/login">Sign in</Link>
          </button>
        </nav>

        {/* Side Bar */}
        <SideBar />
      </header>
    </section>
  );
};

export default Header;

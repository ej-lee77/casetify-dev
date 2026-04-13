import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore';
import "./scss/Header.scss"
import { useMainSlider } from '../store/useMainSlider';

export default function Header() {
  const { mainMenuList } = useProductStore();

  const navigate = useNavigate();
  //헤더글자색 변경
  const headerColor = useMainSlider((state) => state.headerColor)

  // 스크롤 체크 변수
  const [isScrolled, setIsScrolled] = useState(false);
  const [topBtn, setTopBtn] = useState(false);

  // 현재 위치 체크 함수 hook useLocation()
  const location = useLocation();
  const isHome = location.pathname === "/";

  // 윈도우 스크롤 이벤트 + 스크롤 위치 체크
  useEffect(() => {
    // 현재 위치 확인
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      // 스크롤의 위치가 100px 넘어가면 isScrolled → true 반환
      setIsScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", handleScroll)

    // 처음 값 체크
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome])

  return (
    <header className={`${isScrolled ? "active" : ""} ${headerColor}`}>
      <div className="header-left">
        <h1 className="logo"><Link to="/"><img src="./images/casetify-logo-15th.png" alt="casetify" /></Link></h1>
        <nav>
          <ul className="main-menu">
            {mainMenuList.map(menu => (
              <li key={menu.link}>
                {menu.sub?.length > 0 ? (
                  <>
                    <Link>{menu.name}</Link>
                    <ul className='sub-menu'>
                      {menu.sub.map((s) => (
                        <li key={s.link}>
                          <Link to={`/${menu.link}/${s.link}`}>{s.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={`/${menu.link}`}>{menu.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <ul className="gnb-list">
          <li>
            <Link><img src="./images/icon/search_var.svg" alt="검색" /></Link>
          </li>
          <li>
            <Link><span>로그인</span></Link>
          </li>
          <li>
            <Link><img src="./images/icon/btn_shopping-cart.svg" alt="장바구니" /></Link>
          </li>
          <li>
            <Link><img src="./images/icon/icon_favorite.svg" alt="위시리스트" /></Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

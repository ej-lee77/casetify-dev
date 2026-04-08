import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./scss/Header.scss"

export default function Header() {
  // 메인메뉴 (좌측)
  const mainMenus = [
    { key: "case", label: "케이스" },
    { key: "accessory", label: "악세서리" },
    { key: "travel", label: "트래블" },
    { key: "giftCard", label: "기프트카드" },
    { key: "brand", label: "브랜드" },
  ]

  const navigate = useNavigate();
  // 스크롤 체크 변수
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header className={isScrolled ? "active" : ""}>
      <div className="header-left">
        <h1 className="logo">
          <Link to={"/"}><img src="./images/header-footer/casetify-logo-15th.png" alt="CASETIfY_Logo" /></Link>
        </h1>
        <nav>
          <ul className="main-menu">
            {mainMenus.map((menu) => (
              <li key={menu.key}>
                <Link>{menu.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
      <div className="header-right">
        <ul className="gnb-list">
          <li>
            <Link><img src="./images/header-footer/search_var.svg" alt="검색" /></Link>
          </li>
          <li>
            <Link><span>로그인</span></Link>
          </li>
          <li>
            <Link><img src="./images/header-footer/btn_shopping-cart.svg" alt="장바구니" /></Link>
          </li>
          <li>
            <Link><img src="./images/header-footer/icon_favorite.svg" alt="위시리스트" /></Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

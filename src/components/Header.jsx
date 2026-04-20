import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore';
import "./scss/Header.scss"
import { useMainSlider } from '../store/useMainSlider';
import { useAuthStore } from '../store/useAuthStore';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const { mainMenuList } = useProductStore();
  const { user, onLogout } = useAuthStore();
  const [MenuActive, setMenuActive] = useState(null);

  const navigate = useNavigate();

  // 스크롤 체크 변수
  const [isScrolled, setIsScrolled] = useState(false);
  // 현재 위치 체크 함수 hook useLocation()
  const location = useLocation();
  const isHome = location.pathname === "/";

  //헤더글자색 변경
  const { headerColor, setHeaderColor } = useMainSlider();

  // 윈도우 스크롤 이벤트 + 스크롤 위치 체크
  useEffect(() => {
    // 현재 위치 확인
    if (!isHome) {
      setIsScrolled(true);
      setHeaderColor("#2f2f2f");
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
  }, [isHome, MenuActive])

  const handleLogout = async () => {
    const isLogout = await onLogout();

    if (isLogout) {
      navigate("/");
    }
  }
  console.log("here", user);


  // 검색창 열림/닫힘 확인
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleSearch = () => { setIsSearchOpen((prev) => !prev) }

  return (
    <>
      <header className={`${isScrolled || MenuActive !== null ? "active" : ""} ${headerColor}`}>
        <div className="header-left">
          <h1 className="logo"><Link to="/"><img src="/images/casetify-logo-15th.png" alt="casetify" /></Link></h1>
          <nav>
            <ul className="main-menu">
              {mainMenuList.map(menu => (
                <li key={menu.link} onMouseEnter={() => setMenuActive(menu.link)} onMouseLeave={() => setMenuActive(null)}>
                  {menu.sub?.length > 0 ? (
                    <>
                      <Link>{menu.name}</Link>
                      <ul className={`sub-menu ${MenuActive === menu.link ? 'active' : ''}`}>
                        {menu.sub.map((s) => (
                          <li key={s.link}>
                            <Link to={`/${menu.link}/${s.link}`}>
                              <div>
                                <span><img src={`/images/header-footer/menu/${menu.link}-${s.link}.png`} alt={s.name} /></span>
                                <span>{s.name}</span>
                              </div>
                            </Link>
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
              <Link className={`search-icon ${isSearchOpen ? "active" : ""}`} onClick={toggleSearch} ><img src={isSearchOpen ? "/images/icon/close-24dp.svg" : "/images/icon/search_var.svg"} alt={isSearchOpen ? "검색닫기" : "검색"} /></Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/mypage" className='mypage-icon'><img src="/images/icon/user.svg" alt="내정보" /></Link>
                </li>
                <li>
                  <a className='logout-icon' onClick={handleLogout}><img src="/images/icon/logout.svg" alt="로그아웃" /></a>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className='user-icon'><img src="/images/icon/user.svg" alt="로그인" /></Link>
              </li>
            )}
            <li>
              <Link><img src="/images/icon/btn_shopping-cart.svg" alt="장바구니" /></Link>
            </li>
            <li>
              <Link><img src="/images/icon/icon_favorite.svg" alt="위시리스트" /></Link>
            </li>
          </ul>
        </div>
      </header>

      <SearchOverlay isActive={isSearchOpen} onClose={toggleSearch} />
    </>

  )
}

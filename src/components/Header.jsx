import React from 'react'
import { Link } from 'react-router-dom'
import "./scss/Header.scss"

// 메인메뉴 (좌측)
const mainMenus = [
  { key: "case", label: "케이스" },
  { key: "accessory", label: "악세서리" },
  { key: "travel", label: "트래블" },
  { key: "giftCard", label: "기프트카드" },
  { key: "brand", label: "브랜드" },
]


export default function Header() {
  return (
    <header>
      <div className="header-left">
        <h1 className="logo">
          <Link to={"/"}>casetify</Link>
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
          <li>검색</li>
          <li>로그인</li>
          <li>장바구니</li>
          <li>Wishlist</li>
        </ul>
      </div>
    </header>
  )
}

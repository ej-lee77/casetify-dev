import React, { useState } from 'react'
import "./scss/Mypage.scss"
import Benefit from '../components/Benefit'
import WishList from '../components/sub/WishList'
import MypageMenu from '../components/sub/MypageMenu'
import { useLocation } from 'react-router-dom'


export default function Mypage() {
  const location = useLocation();

  // 왼쪽 메뉴 체크 변수
  const [selectMenu, setSelectMenu] = useState()

  // 왼쪽 메뉴를 클릭하면 메뉴 변경
  const handleMenuClick = ((menu) => {
    console.log(menu);
  })

  return (
    <div className="sub-page-wrap">
      <div className="inner">
        <div className="my-page-wrap">
          <div className="my-page-menu">
            {/* 마이페이지 메뉴 컴포넌트 */}
            <MypageMenu sendSelect={handleMenuClick} />
          </div>
          <div className="my-page-content">
            {/* 위시리스트 컴포넌트 */}
            <WishList />
          </div>
        </div>
        <Benefit />
      </div>
    </div>
  )
}

import React from 'react'
import "./scss/Mypage.scss"
import Benefit from '../components/Benefit'
import WishList from '../components/sub/WishList'
import MypageMenu from '../components/sub/MyPageMenu'


export default function Mypage() {
  return (
    <div className="sub-page-wrap">
      <div className="inner">
        <div className="my-page-wrap">
          <div className="my-page-menu">
            {/* 마이페이지 메뉴 컴포넌트 */}
            <MypageMenu />
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

import React, { useState } from 'react'
import "./scss/Mypage.scss"
import Benefit from '../components/Benefit'
import WishList from '../components/sub/WishList'
import MypageMenu from '../components/sub/MypageMenu'
import { useLocation } from 'react-router-dom'


export default function Mypage() {
  const location = useLocation();

  // 왼쪽 메뉴 체크 변수
  const [selectMenu, setSelectMenu] = useState(location.state?.menu || "위시리스트");

  // 왼쪽 메뉴를 클릭하면 메뉴 변경
  const handleMenuClick = ((menu) => {
    setSelectMenu(menu);
    console.log(menu);
  })

  // 오른쪽 보여줄 컴포넌트
  const handleContent = () => {
    switch (selectMenu) {
      case "회원정보": return <p>회원정보 페이지</p>
      case "주문": return <p>주문페이지</p>
      case "위시리스트": return <WishList />
      case "케이스티파이 정품 인증": return <p>정품인증 페이지 이동</p>
      case "기프트 카드": return <p>기프트카드 페이지</p>
      case "로그아웃": return <p>로그아웃 + 메인페이지 이동</p>
    }
  }

  return (
    <div className="sub-page-wrap">
      <div className="inner">
        <div className="my-page-wrap">
          <div className="my-page-menu">
            {/* 마이페이지 메뉴 컴포넌트 */}
            <MypageMenu sendSelect={handleMenuClick} selectMenu={selectMenu} />
          </div>
          <div className="my-page-content">
            <div>{handleContent()}</div>
          </div>
        </div>
        <Benefit />
      </div>
    </div>
  )
}

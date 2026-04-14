import React from 'react'
import { Link } from 'react-router-dom'

// 마이페이지 메뉴 데이터
const mypageMenuData = [
    { id: 1, icon: "./images/icon/icon_favorite.svg", name: "회원정보", tabicon: true, islink: false },
    { id: 2, icon: "./images/icon/icon_favorite.svg", name: "주문", tabicon: true, islink: false },
    { id: 3, icon: "./images/icon/icon_favorite.svg", name: "위시리스트", tabicon: true, islink: false },
    { id: 4, icon: null, name: "케이스티파이 정품 인증", tabicon: false, islink: true },
    { id: 5, icon: "./images/icon/icon_favorite.svg", name: "기프트 카드", tabicon: true, islink: false },
    { id: 6, icon: "./images/icon/icon_favorite.svg", name: "로그아웃", tabicon: true, islink: false },
]

export default function MypageMenu() {
    return (
        <div>
            <ul className="mypage-menu-list">
                {mypageMenuData.map((menu) => {
                    <li className="menu-item">
                        <button>
                            <span className="menu-icon"></span>
                            <img src="" alt="" />
                            <span></span>
                        </button>
                    </li>
                })}
            </ul>
        </div>
    )
}

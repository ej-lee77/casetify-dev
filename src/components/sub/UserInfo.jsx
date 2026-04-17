import React from 'react'
import MypageTitle from './MypageTitle'
import "./scss/UserInfo.scss"

export default function UserInfo() {
    return (
        <div>
            <MypageTitle title={"회원 카드"} />
            <div className="user-card">
                <form action="">
                    <input type="text" /><input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" /><input type="text" />
                </form>
            </div>
            <MypageTitle title={"계정 정보"} />
            <MypageTitle title={"배송 주소"} />
            <MypageTitle title={"계정 삭제"} />
        </div>
    )
}

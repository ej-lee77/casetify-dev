import React from 'react'
import "./scss/MypageTitle.scss"

export default function MypageTitle({ title }) {
    return (
        <div className="mypage-title-box">
            <h2 className="mypage-title">{title}</h2>
        </div>
    )
}
